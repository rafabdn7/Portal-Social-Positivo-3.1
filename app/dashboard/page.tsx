"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center" aria-live="polite" role="status">Cargando...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4" role="main">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Panel Personal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Nombre:</strong> {user.user_metadata?.full_name || user.email}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Rol:</strong> {user.role}
            </div>
            {user.role === "moderator" && (
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <strong>Zona de Moderador:</strong>
                <div>Acceso a herramientas de revisión de contenido y usuarios reportados.</div>
              </div>
            )}
            {user.role === "admin" && (
              <div className="mt-4 p-4 bg-yellow-50 rounded">
                <strong>Zona de Admin:</strong>
                <div>
                  Acceso completo al panel de administración. <br />
                  <a href="/admin/dashboard" className="text-blue-600 underline">Ir al Panel de Administración</a>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

