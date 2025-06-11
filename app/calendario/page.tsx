"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  Video,
  Heart,
  Share2,
  Bell,
} from "lucide-react"

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState("mes")
  const [selectedCategory, setSelectedCategory] = useState("todos")

  const events = [
    {
      id: 1,
      title: "Taller: Gestión del Estrés Familiar",
      date: "2024-06-15",
      time: "18:00",
      duration: "2 horas",
      category: "bienestar",
      type: "presencial",
      location: "Centro Cívico Gràcia",
      organizer: "Dra. Elena Martínez",
      attendees: 18,
      maxAttendees: 25,
      price: "Gratuito",
      description: "Técnicas de gestión del estrés para familias",
      color: "bg-green-500",
    },
    {
      id: 2,
      title: "Webinar: Nuevas Ayudas Vivienda 2024",
      date: "2024-06-18",
      time: "17:30",
      duration: "1.5 horas",
      category: "vivienda",
      type: "online",
      location: "Streaming en directo",
      organizer: "Departament d'Habitatge",
      attendees: 234,
      maxAttendees: 500,
      price: "Gratuito",
      description: "Información sobre ayudas al alquiler",
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Encuentro: Familias con Discapacidad",
      date: "2024-06-22",
      time: "10:00",
      duration: "3 horas",
      category: "encuentro",
      type: "presencial",
      location: "Parc de la Ciutadella",
      organizer: "Associació Famílies Diverses",
      attendees: 32,
      maxAttendees: 50,
      price: "Gratuito",
      description: "Espacio de encuentro e intercambio",
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Curso: Primeros Auxilios Infantiles",
      date: "2024-06-25",
      time: "16:00",
      duration: "4 horas",
      category: "formacion",
      type: "presencial",
      location: "Hospital Sant Joan de Déu",
      organizer: "Cruz Roja Catalunya",
      attendees: 15,
      maxAttendees: 20,
      price: "15€",
      description: "Primeros auxilios para bebés y niños",
      color: "bg-red-500",
    },
    {
      id: 5,
      title: "Actividad: Limpieza Playa Bogatell",
      date: "2024-06-29",
      time: "09:00",
      duration: "3 horas",
      category: "voluntariado",
      type: "presencial",
      location: "Playa del Bogatell",
      organizer: "Ecologistes en Acció",
      attendees: 28,
      maxAttendees: 40,
      price: "Gratuito",
      description: "Actividad de limpieza y concienciación",
      color: "bg-emerald-500",
    },
  ]

  const categories = [
    { id: "todos", name: "Todos", color: "bg-gray-500" },
    { id: "bienestar", name: "Bienestar", color: "bg-green-500" },
    { id: "vivienda", name: "Vivienda", color: "bg-blue-500" },
    { id: "encuentro", name: "Encuentros", color: "bg-purple-500" },
    { id: "formacion", name: "Formación", color: "bg-red-500" },
    { id: "voluntariado", name: "Voluntariado", color: "bg-emerald-500" },
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({ date, isCurrentMonth: true })
    }

    // Días del mes siguiente para completar la grilla
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({ date: nextDate, isCurrentMonth: false })
    }

    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  const filteredEvents =
    selectedCategory === "todos" ? events : events.filter((event) => event.category === selectedCategory)

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Calendario Comunitario</h1>
        <p className="text-muted-foreground text-lg">
          Descubre todos los eventos, talleres y actividades de tu comunidad en un solo lugar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Crear Evento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Nuevo Evento</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Categorías</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-2 p-2 rounded-md text-left transition-colors ${
                        selectedCategory === category.id ? "bg-muted" : "hover:bg-muted"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span className="text-sm">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex gap-3 p-2 rounded-md hover:bg-muted">
                  <div className={`w-2 h-full rounded-full ${event.color}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} - {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Calendario principal */}
        <div className="lg:col-span-3">
          <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="mes">Mes</TabsTrigger>
                <TabsTrigger value="semana">Semana</TabsTrigger>
                <TabsTrigger value="lista">Lista</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold min-w-[200px] text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="mes" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-7 border-b">
                    {weekDays.map((day) => (
                      <div key={day} className="p-3 text-center font-medium text-sm border-r last:border-r-0">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {getDaysInMonth(currentDate).map((day, index) => {
                      const dayEvents = getEventsForDate(day.date)
                      const filteredDayEvents =
                        selectedCategory === "todos"
                          ? dayEvents
                          : dayEvents.filter((event) => event.category === selectedCategory)

                      return (
                        <div
                          key={index}
                          className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                            !day.isCurrentMonth ? "bg-muted/30" : ""
                          }`}
                        >
                          <div
                            className={`text-sm font-medium mb-1 ${!day.isCurrentMonth ? "text-muted-foreground" : ""}`}
                          >
                            {day.date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {filteredDayEvents.map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 ${event.color}`}
                                title={`${event.title} - ${event.time}`}
                              >
                                <div className="truncate">{event.title}</div>
                                <div className="text-xs opacity-90">{event.time}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="semana" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">Vista semanal en desarrollo</div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lista" className="space-y-4">
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className={`w-1 ${event.color}`} />
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{event.title}</h3>
                                {event.type === "online" && (
                                  <Badge className="bg-blue-100 text-blue-800">
                                    <Video className="h-3 w-3 mr-1" />
                                    Online
                                  </Badge>
                                )}
                                <Badge variant="outline">{event.price}</Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{event.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(event.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {event.time} ({event.duration})
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {event.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {event.attendees}/{event.maxAttendees}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">Inscribirse</Button>
                              <Button variant="outline" size="icon">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Bell className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>{event.organizer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">Organizado por {event.organizer}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
