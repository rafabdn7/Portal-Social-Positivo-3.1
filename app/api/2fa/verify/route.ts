import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { authenticator } from "otplib"
import { createClient } from "@supabase/supabase-js"

// --- Configuración Supabase ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TODO: Reemplazar por lógica real de autenticación de usuario
function getCurrentUserId(req: NextRequest): string | null {
  // Aquí deberías extraer el userId de la sesión/JWT
  return null
}

import { checkRateLimit } from "../../utils/rate-limit"
import { log2FA } from "../../utils/log-2fa"

export async function POST(req: NextRequest) {
  // --- Rate limiting por IP ---
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anon"
  const rate = checkRateLimit(`2fa-verify:${ip}`)
  if (!rate.allowed) {
    log2FA({ ip: String(ip), endpoint: '/api/2fa/verify', type: 'rate-limit', reason: 'rate limit', email: undefined })
    log2FA({ ip: String(ip), endpoint: '/api/2fa/verify', type: 'rate-limit', reason: 'rate limit', email: undefined })
    return NextResponse.json({ error: `Demasiados intentos. Espera ${rate.retryAfter}s e inténtalo de nuevo.` }, { status: 429 })
  }

  const body = await req.json()
  const { secret, otp } = body
  const userId = getCurrentUserId(req)
  if (!userId) {
    log2FA({ ip: String(ip), endpoint: '/api/2fa/verify', type: 'fail', reason: 'no-auth', email: undefined })
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }
  if (!secret || !otp) {
    log2FA({ ip: String(ip), endpoint: '/api/2fa/verify', type: 'fail', reason: 'missing-data', email: undefined })
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 })
  }

  // 1. Validar el OTP
  const isValid = authenticator.check(otp, secret)
  if (!isValid) {
    log2FA({ ip: String(ip), endpoint: '/api/2fa/verify', type: 'fail', reason: 'invalid-otp', email: undefined })
    return NextResponse.json({ error: "Código inválido" }, { status: 400 })
  }

  // 2. Cifrar el secreto y activar 2FA en el perfil del usuario
  // Usamos AES-256-GCM y una clave de entorno TOTP_SECRET_KEY
  const crypto = await import('crypto')
  const ENC_KEY = process.env.TOTP_SECRET_KEY || 'default_key_32_bytes_long_123456789012'; // ¡En producción usa una clave fuerte!
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENC_KEY, 'utf8'), iv)
  let encrypted = cipher.update(secret, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const tag = cipher.getAuthTag()
  const encryptedSecret = `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`

  const { error } = await supabase
    .from("profiles")
    .update({ totp_secret: encryptedSecret, is_2fa_enabled: true })
    .eq("id", userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
