import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: "Función de pago deshabilitada temporalmente por mantenimiento." }, { status: 501 })
}

