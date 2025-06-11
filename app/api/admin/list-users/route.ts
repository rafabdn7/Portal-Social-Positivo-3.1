import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { verifyAdmin } from "../../_utils/verify-admin"

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const token = authHeader?.replace(/^Bearer /, "")
  const isAdmin = await verifyAdmin(token)
  if (!isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 })
  }
  // Aquí deberías autenticar que el usuario es admin (ideal: JWT/session)
  // Por simplicidad, no se implementa auth fuerte aquí
  const { data, error } = await supabase.from("profiles").select("id, full_name, email, role")
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ users: data }, { status: 200 })
}
