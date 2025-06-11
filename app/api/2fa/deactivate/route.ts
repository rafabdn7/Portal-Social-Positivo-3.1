import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TODO: Reemplazar por lógica real de autenticación de usuario
function getCurrentUserId(req: NextRequest): string | null {
  // Aquí deberías extraer el userId de la sesión/JWT
  return null
}

export async function POST(req: NextRequest) {
  const userId = getCurrentUserId(req)
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }

  // Desactivar 2FA: borrar el secreto y marcar como inactivo
  const { error } = await supabase
    .from("profiles")
    .update({ totp_secret: null, is_2fa_enabled: false })
    .eq("id", userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
