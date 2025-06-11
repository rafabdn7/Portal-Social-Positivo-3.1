"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  Heart,
  Share2,
  MessageCircle,
  Phone,
  Calendar,
  Users,
  Verified,
  ShoppingBag,
  Home,
  Baby,
  GraduationCap,
  Wrench,
  Car,
  Scissors,
  Stethoscope,
  Camera,
  Music,
  Palette,
  ChefHat,
  Dumbbell,
  Laptop,
  TreePine,
  Briefcase,
  Building,
} from "lucide-react"

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedLocation, setSelectedLocation] = useState("todos")
  const [priceRange, setPriceRange] = useState("todos")
  const [sortBy, setSortBy] = useState("relevancia")

  const categories = [
    { id: "todos", name: "Todas las categorías", icon: ShoppingBag },
    { id: "hogar", name: "Hogar y Limpieza", icon: Home },
    { id: "cuidado-infantil", name: "Cuidado Infantil", icon: Baby },
    { id: "educacion", name: "Educación y Clases", icon: GraduationCap },
    { id: "reparaciones", name: "Reparaciones", icon: Wrench },
    { id: "transporte", name: "Transporte", icon: Car },
    { id: "belleza", name: "Belleza y Estética", icon: Scissors },
    { id: "salud", name: "Salud y Bienestar", icon: Stethoscope },
    { id: "eventos", name: "Fotografía y Eventos", icon: Camera },
    { id: "musica", name: "Música y Arte", icon: Music },
    { id: "diseno", name: "Diseño y Creatividad", icon: Palette },
    { id: "cocina", name: "Cocina y Catering", icon: ChefHat },
    { id: "deporte", name: "Deporte y Fitness", icon: Dumbbell },
    { id: "tecnologia", name: "Tecnología", icon: Laptop },
    { id: "jardineria", name: "Jardinería", icon: TreePine },
    { id: "negocios", name: "Servicios Empresariales", icon: Briefcase },
    { id: "inmobiliario", name: "Inmobiliario", icon: Building },
  ]

  const services = [
    {
      id: 1,
      title: "Cuidado de niños en casa",
      provider: "María González",
      category: "cuidado-infantil",
      location: "Barcelona, Eixample",
      price: "12-15€/hora",
      rating: 4.9,
      reviews: 47,
      verified: true,
      premium: true,
      image: "/placeholder.svg?height=200&width=300",
      description: "Cuidadora experimentada con más de 5 años de experiencia. Disponible tardes y fines de semana.",
      tags: ["Experiencia", "Referencias", "Flexible"],
      availability: "Lun-Vie 16:00-20:00, Sáb-Dom todo el día",
      responseTime: "< 2 horas",
      languages: ["Catalán", "Español", "Inglés"],
      certifications: ["Primeros Auxilios", "Curso de Cuidado Infantil"],
    },
    {
      id: 2,
      title: "Clases particulares de matemáticas",
      provider: "David Martín",
      category: "educacion",
      location: "Barcelona, Gràcia",
      price: "20-25€/hora",
      rating: 4.8,
      reviews: 32,
      verified: true,
      premium: false,
      image: "/placeholder.svg?height=200&width=300",
      description: "Profesor de matemáticas con 10 años de experiencia. ESO, Bachillerato y preparación selectividad.",
      tags: ["Profesor titulado", "Resultados garantizados", "Online/Presencial"],
      availability: "Lun-Vie 17:00-21:00",
      responseTime: "< 4 horas",
      languages: ["Catalán", "Español"],
      certifications: ["Licenciado en Matemáticas", "Máster en Educación"],
    },
    {
      id: 3,
      title: "Limpieza del hogar",
      provider: "Limpieza Express SL",
      category: "hogar",
      location: "Barcelona, Zona Metropolitana",
      price: "15-20€/hora",
      rating: 4.7,
      reviews: 156,
      verified: true,
      premium: true,
      image: "/placeholder.svg?height=200&width=300",
      description: "Servicio profesional de limpieza. Productos ecológicos incluidos. Seguro de responsabilidad civil.",
      tags: ["Productos ecológicos", "Asegurado", "Equipo profesional"],
      availability: "Lun-Sáb 8:00-18:00",
      responseTime: "< 1 hora",
      languages: ["Catalán", "Español"],
      certifications: ["Empresa registrada", "Seguro RC"],
    },
    {
      id: 4,
      title: "Reparación de electrodomésticos",
      provider: "TecnoFix Barcelona",
      category: "reparaciones",
      location: "Barcelona, Toda la ciudad",
      price: "30-50€ + piezas",
      rating: 4.6,
      reviews: 89,
      verified: true,
      premium: false,
      image: "/placeholder.svg?height=200&width=300",
      description: "Reparación de lavadoras, neveras, lavavajillas y más. Diagnóstico gratuito. Garantía de 6 meses.",
      tags: ["Diagnóstico gratuito", "Garantía", "Servicio rápido"],
      availability: "Lun-Vie 9:00-19:00, Sáb 9:00-14:00",
      responseTime: "< 3 horas",
      languages: ["Catalán", "Español"],
      certifications: ["Técnico autorizado", "Garantía oficial"],
    },
    {
      id: 5,
      title: "Clases de guitarra",
      provider: "Ana Ruiz",
      category: "musica",
      location: "Barcelona, Sarrià",
      price: "25€/hora",
      rating: 4.9,
      reviews: 28,
      verified: true,
      premium: false,
      image: "/placeholder.svg?height=200&width=300",
      description: "Profesora de guitarra clásica y moderna. Todos los niveles. Preparación para conservatorio.",
      tags: ["Todos los niveles", "Conservatorio", "Método personalizado"],
      availability: "Lun-Jue 16:00-20:00",
      responseTime: "< 6 horas",
      languages: ["Catalán", "Español", "Francés"],
      certifications: ["Título Superior de Música", "15 años experiencia"],
    },
    {
      id: 6,
      title: "Fotografía de eventos",
      provider: "Foto Moments",
      category: "eventos",
      location: "Barcelona y alrededores",
      price: "200-500€/evento",
      rating: 4.8,
      reviews: 73,
      verified: true,
      premium: true,
      image: "/placeholder.svg?height=200&width=300",
      description: "Fotografía profesional para bodas, bautizos, comuniones y eventos corporativos. Entrega digital.",
      tags: ["Profesional", "Entrega rápida", "Retoque incluido"],
      availability: "Fines de semana y festivos",
      responseTime: "< 12 horas",
      languages: ["Catalán", "Español", "Inglés"],
      certifications: ["Fotógrafo profesional", "Equipo profesional"],
    },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "todos" || service.category === selectedCategory
    const matchesLocation = selectedLocation === "todos" || service.location.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "precio-asc":
        return Number.parseFloat(a.price.split("-")[0]) - Number.parseFloat(b.price.split("-")[0])
      case "precio-desc":
        return Number.parseFloat(b.price.split("-")[0]) - Number.parseFloat(a.price.split("-")[0])
      case "valoracion":
        return b.rating - a.rating
      case "resenas":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Marketplace de Servicios</h1>
        <p className="text-muted-foreground">
          Encuentra y ofrece servicios locales en tu comunidad. Conecta con profesionales de confianza cerca de ti.
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar servicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                <SelectItem value="todos">Todas las ubicaciones</SelectItem>
                <SelectItem value="Barcelona">Barcelona</SelectItem>
                <SelectItem value="Hospitalet">L'Hospitalet</SelectItem>
                <SelectItem value="Badalona">Badalona</SelectItem>
                <SelectItem value="Terrassa">Terrassa</SelectItem>
                <SelectItem value="Sabadell">Sabadell</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Relevancia</SelectItem>
                <SelectItem value="valoracion">Mejor valorados</SelectItem>
                <SelectItem value="resenas">Más reseñas</SelectItem>
                <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar con categorías */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Categorías</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                        selectedCategory === category.id ? "bg-muted" : ""
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{category.name}</span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>¿Ofreces servicios?</CardTitle>
              <CardDescription>Únete a nuestra comunidad de proveedores de servicios</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Publicar servicio</Button>
            </CardContent>
          </Card>
        </div>

        {/* Lista de servicios */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">{sortedServices.length} servicios encontrados</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {sortedServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      {service.premium && (
                        <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900">Premium</Badge>
                      )}
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{service.title}</h3>
                            {service.verified && <Verified className="h-4 w-4 text-blue-500" />}
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">por {service.provider}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {service.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {service.rating} ({service.reviews} reseñas)
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">{service.price}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            Responde {service.responseTime}
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{service.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">Disponibilidad:</span>
                          </div>
                          <p className="text-muted-foreground">{service.availability}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">Idiomas:</span>
                          </div>
                          <p className="text-muted-foreground">{service.languages.join(", ")}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-between items-center">
                        <div className="flex gap-2">
                          <Button>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contactar
                          </Button>
                          <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Reservar
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedServices.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron servicios</h3>
                <p className="text-muted-foreground mb-4">
                  Intenta ajustar tus filtros de búsqueda o explora otras categorías
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("todos")
                    setSelectedLocation("todos")
                  }}
                >
                  Limpiar filtros
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Paginación */}
          {sortedServices.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Anterior
                </Button>
                <Button variant="outline" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Siguiente</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
