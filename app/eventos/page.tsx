import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Users, Video, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EventosPage() {
  const eventos = {
    proximos: [
      {
        id: "evento-1",
        titulo: "Taller: Gestión del Estrés para Familias Monoparentales",
        descripcion:
          "Aprende técnicas de gestión del estrés y autocuidado específicamente diseñadas para madres y padres que crían solos.",
        fecha: "2024-06-15T18:00:00",
        duracion: "2 horas",
        modalidad: "presencial",
        ubicacion: "Centro Cívico Gràcia, Barcelona",
        organizador: {
          nombre: "Dra. Elena Martínez",
          cargo: "Psicóloga especialista en familia",
          avatar: "/placeholder.svg?height=40&width=40&text=EM",
        },
        categoria: "bienestar",
        plazas: 25,
        inscritos: 18,
        precio: "Gratuito",
        imagen: "/placeholder.svg?height=200&width=400&text=Taller+Estrés",
        tags: ["Familias Monoparentales", "Bienestar", "Presencial"],
      },
      {
        id: "evento-2",
        titulo: "Webinar: Nuevas Ayudas para Vivienda 2024",
        descripcion:
          "Información actualizada sobre las nuevas ayudas al alquiler y programas de vivienda social en Catalunya.",
        fecha: "2024-06-18T17:30:00",
        duracion: "1.5 horas",
        modalidad: "online",
        ubicacion: "Streaming en directo",
        organizador: {
          nombre: "Departament d'Habitatge",
          cargo: "Generalitat de Catalunya",
          avatar: "/placeholder.svg?height=40&width=40&text=DH",
        },
        categoria: "vivienda",
        plazas: 500,
        inscritos: 234,
        precio: "Gratuito",
        imagen: "/placeholder.svg?height=200&width=400&text=Ayudas+Vivienda",
        tags: ["Vivienda", "Ayudas", "Online"],
      },
      {
        id: "evento-3",
        titulo: "Encuentro: Familias con Niños con Discapacidad",
        descripcion: "Espacio de encuentro e intercambio de experiencias entre familias con hijos con discapacidad.",
        fecha: "2024-06-22T10:00:00",
        duracion: "3 horas",
        modalidad: "presencial",
        ubicacion: "Parc de la Ciutadella, Barcelona",
        organizador: {
          nombre: "Associació Famílies Diverses",
          cargo: "Entidad colaboradora",
          avatar: "/placeholder.svg?height=40&width=40&text=AF",
        },
        categoria: "encuentro",
        plazas: 50,
        inscritos: 32,
        precio: "Gratuito",
        imagen: "/placeholder.svg?height=200&width=400&text=Encuentro+Familias",
        tags: ["Discapacidad", "Encuentro", "Familias"],
      },
      {
        id: "evento-4",
        titulo: "Curso: Primeros Auxilios para Bebés y Niños",
        descripcion:
          "Curso práctico de primeros auxilios específico para bebés y niños pequeños, dirigido a padres y cuidadores.",
        fecha: "2024-06-25T16:00:00",
        duracion: "4 horas",
        modalidad: "presencial",
        ubicacion: "Hospital Sant Joan de Déu, Barcelona",
        organizador: {
          nombre: "Cruz Roja Catalunya",
          cargo: "Formación sanitaria",
          avatar: "/placeholder.svg?height=40&width=40&text=CR",
        },
        categoria: "formacion",
        plazas: 20,
        inscritos: 15,
        precio: "15€",
        imagen: "/placeholder.svg?height=200&width=400&text=Primeros+Auxilios",
        tags: ["Formación", "Salud", "Crianza"],
      },
    ],
    pasados: [
      {
        id: "evento-past-1",
        titulo: "Mesa Redonda: Conciliación Familiar y Laboral",
        descripcion: "Debate sobre las políticas de conciliación y su impacto en las familias catalanas.",
        fecha: "2024-05-20T19:00:00",
        asistentes: 85,
        valoracion: 4.8,
        grabacion: true,
        imagen: "/placeholder.svg?height=200&width=400&text=Mesa+Redonda",
      },
      {
        id: "evento-past-2",
        titulo: "Taller: Alimentación Saludable en la Infancia",
        descripcion: "Consejos prácticos para una alimentación equilibrada en niños de 0 a 12 años.",
        fecha: "2024-05-15T17:00:00",
        asistentes: 42,
        valoracion: 4.9,
        grabacion: true,
        imagen: "/placeholder.svg?height=200&width=400&text=Alimentación+Infantil",
      },
    ],
  }

  const getCategoryColor = (categoria: string) => {
    const colors = {
      bienestar: "bg-green-100 text-green-800",
      vivienda: "bg-blue-100 text-blue-800",
      encuentro: "bg-purple-100 text-purple-800",
      formacion: "bg-orange-100 text-orange-800",
    }
    return colors[categoria as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("es-ES", { month: "short" }),
      time: date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      weekday: date.toLocaleDateString("es-ES", { weekday: "long" }),
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Eventos y Actividades</h1>
        <p className="text-muted-foreground text-lg">
          Participa en talleres, charlas y encuentros diseñados para apoyar a las familias catalanas
        </p>
      </div>

      <Tabs defaultValue="proximos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="proximos">Próximos Eventos</TabsTrigger>
          <TabsTrigger value="pasados">Eventos Pasados</TabsTrigger>
          <TabsTrigger value="mis-eventos">Mis Eventos</TabsTrigger>
        </TabsList>

        <TabsContent value="proximos" className="space-y-6">
          <div className="grid gap-6">
            {eventos.proximos.map((evento) => {
              const dateInfo = formatDate(evento.fecha)
              const plazasDisponibles = evento.plazas - evento.inscritos

              return (
                <Card key={evento.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative h-48 md:h-full">
                        <Image
                          src={evento.imagen || "/placeholder.svg"}
                          alt={evento.titulo}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white rounded-lg p-2 text-center shadow-md">
                          <div className="text-2xl font-bold text-primary">{dateInfo.day}</div>
                          <div className="text-xs text-muted-foreground uppercase">{dateInfo.month}</div>
                        </div>
                        {evento.modalidad === "online" && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-blue-500">
                              <Video className="h-3 w-3 mr-1" />
                              Online
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(evento.categoria)}>{evento.categoria}</Badge>
                            {evento.precio === "Gratuito" && (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Gratuito
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold">{evento.titulo}</h3>
                          <p className="text-muted-foreground">{evento.descripcion}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {dateInfo.weekday}, {dateInfo.day} de {dateInfo.month}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {dateInfo.time} ({evento.duracion})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{evento.ubicacion}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {evento.inscritos}/{evento.plazas} inscritos
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={evento.organizador.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{evento.organizador.nombre.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <div className="font-medium">{evento.organizador.nombre}</div>
                              <div className="text-muted-foreground text-xs">{evento.organizador.cargo}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {evento.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button
                            className={plazasDisponibles > 0 ? "" : "opacity-50"}
                            disabled={plazasDisponibles === 0}
                          >
                            {plazasDisponibles > 0 ? "Inscribirse" : "Completo"}
                          </Button>
                          <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {plazasDisponibles > 0 ? (
                            <span className="text-green-600">{plazasDisponibles} plazas disponibles</span>
                          ) : (
                            <span className="text-red-600">Sin plazas disponibles</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="pasados" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {eventos.pasados.map((evento) => {
              const dateInfo = formatDate(evento.fecha)

              return (
                <Card key={evento.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={evento.imagen || "/placeholder.svg"}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                    />
                    {evento.grabacion && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500">
                          <Video className="h-3 w-3 mr-1" />
                          Grabación
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{evento.titulo}</CardTitle>
                    <CardDescription>{evento.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fecha:</span>
                      <span>
                        {dateInfo.day} de {dateInfo.month}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Asistentes:</span>
                      <span>{evento.asistentes}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valoración:</span>
                      <span className="flex items-center gap-1">⭐ {evento.valoracion}/5</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      {evento.grabacion && (
                        <Button size="sm" className="flex-1">
                          Ver Grabación
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Más Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="mis-eventos" className="space-y-6">
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tienes eventos programados</h3>
            <p className="text-muted-foreground mb-4">Inscríbete en eventos para verlos aquí</p>
            <Button asChild>
              <Link href="#proximos">Explorar Eventos</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
