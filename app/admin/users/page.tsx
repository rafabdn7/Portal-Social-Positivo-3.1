"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminUsersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchUsers = async () => {
      setFetching(true)
      setError("")
      try {
        const res = await fetch("/api/admin/list-users")
        const data = await res.json()
        if (res.ok) {
          setUsers(data.users)
        } else {
          setError(data.error || "Error al obtener usuarios")
        }
      } catch {
        setError("Error de red")
      }
      setFetching(false)
    }
    if (user && user.role === "admin") fetchUsers()
  }, [user])

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdating(userId)
    try {
      const res = await fetch("/api/admin/change-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole })
      })
      const data = await res.json()
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      } else {
        alert(data.error || "No se pudo cambiar el rol")
      }
    } catch {
      alert("Error de red")
    }
    setUpdating(null)
  }

  if (loading || !user) return <div className="flex min-h-screen items-center justify-center">Cargando...</div>
  if (user.role !== "admin") return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {fetching ? (
            <div>Cargando usuarios...</div>
          ) : (
            <table className="w-full border mt-2">
              <thead>
                <tr>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Rol</th>
                  <th className="p-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b">
                    <td className="p-2 border">{u.full_name || u.email}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border capitalize">{u.role}</td>
                    <td className="p-2 border">
                      {["user", "moderator", "admin"].filter(r => r !== u.role).map(r => (
                        <Button
                          key={r}
                          size="sm"
                          variant="outline"
                          className="mr-2"
                          disabled={updating === u.id}
                          onClick={() => handleRoleChange(u.id, r)}
                        >
                          Cambiar a {r}
                        </Button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
