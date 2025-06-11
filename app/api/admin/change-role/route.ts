import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { verifyAdmin } from "../../_utils/verify-admin"

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const token = authHeader?.replace(/^Bearer /, "")
  const isAdmin = await verifyAdmin(token)
  if (!isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 })
  }
  // Aquí deberías autenticar que el usuario es admin (ideal: JWT/session)
  // Por simplicidad, no se implementa auth fuerte aquí
  const { userId, role } = await req.json()
  if (!userId || !role) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
  }
  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true }, { status: 200 })
}
