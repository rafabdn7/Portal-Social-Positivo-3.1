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
  MapPin,
  Clock,
  Users,
  Heart,
  Award,
  Star,
  Plus,
  HandHeart,
  BookOpen,
  Utensils,
  Home,
  Baby,
  TreePine,
  Stethoscope,
  GraduationCap,
  Building,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function VoluntariadoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [selectedLocation, setSelectedLocation] = useState("todas")
  const [selectedTime, setSelectedTime] = useState("todas")

  const categories = [
    { id: "todas", name: "Todas las categorías", icon: HandHeart },
    { id: "social", name: "Acción Social", icon: Heart },
    { id: "educacion", name: "Educación", icon: BookOpen },
    { id: "alimentacion", name: "Alimentación", icon: Utensils },
    { id: "vivienda", name: "Vivienda", icon: Home },
    { id: "infancia", name: "Infancia", icon: Baby },
    { id: "medioambiente", name: "Medio Ambiente", icon: TreePine },
    { id: "salud", name: "Salud", icon: Stethoscope },
    { id: "formacion", name: "Formación", icon: GraduationCap },
    { id: "organizacion", name: "Organización", icon: Building },
  ]

  const opportunities = [
    {
      id: 1,
      title: "Acompañamiento a personas mayores",
      organization: "Fundació Amics de la Gent Gran",
      category: "social",
      location: "Barcelona, Eixample",
      timeCommitment: "2-4 horas/semana",
      duration: "Mínimo 6 meses",
      volunteers: 15,
      maxVolunteers: 25,
      urgent: true,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Acompaña a personas mayores en actividades cotidianas, paseos y conversación. Ayuda a combatir la soledad.",
      requirements: ["Empatía", "Paciencia", "Disponibilidad regular"],
      benefits: ["Formación inicial", "Seguro de voluntariado", "Certificado de participación"],
      contact: {
        name: "María Rodríguez",
        email: "voluntariado@amicsgentagran.org",
        phone: "93 123 45 67",
      },
      rating: 4.8,
      reviews: 23,
      verified: true,
    },
    {
      id: 2,
      title: "Apoyo escolar a niños en riesgo de exclusión",
      organization: "Fundació Educació Solidària",
      category: "educacion",
      location: "Barcelona, Nou Barris",
      timeCommitment: "3 horas/semana",
      duration: "Curso escolar",
      volunteers: 8,
      maxVolunteers: 12,
      urgent: false,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Refuerzo educativo y apoyo en tareas escolares para niños de primaria en situación de vulnerabilidad.",
      requirements: ["Estudios mínimos ESO", "Experiencia con niños", "Compromiso"],
      benefits: ["Formación pedagógica", "Seguimiento personalizado", "Reconocimiento oficial"],
      contact: {
        name: "Carlos Martín",
        email: "educacion@solidaria.org",
        phone: "93 234 56 78",
      },
      rating: 4.9,
      reviews: 31,
      verified: true,
    },
    {
      id: 3,
      title: "Reparto de alimentos en banco de alimentos",
      organization: "Banc dels Aliments",
      category: "alimentacion",
      location: "Barcelona, Mercabarna",
      timeCommitment: "4 horas/sábado",
      duration: "Flexible",
      volunteers: 45,
      maxVolunteers: 60,
      urgent: false,
      image: "/placeholder.svg?height=200&width=300",
      description: "Clasificación, empaquetado y distribución de alimentos para familias necesitadas.",
      requirements: ["Disponibilidad sábados", "Capacidad física", "Trabajo en equipo"],
      benefits: ["Desayuno incluido", "Transporte público", "Ambiente familiar"],
      contact: {
        name: "Ana López",
        email: "voluntarios@bancaliments.org",
        phone: "93 345 67 89",
      },
      rating: 4.7,
      reviews: 67,
      verified: true,
    },
    {
      id: 4,
      title: "Cuidado de animales abandonados",
      organization: "Protectora Animals Barcelona",
      category: "social",
      location: "Barcelona, Zona Franca",
      timeCommitment: "2-6 horas/semana",
      duration: "Mínimo 3 meses",
      volunteers: 22,
      maxVolunteers: 30,
      urgent: true,
      image: "/placeholder.svg?height=200&width=300",
      description: "Cuidado, paseo y socialización de perros y gatos en busca de adopción.",
      requirements: ["Amor por los animales", "No alergias", "Responsabilidad"],
      benefits: ["Formación en cuidado animal", "Descuentos veterinarios", "Eventos especiales"],
      contact: {
        name: "David García",
        email: "voluntarios@protectorabcn.org",
        phone: "93 456 78 90",
      },
      rating: 4.6,
      reviews: 89,
      verified: true,
    },
    {
      id: 5,
      title: "Limpieza de playas y espacios naturales",
      organization: "Ecologistes en Acció",
      category: "medioambiente",
      location: "Barcelona, Costa",
      timeCommitment: "3 horas/mes",
      duration: "Flexible",
      volunteers: 18,
      maxVolunteers: 25,
      urgent: false,
      image: "/placeholder.svg?height=200&width=300",
      description: "Actividades de limpieza y concienciación ambiental en playas y parques naturales.",
      requirements: ["Conciencia ambiental", "Disponibilidad fines de semana", "Ropa adecuada"],
      benefits: ["Material incluido", "Formación ambiental", "Certificado ecológico"],
      contact: {
        name: "Laura Sánchez",
        email: "voluntarios@ecologistes.cat",
        phone: "93 567 89 01",
      },
      rating: 4.8,
      reviews: 42,
      verified: true,
    },
  ]

  const volunteerStats = {
    totalVolunteers: 1247,
    activeOpportunities: 89,
    hoursThisMonth: 3456,
    organizationsPartner: 67,
  }

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "todas" || opportunity.category === selectedCategory
    const matchesLocation = selectedLocation === "todas" || opportunity.location.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Voluntariado Comunitario</h1>
        <p className="text-muted-foreground text-lg">
          Únete a nuestra red de voluntarios y marca la diferencia en tu comunidad. Encuentra oportunidades que se
          adapten a tu tiempo y pasiones.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{volunteerStats.totalVolunteers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Voluntarios activos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{volunteerStats.activeOpportunities}</div>
            <div className="text-sm text-muted-foreground">Oportunidades</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{volunteerStats.hoursThisMonth.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Horas este mes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{volunteerStats.organizationsPartner}</div>
            <div className="text-sm text-muted-foreground">Organizaciones</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="oportunidades" className="space-y-6">
        <TabsList>
          <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
          <TabsTrigger value="mis-actividades">Mis Actividades</TabsTrigger>
          <TabsTrigger value="organizaciones">Organizaciones</TabsTrigger>
          <TabsTrigger value="crear">Crear Oportunidad</TabsTrigger>
        </TabsList>

        <TabsContent value="oportunidades" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar oportunidades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las ubicaciones</SelectItem>
                    <SelectItem value="Barcelona">Barcelona</SelectItem>
                    <SelectItem value="Hospitalet">L'Hospitalet</SelectItem>
                    <SelectItem value="Badalona">Badalona</SelectItem>
                    <SelectItem value="Terrassa">Terrassa</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tiempo disponible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Cualquier tiempo</SelectItem>
                    <SelectItem value="1-2">1-2 horas/semana</SelectItem>
                    <SelectItem value="3-5">3-5 horas/semana</SelectItem>
                    <SelectItem value="6+">6+ horas/semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de oportunidades */}
          <div className="space-y-6">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative">
                      <img
                        src={opportunity.image || "/placeholder.svg"}
                        alt={opportunity.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      {opportunity.urgent && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Urgente
                        </Badge>
                      )}
                      {opportunity.verified && (
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </div>

                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{opportunity.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{opportunity.organization}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {opportunity.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {opportunity.timeCommitment}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {opportunity.rating} ({opportunity.reviews})
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="h-4 w-4" />
                            <span>
                              {opportunity.volunteers}/{opportunity.maxVolunteers}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">voluntarios</div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{opportunity.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Requisitos:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {opportunity.requirements.map((req, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Beneficios:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {opportunity.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Award className="h-3 w-3 text-blue-500" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button>
                            <HandHeart className="h-4 w-4 mr-2" />
                            Apuntarme
                          </Button>
                          <Button variant="outline">
                            <Heart className="h-4 w-4 mr-2" />
                            Guardar
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Globe className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mis-actividades" className="space-y-6">
          <div className="text-center py-12">
            <HandHeart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tienes actividades de voluntariado</h3>
            <p className="text-muted-foreground mb-4">Únete a una oportunidad para empezar a ayudar</p>
            <Button>Explorar Oportunidades</Button>
          </div>
        </TabsContent>

        <TabsContent value="organizaciones" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=ORG${index + 1}`} />
                      <AvatarFallback>O{index + 1}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Organización {index + 1}</CardTitle>
                      <CardDescription>Descripción breve</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Voluntarios:</span>
                      <span>{Math.floor(Math.random() * 100) + 20}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Oportunidades:</span>
                      <span>{Math.floor(Math.random() * 10) + 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valoración:</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {(Math.random() * 1 + 4).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Ver Perfil
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crear" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Oportunidad de Voluntariado</CardTitle>
              <CardDescription>
                ¿Representas una organización? Publica oportunidades de voluntariado para tu causa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Título de la oportunidad</label>
                  <Input placeholder="Ej: Apoyo a familias vulnerables" />
                </div>
                <div>
                  <label className="text-sm font-medium">Organización</label>
                  <Input placeholder="Nombre de tu organización" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Descripción</label>
                <textarea
                  className="w-full p-3 border rounded-md"
                  rows={4}
                  placeholder="Describe la actividad de voluntariado..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Categoría</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona categoría" />
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
                  <label className="text-sm font-medium">Ubicación</label>
                  <Input placeholder="Barcelona, Distrito" />
                </div>
                <div>
                  <label className="text-sm font-medium">Tiempo requerido</label>
                  <Input placeholder="Ej: 2-4 horas/semana" />
                </div>
              </div>
              <div className="flex gap-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Publicar Oportunidad
                </Button>
                <Button variant="outline">Vista Previa</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
