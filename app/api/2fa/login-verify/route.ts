import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { authenticator } from "otplib"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { checkRateLimit } from "../../utils/rate-limit"
import { log2FA } from "../../utils/log-2fa"

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json()
  // --- Rate limiting por IP + email ---
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anon"
  const rate = checkRateLimit(`2fa-login:${ip}:${email}`)
  if (!rate.allowed) {
    log2FA({ ip: String(ip), endpoint: '/api/2fa/login-verify', type: 'rate-limit', reason: 'rate limit', email })
    return NextResponse.json({ error: `Demasiados intentos. Espera ${rate.retryAfter}s e inténtalo de nuevo.` }, { status: 429 })
  }
  if (!email || !otp) {
    log2FA({ ip: String(ip), endpoint: '/api/2fa/login-verify', type: 'fail', reason: 'missing-data', email })
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 })
  }

  // Buscar el usuario y su secreto TOTP
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, totp_secret, is_2fa_enabled")
    .eq("email", email)
    .single()

  if (error || !profile) {
    log2FA({ ip: String(ip), endpoint: '/api/2fa/login-verify', type: 'fail', reason: 'user-not-found', email })
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  }

  if (!profile.is_2fa_enabled || !profile.totp_secret) {
    log2FA({ ip: String(ip), endpoint: '/api/2fa/login-verify', type: 'fail', reason: '2fa-not-enabled', email })
    return NextResponse.json({ error: "2FA no activo" }, { status: 400 })
  }

  // Descifrar el secreto TOTP almacenado
  try {
    const crypto = await import('crypto')
    const ENC_KEY = process.env.TOTP_SECRET_KEY || 'default_key_32_bytes_long_123456789012';
    const [ivHex, tagHex, encrypted] = profile.totp_secret.split(":")
    const iv = Buffer.from(ivHex, 'hex')
    const tag = Buffer.from(tagHex, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(ENC_KEY, 'utf8'), iv)
    decipher.setAuthTag(tag)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    // Validar OTP
    const isValid = authenticator.check(otp, decrypted)
    if (!isValid) {
      log2FA({ ip: String(ip), endpoint: '/api/2fa/login-verify', type: 'fail', reason: 'invalid-otp', email })
      return NextResponse.json({ error: "Código inválido" }, { status: 400 })
    }
  } catch (err) {
    return NextResponse.json({ error: "Error de descifrado" }, { status: 500 })
  }

  // Aquí deberías generar el JWT/sesión y devolverlo
  // Por ahora solo responde con éxito
  return NextResponse.json({ success: true, userId: profile.id })
}
