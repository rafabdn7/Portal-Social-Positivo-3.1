"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Star,
  Clock,
  Users,
  Heart,
  MessageCircle,
  Video,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  Home,
  Baby,
  GraduationCap,
  DollarSign,
  Stethoscope,
  Scale,
  Plus,
  CheckCircle,
  MapPin,
  Languages,
  Phone,
} from "lucide-react"

export default function MentoriasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [selectedExperience, setSelectedExperience] = useState("todas")
  const [selectedLanguage, setSelectedLanguage] = useState("todas")

  const categories = [
    { id: "todas", name: "Todas las áreas", icon: Users },
    { id: "crianza", name: "Crianza y Familia", icon: Baby },
    { id: "educacion", name: "Educación", icon: GraduationCap },
    { id: "trabajo", name: "Trabajo y Carrera", icon: Briefcase },
    { id: "vivienda", name: "Vivienda", icon: Home },
    { id: "finanzas", name: "Finanzas Personales", icon: DollarSign },
    { id: "salud", name: "Salud y Bienestar", icon: Stethoscope },
    { id: "legal", name: "Asesoría Legal", icon: Scale },
    { id: "emprendimiento", name: "Emprendimiento", icon: BookOpen },
  ]

  const mentors = [
    {
      id: 1,
      name: "María González",
      title: "Psicóloga Familiar",
      category: "crianza",
      experience: "8 años",
      rating: 4.9,
      reviews: 47,
      sessions: 156,
      languages: ["Español", "Catalán"],
      location: "Barcelona",
      price: "Gratuito",
      availability: "Lun-Vie 18:00-21:00",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Especialista en crianza positiva y gestión del estrés familiar. Ayudo a padres y madres a desarrollar herramientas para una crianza más consciente.",
      specialties: ["Crianza positiva", "Gestión del estrés", "Comunicación familiar"],
      verified: true,
      premium: true,
      responseTime: "< 2 horas",
      sessionTypes: ["Video llamada", "Presencial", "Chat"],
    },
    {
      id: 2,
      name: "Carlos Martín",
      title: "Orientador Laboral",
      category: "trabajo",
      experience: "12 años",
      rating: 4.8,
      reviews: 89,
      sessions: 234,
      languages: ["Español", "Catalán", "Inglés"],
      location: "Barcelona",
      price: "15€/sesión",
      availability: "Mar-Jue 17:00-20:00",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Orientador laboral especializado en inserción profesional y desarrollo de carrera. Te ayudo a encontrar trabajo y mejorar tu perfil profesional.",
      specialties: ["Búsqueda de empleo", "CV y entrevistas", "Desarrollo profesional"],
      verified: true,
      premium: false,
      responseTime: "< 4 horas",
      sessionTypes: ["Video llamada", "Presencial"],
    },
    {
      id: 3,
      name: "Ana López",
      title: "Trabajadora Social",
      category: "vivienda",
      experience: "6 años",
      rating: 4.7,
      reviews: 32,
      sessions: 98,
      languages: ["Español", "Catalán"],
      location: "Barcelona",
      price: "Gratuito",
      availability: "Lun-Mié 16:00-19:00",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Trabajadora social especializada en vivienda y servicios sociales. Te oriento sobre ayudas, trámites y recursos disponibles.",
      specialties: ["Ayudas vivienda", "Servicios sociales", "Trámites administrativos"],
      verified: true,
      premium: false,
      responseTime: "< 6 horas",
      sessionTypes: ["Video llamada", "Presencial", "Teléfono"],
    },
    {
      id: 4,
      name: "David Ruiz",
      title: "Asesor Financiero",
      category: "finanzas",
      experience: "10 años",
      rating: 4.6,
      reviews: 56,
      sessions: 178,
      languages: ["Español", "Catalán", "Inglés"],
      location: "Barcelona",
      price: "25€/sesión",
      availability: "Vie-Sáb 10:00-14:00",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Asesor financiero con experiencia en planificación familiar y gestión de presupuestos. Te ayudo a organizar tus finanzas personales.",
      specialties: ["Presupuesto familiar", "Ahorro", "Planificación financiera"],
      verified: true,
      premium: true,
      responseTime: "< 3 horas",
      sessionTypes: ["Video llamada", "Presencial"],
    },
    {
      id: 5,
      name: "Elena Sánchez",
      title: "Pedagoga",
      category: "educacion",
      experience: "15 años",
      rating: 4.9,
      reviews: 73,
      sessions: 267,
      languages: ["Español", "Catalán", "Francés"],
      location: "Barcelona",
      price: "20€/sesión",
      availability: "Lun-Vie 17:00-20:00",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Pedagoga especializada en dificultades de aprendizaje y orientación educativa. Apoyo a familias en el proceso educativo de sus hijos.",
      specialties: ["Dificultades aprendizaje", "Orientación educativa", "Técnicas de estudio"],
      verified: true,
      premium: true,
      responseTime: "< 1 hora",
      sessionTypes: ["Video llamada", "Presencial", "Chat"],
    },
    {
      id: 6,
      name: "Laura Torres",
      title: "Abogada Familiar",
      category: "legal",
      experience: "9 años",
      rating: 4.8,
      reviews: 41,
      sessions: 123,
      languages: ["Español", "Catalán"],
      location: "Barcelona",
      price: "30€/consulta",
      availability: "Mar-Jue 19:00-21:00",
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Abogada especializada en derecho de familia y extranjería. Ofrezco asesoramiento legal accesible para familias en situación vulnerable.",
      specialties: ["Derecho de familia", "Extranjería", "Custodia"],
      verified: true,
      premium: false,
      responseTime: "< 12 horas",
      sessionTypes: ["Video llamada", "Presencial"],
    },
  ]

  const mentorshipStats = {
    totalMentors: 156,
    activeSessions: 89,
    successStories: 1247,
    averageRating: 4.8,
  }

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "todas" || mentor.category === selectedCategory
    const matchesExperience =
      selectedExperience === "todas" ||
      (selectedExperience === "junior" && Number.parseInt(mentor.experience) < 5) ||
      (selectedExperience === "senior" &&
        Number.parseInt(mentor.experience) >= 5 &&
        Number.parseInt(mentor.experience) < 10) ||
      (selectedExperience === "expert" && Number.parseInt(mentor.experience) >= 10)
    const matchesLanguage = selectedLanguage === "todas" || mentor.languages.includes(selectedLanguage)

    return matchesSearch && matchesCategory && matchesExperience && matchesLanguage
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Sistema de Mentorías</h1>
        <p className="text-muted-foreground text-lg">
          Conecta con mentores experimentados que pueden guiarte en diferentes aspectos de la vida familiar y personal
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mentorshipStats.totalMentors}</div>
            <div className="text-sm text-muted-foreground">Mentores activos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{mentorshipStats.activeSessions}</div>
            <div className="text-sm text-muted-foreground">Sesiones activas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{mentorshipStats.successStories.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Historias de éxito</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{mentorshipStats.averageRating}</div>
            <div className="text-sm text-muted-foreground">Valoración media</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mentores" className="space-y-6">
        <TabsList>
          <TabsTrigger value="mentores">Encontrar Mentor</TabsTrigger>
          <TabsTrigger value="mis-sesiones">Mis Sesiones</TabsTrigger>
          <TabsTrigger value="ser-mentor">Ser Mentor</TabsTrigger>
          <TabsTrigger value="recursos">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="mentores" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar mentores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Área de mentoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Experiencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Toda experiencia</SelectItem>
                    <SelectItem value="junior">Menos de 5 años</SelectItem>
                    <SelectItem value="senior">5-10 años</SelectItem>
                    <SelectItem value="expert">Más de 10 años</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todos los idiomas</SelectItem>
                    <SelectItem value="Español">Español</SelectItem>
                    <SelectItem value="Catalán">Catalán</SelectItem>
                    <SelectItem value="Inglés">Inglés</SelectItem>
                    <SelectItem value="Francés">Francés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de mentores */}
          <div className="grid gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                    <div className="p-6 flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20 mb-4">
                        <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1 mb-2">
                        {mentor.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {mentor.premium && <Award className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-sm text-muted-foreground">({mentor.reviews})</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{mentor.sessions} sesiones completadas</div>
                    </div>

                    <div className="md:col-span-3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold">{mentor.name}</h3>
                            {mentor.premium && <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>}
                          </div>
                          <p className="text-muted-foreground mb-2">{mentor.title}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {mentor.experience} experiencia
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {mentor.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Languages className="h-4 w-4" />
                              {mentor.languages.join(", ")}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Responde {mentor.responseTime}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">{mentor.price}</p>
                          <p className="text-sm text-muted-foreground">{mentor.availability}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{mentor.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button>
                            <Calendar className="h-4 w-4 mr-2" />
                            Reservar Sesión
                          </Button>
                          <Button variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Mensaje
                          </Button>
                          <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          {mentor.sessionTypes.map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type === "Video llamada" && <Video className="h-3 w-3 mr-1" />}
                              {type === "Presencial" && <Users className="h-3 w-3 mr-1" />}
                              {type === "Chat" && <MessageCircle className="h-3 w-3 mr-1" />}
                              {type === "Teléfono" && <Phone className="h-3 w-3 mr-1" />}
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mis-sesiones" className="space-y-6">
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tienes sesiones programadas</h3>
            <p className="text-muted-foreground mb-4">Reserva una sesión con un mentor para empezar</p>
            <Button>Encontrar Mentor</Button>
          </div>
        </TabsContent>

        <TabsContent value="ser-mentor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>¿Quieres ser mentor?</CardTitle>
              <CardDescription>Comparte tu experiencia y ayuda a otras familias de tu comunidad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nombre completo</label>
                  <Input placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="text-sm font-medium">Profesión/Título</label>
                  <Input placeholder="Ej: Psicóloga Familiar" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Área de especialización</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu área" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Experiencia profesional</label>
                <textarea
                  className="w-full p-3 border rounded-md"
                  rows={4}
                  placeholder="Describe tu experiencia y cómo puedes ayudar..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Años de experiencia</label>
                  <Input placeholder="Ej: 5 años" />
                </div>
                <div>
                  <label className="text-sm font-medium">Idiomas</label>
                  <Input placeholder="Ej: Español, Catalán, Inglés" />
                </div>
              </div>
              <div className="flex gap-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Solicitar ser Mentor
                </Button>
                <Button variant="outline">Más Información</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recursos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Guías de Mentoría
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Recursos y guías para aprovechar al máximo tu experiencia de mentoría
                </p>
                <Button variant="outline" className="w-full">
                  Ver Guías
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Comunidad de Mentores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Conecta con otros mentores y comparte experiencias</p>
                <Button variant="outline" className="w-full">
                  Unirse
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certificaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Obtén certificaciones que validen tu experiencia como mentor
                </p>
                <Button variant="outline" className="w-full">
                  Ver Cursos
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
