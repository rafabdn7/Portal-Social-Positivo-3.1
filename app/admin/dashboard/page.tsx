"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, FileText, AlertTriangle, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { ContentModerationCard } from "@/components/admin/content-moderation-card"

import { useAuth } from "@/components/auth/auth-provider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // Si no autenticado o no es admin, redirigir
      if (!user || user.role !== "admin") {
        router.replace("/")
      }
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center" aria-live="polite" role="status">Cargando...</div>
  }
  if (user.role !== "admin") {
    return null // Redirige
  }
  // This would come from your API in a real implementation
  const stats = {
    totalUsers: 1245,
    activeUsers: 876,
    totalPosts: 3567,
    pendingModeration: 23,
    newUsersToday: 34,
    commentsToday: 128,
    postsToday: 45,
    flaggedContent: 12,
  }

  const recentUsers = [
    {
      id: "user-1",
      name: "María García",
      email: "maria@example.com",
      role: "user",
      status: "active",
      joinedAt: "2023-06-08T14:23:54",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
    },
    {
      id: "user-2",
      name: "Jordi Puig",
      email: "jordi@example.com",
      role: "moderator",
      status: "active",
      joinedAt: "2023-06-07T09:15:22",
      avatar: "/placeholder.svg?height=40&width=40&text=JP",
    },
    {
      id: "user-3",
      name: "Elena Martínez",
      email: "elena@example.com",
      role: "user",
      status: "pending",
      joinedAt: "2023-06-06T18:45:11",
      avatar: "/placeholder.svg?height=40&width=40&text=EM",
    },
    {
      id: "user-4",
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      role: "user",
      status: "active",
      joinedAt: "2023-06-05T11:32:45",
      avatar: "/placeholder.svg?height=40&width=40&text=CR",
    },
    {
      id: "user-5",
      name: "Laura Sánchez",
      email: "laura@example.com",
      role: "user",
      status: "inactive",
      joinedAt: "2023-06-04T15:19:33",
      avatar: "/placeholder.svg?height=40&width=40&text=LS",
    },
  ]

  const flaggedContent = [
    {
      id: "content-1",
      title: "Ayuda con trámites de vivienda",
      type: "post",
      author: "usuario123",
      reportedBy: "moderador1",
      reason: "Información incorrecta",
      createdAt: "2023-06-08T10:23:54",
      status: "pending",
    },
    {
      id: "content-2",
      title: "Esto es una estafa, no confíen",
      type: "comment",
      author: "anónimo456",
      reportedBy: "usuario789",
      reason: "Contenido inapropiado",
      createdAt: "2023-06-07T16:45:22",
      status: "pending",
    },
    {
      id: "content-3",
      title: "Contacten a este número para ayuda rápida",
      type: "comment",
      author: "nuevo_usuario",
      reportedBy: "sistema",
      reason: "Posible spam",
      createdAt: "2023-06-07T09:12:18",
      status: "pending",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col" role="main">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Panel de Administración</h2>
          <div className="flex items-center space-x-2">
            <Button>Descargar Informe</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="moderation">Moderación</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{stats.newUsersToday} hoy</p>
                  <div className="mt-2">
                    <Progress value={Math.round((stats.activeUsers / stats.totalUsers) * 100)} className="h-1" />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stats.activeUsers} usuarios activos ({Math.round((stats.activeUsers / stats.totalUsers) * 100)}%)
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Publicaciones</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPosts.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{stats.postsToday} hoy</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Comentarios</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,234</div>
                  <p className="text-xs text-muted-foreground">+{stats.commentsToday} hoy</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendientes de Moderación</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingModeration}</div>
                  <p className="text-xs text-muted-foreground">{stats.flaggedContent} contenidos reportados</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    {/* This would be a chart in a real implementation */}
                    <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <BarChart3 className="h-8 w-8 text-muted-foreground" />
                        <div className="text-sm font-medium">Gráfico de actividad</div>
                        <div className="text-xs text-muted-foreground">
                          Muestra la actividad de usuarios y contenido en los últimos 30 días
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Usuarios Recientes</CardTitle>
                  <CardDescription>{stats.newUsersToday} nuevos usuarios hoy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <Badge
                          className={
                            user.status === "active"
                              ? "bg-green-500"
                              : user.status === "pending"
                                ? "bg-amber-500"
                                : "bg-gray-500"
                          }
                        >
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin/users">Ver todos los usuarios</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Contenido Reportado</CardTitle>
                  <CardDescription>{flaggedContent.length} elementos pendientes de revisión</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {flaggedContent.map((content) => (
                      <div key={content.id} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="grid gap-1">
                            <div className="font-semibold">{content.title}</div>
                            <div className="text-sm text-muted-foreground">
                              Por {content.author} • {new Date(content.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-red-100 text-red-800">
                            {content.type === "post" ? "Publicación" : "Comentario"}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Razón:</span> {content.reason}
                        </div>
                        <div className="mt-3 flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Ignorar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin/moderation">Ver todo el contenido reportado</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <ContentModerationCard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
