"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Bell, Shield, Heart, MessageSquare, Calendar, FileText, Award, Edit, Save, X } from "lucide-react"
import Link from "next/link"
import ReviewSystem from "@/components/reviews/review-system"
import { InputOTP } from "@/components/ui/input-otp"

import { supabase } from "@/lib/supabase"
import { useEffect } from "react"

export default function PerfilPage() {
  // --- 2FA States ---
  const [is2faEnabled, setIs2faEnabled] = useState(false)
  const [show2FAConfig, setShow2FAConfig] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [otp, setOtp] = useState("")
  const [loading2fa, setLoading2fa] = useState(false)
  const [qrError, setQrError] = useState("")
  const [verifyError, setVerifyError] = useState("")
  const [verifySuccess, setVerifySuccess] = useState(false)

  // --- Cargar estado 2FA real del usuario (fetch real de perfil desde Supabase) ---

  useEffect(() => {
    async function fetch2FAStatus() {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) return
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_2fa_enabled")
        .eq("id", user.id)
        .single()
      if (profile && profile.is_2fa_enabled) {
        setIs2faEnabled(true)
      } else {
        setIs2faEnabled(false)
      }
    }
    fetch2FAStatus()
  }, [])

  // --- Función para activar 2FA (obtener QR y secreto) ---
  async function handleActivate2FA() {
    setLoading2fa(true)
    setQrError("")
    setVerifyError("")
    setVerifySuccess(false)
    setOtp("")
    try {
      const res = await fetch("/api/2fa/activate", { method: "POST" })
      const data = await res.json()
      if (res.ok && data.qrDataUrl && data.secret) {
        setQrDataUrl(data.qrDataUrl)
        setSecret(data.secret)
      } else {
        setQrError(data.error || "No se pudo generar el QR. Intenta de nuevo.")
      }
    } catch (e) {
      setQrError("Error de red o servidor. Intenta de nuevo.")
    }
    setLoading2fa(false)
  }

  // --- Función para desactivar 2FA ---
  async function handleDeactivate2FA() {
    setLoading2fa(true)
    setQrError("")
    setVerifyError("")
    setVerifySuccess(false)
    try {
      const res = await fetch("/api/2fa/deactivate", { method: "POST" })
      const data = await res.json()
      if (res.ok && data.success) {
        setIs2faEnabled(false)
        setShow2FAConfig(false)
        setQrDataUrl(null)
        setSecret(null)
        setOtp("")
      } else {
        setQrError(data.error || "No se pudo desactivar 2FA. Intenta de nuevo.")
      }
    } catch (e) {
      setQrError("Error de red o servidor. Intenta de nuevo.")
    }
    setLoading2fa(false)
  }

  // --- Función para verificar OTP y activar 2FA en backend ---
  async function handleVerify2FA() {
    if (!secret || otp.length !== 6) return
    setLoading2fa(true)
    setVerifyError("")
    setVerifySuccess(false)
    try {
      const res = await fetch("/api/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, otp }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setVerifySuccess(true)
        setIs2faEnabled(true)
        setShow2FAConfig(false)
        setQrDataUrl(null)
        setSecret(null)
        setOtp("")
      } else {
        setVerifyError(data.error || "Código incorrecto. Intenta de nuevo.")
      }
    } catch (e) {
      setVerifyError("Error de red o servidor. Intenta de nuevo.")
    }
    setLoading2fa(false)
  }

  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "María García López",
    email: "maria.garcia@email.com",
    phone: "+34 612 345 678",
    city: "Barcelona",
    bio: "Madre soltera de dos hijos, trabajadora social y activista por los derechos de las familias. Me gusta ayudar a otras familias en situaciones similares.",
    interests: ["Familias Monoparentales", "Educación", "Salud Mental", "Recursos Sociales"],
    joinDate: "Marzo 2023",
    avatar: "/placeholder.svg?height=128&width=128&text=MG",
  })

  const userStats = {
    postsCreated: 12,
    commentsWritten: 87,
    helpfulVotes: 156,
    eventsAttended: 8,
    resourcesShared: 23,
    level: 5,
    points: 2350,
    nextLevelPoints: 2500,
  }

  const recentActivity = [
    {
      id: "activity-1",
      type: "comment",
      title: "Comentaste en 'Ayudas para familias monoparentales'",
      date: "Hace 2 horas",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: "activity-2",
      type: "event",
      title: "Te inscribiste en 'Taller de Gestión del Estrés'",
      date: "Ayer",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "activity-3",
      type: "post",
      title: "Creaste una nueva publicación sobre recursos educativos",
      date: "Hace 3 días",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "activity-4",
      type: "achievement",
      title: "Desbloqueaste el logro 'Colaborador Activo'",
      date: "Hace 1 semana",
      icon: <Award className="h-4 w-4" />,
    },
  ]

  const savedResources = [
    {
      id: "saved-1",
      title: "Guía completa de ayudas para familias 2024",
      type: "Documento",
      category: "Ayudas Económicas",
      savedDate: "Hace 2 días",
    },
    {
      id: "saved-2",
      title: "Centro de Servicios Sociales Gràcia",
      type: "Recurso",
      category: "Servicios Sociales",
      savedDate: "Hace 1 semana",
    },
    {
      id: "saved-3",
      title: "Taller: Crianza Positiva",
      type: "Evento",
      category: "Formación",
      savedDate: "Hace 2 semanas",
    },
  ]

  const myReviews = [
    {
      id: "review-1",
      userId: "user-1",
      userName: "María García López",
      userAvatar: "/placeholder.svg?height=40&width=40&text=MG",
      rating: 5,
      title: "Excelente atención y recursos muy útiles",
      content:
        "El centro de servicios sociales de Gràcia me ayudó muchísimo con los trámites de la RGC. El personal es muy amable y profesional.",
      date: "Hace 1 semana",
      helpful: 12,
      notHelpful: 0,
      verified: true,
      response: {
        author: "Centro Servicios Sociales Gràcia",
        content: "Muchas gracias por tu valoración, María. Nos alegra saber que pudimos ayudarte con los trámites.",
        date: "Hace 5 días",
      },
    },
  ]

  const handleSaveProfile = () => {
    // En una implementación real, esto se enviaría al servidor
    setIsEditing(false)
  }

  const progressToNextLevel = Math.round((userStats.points / userStats.nextLevelPoints) * 100)

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal y actividad en la plataforma</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información del perfil */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                  <AvatarFallback className="text-2xl">{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">{userProfile.name}</h2>
                <p className="text-sm text-muted-foreground">Miembro desde {userProfile.joinDate}</p>
                <div className="flex justify-center">
                  <Badge className="bg-primary/20 text-primary">
                    Nivel {userStats.level} • {userStats.points} puntos
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progreso al nivel {userStats.level + 1}</span>
                  <span>
                    {userStats.points}/{userStats.nextLevelPoints}
                  </span>
                </div>
                <Progress value={progressToNextLevel} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.postsCreated}</div>
                  <div className="text-xs text-muted-foreground">Publicaciones</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{userStats.helpfulVotes}</div>
                  <div className="text-xs text-muted-foreground">Votos útiles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{userStats.commentsWritten}</div>
                  <div className="text-xs text-muted-foreground">Comentarios</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{userStats.eventsAttended}</div>
                  <div className="text-xs text-muted-foreground">Eventos</div>
                </div>
              </div>

              <Button className="w-full" asChild>
                <Link href="/perfil/logros">Ver Logros</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Actividad reciente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="text-muted-foreground mt-1">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="saved">Guardados</TabsTrigger>
              <TabsTrigger value="reviews">Mis Reseñas</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Información Personal</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                  >
                    {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                    {isEditing ? "Guardar" : "Editar"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre completo</Label>
                          <Input
                            id="name"
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input
                            id="phone"
                            value={userProfile.phone}
                            onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Ciudad</Label>
                          <Input
                            id="city"
                            value={userProfile.city}
                            onChange={(e) => setUserProfile({ ...userProfile, city: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea
                          id="bio"
                          value={userProfile.bio}
                          onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile}>Guardar cambios</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                          <p>{userProfile.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Teléfono</Label>
                          <p>{userProfile.phone}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Ciudad</Label>
                          <p>{userProfile.city}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Miembro desde</Label>
                          <p>{userProfile.joinDate}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Biografía</Label>
                        <p className="mt-1">{userProfile.bio}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Intereses</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {userProfile.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recursos Guardados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedResources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-primary">
                            {resource.type === "Documento" && <FileText className="h-5 w-5" />}
                            {resource.type === "Recurso" && <Heart className="h-5 w-5" />}
                            {resource.type === "Evento" && <Calendar className="h-5 w-5" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {resource.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{resource.savedDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Ver
                          </Button>
                          <Button size="sm" variant="ghost">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <ReviewSystem
                resourceId="centro-gracia"
                resourceName="Centro de Servicios Sociales Gràcia"
                resourceType="centro-social"
                averageRating={4.5}
                totalReviews={1}
                reviews={myReviews}
              />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nuevos mensajes</p>
                      <p className="text-sm text-muted-foreground">Recibir notificaciones de mensajes privados</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activado
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Eventos próximos</p>
                      <p className="text-sm text-muted-foreground">
                        Recordatorios de eventos a los que te has inscrito
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activado
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nuevas ayudas</p>
                      <p className="text-sm text-muted-foreground">Notificaciones sobre nuevas ayudas disponibles</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activado
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacidad y Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
  <div className="flex items-center justify-between">
    <div>
      <p className="font-medium">Perfil público</p>
      <p className="text-sm text-muted-foreground">Permitir que otros usuarios vean tu perfil</p>
    </div>
    <Button variant="outline" size="sm">Público</Button>
  </div>
  <div className="flex items-center justify-between">
    <div>
      <p className="font-medium">Mostrar actividad</p>
      <p className="text-sm text-muted-foreground">Mostrar tu actividad reciente en tu perfil</p>
    </div>
    <Button variant="outline" size="sm">Activado</Button>
  </div>

  {/* --- INICIO BLOQUE 2FA --- */}
  <div className="border-t pt-4 mt-4">
    <div className="flex items-center justify-between mb-2">
      <div>
        <p className="font-medium flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          Autenticación en dos pasos (2FA)
        </p>
        <p className="text-sm text-muted-foreground">
          Protege tu cuenta con Google Authenticator u otra app compatible.
        </p>
      </div>
      {is2faEnabled ? (
  <Button
    variant="destructive"
    size="sm"
    onClick={handleDeactivate2FA}
    disabled={loading2fa}
  >
    Desactivar 2FA
  </Button>
) : (
  <Button
    variant="outline"
    size="sm"
    onClick={() => setShow2FAConfig((v) => !v)}
    disabled={loading2fa}
  >
    Activar 2FA
  </Button>
)}
</div>
{show2FAConfig && !is2faEnabled && (
  <div className="bg-muted p-4 rounded-md mt-2">
    {qrError && (
      <div className="text-red-600 mb-2 text-sm">{qrError}</div>
    )}
    {!qrDataUrl ? (
      <Button onClick={handleActivate2FA} disabled={loading2fa}>
        {loading2fa ? "Generando QR..." : "Obtener QR"}
      </Button>
    ) : (
      <>
        <p className="mb-2 font-medium">1. Escanea el código QR con tu app de autenticación</p>
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">
            <img src={qrDataUrl} alt="QR 2FA" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1">
            <p className="mb-2 font-medium">2. Ingresa el código de 6 dígitos</p>
            <div className="w-48">
              <InputOTP length={6} value={otp} onChange={setOtp} />
            </div>
            <Button className="mt-2" onClick={handleVerify2FA} disabled={loading2fa || otp.length !== 6}>
              {loading2fa ? "Validando..." : "Validar código"}
            </Button>
            {verifyError && <div className="text-red-600 mt-2 text-sm">{verifyError}</div>}
            {verifySuccess && <div className="text-green-600 mt-2 text-sm">¡2FA activado correctamente!</div>}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">¿No tienes una app? Prueba Google Authenticator, Authy o Microsoft Authenticator.</p>
      </>
    )}
  </div>
)}
  </div>
  {/* --- FIN BLOQUE 2FA --- */}

  <Button variant="destructive" className="w-full">Eliminar cuenta</Button>
</CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
