"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/auth-provider"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")
  const [pendingEmail, setPendingEmail] = useState("")
  const { signIn } = useAuth()
  const router = useRouter()

  // Nuevo flujo de login con 2FA
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setOtpError("")

    // 1. Intentar login normal
    const { error: loginError, user } = await signIn(email, password)
    if (loginError) {
      setError(loginError.message)
      if (typeof window !== 'undefined' && window.trackEvent) {
        window.trackEvent('Login Fallido', { email });
      }
      setLoading(false)
      return
    }
    // 2. Consultar si el usuario tiene 2FA activo
    const res = await fetch("/api/2fa/login-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: "__check__" }) // Marca especial para solo consultar
    })
    if (res.status === 429) {
      const data = await res.json()
      setError(data.error || "Demasiados intentos. Espera e inténtalo de nuevo.")
      setLoading(false)
      return
    }
    const data = await res.json()
    if (data.error === "2FA no activo") {
      // Login normal
      router.push("/")
      setLoading(false)
      return
    }
    if (data.success) {
      // Ya pasó OTP, login completo
      router.push("/")
      setLoading(false)
      return
    }
    if (data.error === "Usuario no encontrado") {
      setError("Usuario o contraseña incorrectos")
      setLoading(false)
      return
    }
    // Si requiere OTP
    setShowOtp(true)
    setPendingEmail(email)
    setLoading(false)
  }

  // Validar OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setOtpError("")
    try {
      const res = await fetch("/api/2fa/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, otp })
      })
      if (res.status === 429) {
        const data = await res.json()
        setOtpError(data.error || "Demasiados intentos. Espera e inténtalo de nuevo.")
        setLoading(false)
        return
      }
      const data = await res.json()
      if (res.ok && data.success) {
        router.push("/")
        if (typeof window !== 'undefined' && window.trackEvent) {
          window.trackEvent('Login Exitoso', { email: pendingEmail });
        }
      } else {
        setOtpError(data.error || "Código incorrecto")
      }
    } catch {
      setOtpError("Error de red o servidor")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription>Accede a tu cuenta de Catalunya Social Positiva</CardDescription>
        </CardHeader>
        <CardContent>
          {!showOtp ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div aria-live="polite" role="status">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  ¿No tienes cuenta?{" "}
                  <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
                    Regístrate aquí
                  </Link>
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Código de verificación 2FA</label>
                <p className="text-xs text-gray-500">Introduce el código de 6 dígitos de tu app de autenticación</p>
                <div className="flex justify-center">
                  {/* Usa tu componente InputOTP aquí, si está disponible */}
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    className="text-center text-lg tracking-widest border rounded px-3 py-2 w-40"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0,6))}
                    autoFocus
                    required
                  />
                </div>
                <div aria-live="polite" role="status">
                  {otpError && (
                    <Alert variant="destructive">
                      <AlertDescription>{otpError}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                {loading ? "Verificando..." : "Verificar y entrar"}
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-500 mt-2"
                  onClick={() => { setShowOtp(false); setOtp(""); setOtpError(""); }}
                >
                  Volver al login
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
