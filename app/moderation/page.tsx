"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ModerationPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [reportedContent, setReportedContent] = useState<any[]>([])
  const [loadingContent, setLoadingContent] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/auth/login")
      } else if (user.role !== "moderator" && user.role !== "admin") {
        router.replace("/")
      }
    }
  }, [user, loading, router])

  useEffect(() => {
    // Simulación de fetch de contenido reportado
    setTimeout(() => {
      setReportedContent([
        {
          id: 1,
          type: "post",
          title: "Ayuda urgente para familia necesitada",
          author: "usuario123",
          reason: "Contenido sospechoso",
          date: "2025-06-09",
        },
        {
          id: 2,
          type: "comment",
          title: "Esto es spam",
          author: "anonimo456",
          reason: "Spam",
          date: "2025-06-08",
        },
      ])
      setLoadingContent(false)
    }, 800)
  }, [])

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center" aria-live="polite" role="status">Cargando...</div>
  }

  if (user.role !== "moderator" && user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4" role="main">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Panel de Moderación</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingContent ? (
            <div>Cargando contenido reportado...</div>
          ) : reportedContent.length === 0 ? (
            <div>No hay contenido reportado pendiente.</div>
          ) : (
            <div className="space-y-4">
              {reportedContent.map((item) => (
                <div key={item.id} className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-500">Por {item.author} • {item.date}</div>
                    <div className="text-xs text-red-500">Motivo: {item.reason}</div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button variant="outline" size="sm" onClick={() => { if (typeof window !== 'undefined' && window.trackEvent) { window.trackEvent('Moderación: Ignorar', { id: item.id }); } }}>Ignorar</Button>
                    <Button variant="destructive" size="sm" onClick={() => { if (typeof window !== 'undefined' && window.trackEvent) { window.trackEvent('Moderación: Eliminar', { id: item.id }); } }}>Eliminar</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
