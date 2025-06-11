import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { authenticator } from "otplib"
import QRCode from "qrcode"

// TODO: Reemplazar por lógica real de autenticación de usuario
function getCurrentUserId(req: NextRequest): string | null {
  // Aquí deberías extraer el userId de la sesión/JWT
  return null
}

export async function POST(req: NextRequest) {
  // 1. Verificar usuario autenticado
  const userId = getCurrentUserId(req)
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }

  // 2. Generar secreto TOTP
  const secret = authenticator.generateSecret()
  const otpauth = authenticator.keyuri(userId, "CatalunyaSocialPositiva", secret)

  // 3. Generar QR code (data URL)
  const qrDataUrl = await QRCode.toDataURL(otpauth)

  // 4. Devolver secreto y QR al frontend (el guardado real será tras la validación OTP)
  return NextResponse.json({ secret, qrDataUrl })
}
