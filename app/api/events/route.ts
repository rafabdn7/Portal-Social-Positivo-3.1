import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const location = searchParams.get("location")
    const date = searchParams.get("date")

    let query = supabase
      .from("events")
      .select(`
        *,
        profiles:organizer_id (
          full_name,
          avatar_url
        )
      `)
      .gte("start_date", new Date().toISOString())
      .order("start_date", { ascending: true })

    if (category) {
      query = query.eq("category", category)
    }

    if (location) {
      query = query.ilike("location", `%${location}%`)
    }

    if (date) {
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)

      query = query.gte("start_date", startOfDay.toISOString()).lte("start_date", endOfDay.toISOString())
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, start_date, end_date, location, category, max_participants, price } = body

    // Validación
    if (!title || !description || !start_date || !end_date || !location || !category) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Obtener usuario autenticado
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Token de autorización requerido" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("events")
      .insert({
        title,
        description,
        start_date,
        end_date,
        location,
        category,
        max_participants,
        price: price || 0,
        organizer_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
