import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users, TrendingUp, Clock, Pin, Heart, Reply } from "lucide-react"
import Link from "next/link"

export default function ComunidadPage() {
  const forosPopulares = [
    {
      id: "foro-1",
      titulo: "Ayudas y Subvenciones",
      descripcion: "Comparte información sobre ayudas disponibles y resuelve dudas sobre trámites",
      categoria: "ayudas",
      miembros: 1247,
      mensajes: 3456,
      ultimaActividad: "Hace 5 minutos",
      moderadores: ["María García", "Jordi Puig"],
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "foro-2",
      titulo: "Familias Monoparentales",
      descripcion: "Espacio de apoyo y consejos para madres y padres que crían solos",
      categoria: "familias",
      miembros: 892,
      mensajes: 2134,
      ultimaActividad: "Hace 12 minutos",
      moderadores: ["Elena Martínez"],
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "foro-3",
      titulo: "Crianza y Educación",
      descripcion: "Consejos sobre crianza, educación y desarrollo infantil",
      categoria: "crianza",
      miembros: 1567,
      mensajes: 4789,
      ultimaActividad: "Hace 8 minutos",
      moderadores: ["Dr. Carlos Ruiz", "Ana López"],
      color: "bg-green-100 text-green-800",
    },
    {
      id: "foro-4",
      titulo: "Vivienda y Alquiler",
      descripcion: "Información sobre vivienda social, alquiler y programas de ayuda",
      categoria: "vivienda",
      miembros: 743,
      mensajes: 1876,
      ultimaActividad: "Hace 25 minutos",
      moderadores: ["Laura Sánchez"],
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: "foro-5",
      titulo: "Salud y Bienestar",
      descripcion: "Recursos de salud mental, bienestar familiar y autocuidado",
      categoria: "salud",
      miembros: 654,
      mensajes: 1432,
      ultimaActividad: "Hace 1 hora",
      moderadores: ["Dra. Isabel Moreno"],
      color: "bg-red-100 text-red-800",
    },
    {
      id: "foro-6",
      titulo: "Discapacidad y Dependencia",
      descripcion: "Apoyo para familias con miembros con discapacidad o dependencia",
      categoria: "discapacidad",
      miembros: 456,
      mensajes: 987,
      ultimaActividad: "Hace 2 horas",
      moderadores: ["Miguel Torres"],
      color: "bg-indigo-100 text-indigo-800",
    },
  ]

  const temasRecientes = [
    {
      id: "tema-1",
      titulo: "¿Cómo solicitar la Renta Garantizada de Ciudadanía?",
      autor: "Carmen López",
      avatarAutor: "/placeholder.svg?height=32&width=32&text=CL",
      foro: "Ayudas y Subvenciones",
      respuestas: 23,
      vistas: 156,
      ultimaRespuesta: "Hace 5 minutos",
      ultimoUsuario: "María García",
      fijado: true,
      meGusta: 45,
    },
    {
      id: "tema-2",
      titulo: "Consejos para conciliar trabajo y crianza siendo madre soltera",
      autor: "Ana Martín",
      avatarAutor: "/placeholder.svg?height=32&width=32&text=AM",
      foro: "Familias Monoparentales",
      respuestas: 18,
      vistas: 89,
      ultimaRespuesta: "Hace 12 minutos",
      ultimoUsuario: "Elena Martínez",
      fijado: false,
      meGusta: 32,
    },
    {
      id: "tema-3",
      titulo: "Recursos gratuitos para actividades extraescolares",
      autor: "Pedro Ruiz",
      avatarAutor: "/placeholder.svg?height=32&width=32&text=PR",
      foro: "Crianza y Educación",
      respuestas: 15,
      vistas: 67,
      ultimaRespuesta: "Hace 25 minutos",
      ultimoUsuario: "Ana López",
      fijado: false,
      meGusta: 28,
    },
    {
      id: "tema-4",
      titulo: "Experiencias con el programa de alquiler social",
      autor: "Lucía Fernández",
      avatarAutor: "/placeholder.svg?height=32&width=32&text=LF",
      foro: "Vivienda y Alquiler",
      respuestas: 12,
      vistas: 45,
      ultimaRespuesta: "Hace 1 hora",
      ultimoUsuario: "Laura Sánchez",
      fijado: false,
      meGusta: 19,
    },
    {
      id: "tema-5",
      titulo: "Técnicas de relajación para padres estresados",
      autor: "David González",
      avatarAutor: "/placeholder.svg?height=32&width=32&text=DG",
      foro: "Salud y Bienestar",
      respuestas: 8,
      vistas: 34,
      ultimaRespuesta: "Hace 2 horas",
      ultimoUsuario: "Dra. Isabel Moreno",
      fijado: false,
      meGusta: 15,
    },
  ]

  const estadisticasComunidad = {
    totalMiembros: 5234,
    nuevosHoy: 23,
    mensajesHoy: 156,
    temasActivos: 89,
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Comunidad</h1>
        <p className="text-muted-foreground text-lg">
          Conecta con otras familias, comparte experiencias y encuentra apoyo en nuestra comunidad
        </p>
      </div>

      {/* Estadísticas de la comunidad */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {estadisticasComunidad.totalMiembros.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Miembros</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">+{estadisticasComunidad.nuevosHoy}</div>
            <div className="text-sm text-muted-foreground">Nuevos hoy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{estadisticasComunidad.mensajesHoy}</div>
            <div className="text-sm text-muted-foreground">Mensajes hoy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{estadisticasComunidad.temasActivos}</div>
            <div className="text-sm text-muted-foreground">Temas activos</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="foros" className="space-y-6">
        <TabsList>
          <TabsTrigger value="foros">Foros</TabsTrigger>
          <TabsTrigger value="recientes">Temas Recientes</TabsTrigger>
          <TabsTrigger value="populares">Más Populares</TabsTrigger>
        </TabsList>

        <TabsContent value="foros" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Foros de la Comunidad</h2>
            <Button>Crear Nuevo Tema</Button>
          </div>
          <div className="grid gap-4">
            {forosPopulares.map((foro) => (
              <Card key={foro.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          <Link href={`/comunidad/foro/${foro.id}`} className="hover:text-primary">
                            {foro.titulo}
                          </Link>
                        </h3>
                        <Badge className={foro.color}>{foro.categoria}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{foro.descripcion}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{foro.miembros.toLocaleString()} miembros</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{foro.mensajes.toLocaleString()} mensajes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{foro.ultimaActividad}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-xs text-muted-foreground">Moderadores: </span>
                        <span className="text-xs">{foro.moderadores.join(", ")}</span>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/comunidad/foro/${foro.id}`}>Entrar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recientes" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Temas Recientes</h2>
            <Button>Crear Nuevo Tema</Button>
          </div>
          <div className="space-y-4">
            {temasRecientes.map((tema) => (
              <Card key={tema.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={tema.avatarAutor || "/placeholder.svg"} alt={tema.autor} />
                      <AvatarFallback>{tema.autor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {tema.fijado && <Pin className="h-4 w-4 text-primary" />}
                        <h3 className="font-medium">
                          <Link href={`/comunidad/tema/${tema.id}`} className="hover:text-primary">
                            {tema.titulo}
                          </Link>
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>Por {tema.autor}</span>
                        <span>en {tema.foro}</span>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{tema.meGusta}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Reply className="h-4 w-4" />
                            <span>{tema.respuestas} respuestas</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{tema.vistas} vistas</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Última respuesta {tema.ultimaRespuesta} por {tema.ultimoUsuario}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="populares" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Temas Más Populares</h2>
            <Button>Crear Nuevo Tema</Button>
          </div>
          <div className="space-y-4">
            {temasRecientes
              .sort((a, b) => b.meGusta - a.meGusta)
              .map((tema) => (
                <Card key={tema.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={tema.avatarAutor || "/placeholder.svg"} alt={tema.autor} />
                        <AvatarFallback>{tema.autor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <h3 className="font-medium">
                            <Link href={`/comunidad/tema/${tema.id}`} className="hover:text-primary">
                              {tema.titulo}
                            </Link>
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>Por {tema.autor}</span>
                          <span>en {tema.foro}</span>
                          <div className="flex items-center gap-1 text-red-500">
                            <Heart className="h-3 w-3 fill-current" />
                            <span>{tema.meGusta} me gusta</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Reply className="h-4 w-4" />
                              <span>{tema.respuestas} respuestas</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              <span>{tema.vistas} vistas</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">Última respuesta {tema.ultimaRespuesta}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
