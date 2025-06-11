"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, Clock, Star, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MapResource {
  id: string
  name: string
  type: "centro-social" | "hospital" | "escuela" | "ayuntamiento" | "biblioteca" | "centro-dia"
  address: string
  city: string
  phone: string
  hours: string
  description: string
  services: string[]
  rating: number
  distance: number
  coordinates: { lat: number; lng: number }
  urgent: boolean
}

export default function MapaPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedResource, setSelectedResource] = useState<MapResource | null>(null)

  const resources: MapResource[] = [
    {
      id: "resource-1",
      name: "Centro de Servicios Sociales Gràcia",
      type: "centro-social",
      address: "Carrer de Torrijos, 54, Barcelona",
      city: "Barcelona",
      phone: "932 56 78 90",
      hours: "L-V: 9:00-14:00, 16:00-18:00",
      description: "Centro de atención social integral para familias del distrito de Gràcia",
      services: ["Información social", "Tramitación ayudas", "Apoyo psicológico", "Mediación familiar"],
      rating: 4.5,
      distance: 0.8,
      coordinates: { lat: 41.4036, lng: 2.1588 },
      urgent: false,
    },
    {
      id: "resource-2",
      name: "Hospital Sant Joan de Déu",
      type: "hospital",
      address: "Passeig de Sant Joan de Déu, 2, Esplugues de Llobregat",
      city: "Esplugues de Llobregat",
      phone: "932 53 21 00",
      hours: "24 horas",
      description: "Hospital pediátrico de referencia con servicios especializados",
      services: ["Pediatría", "Urgencias", "Consultas especializadas", "Trabajo social sanitario"],
      rating: 4.8,
      distance: 5.2,
      coordinates: { lat: 41.3788, lng: 2.0966 },
      urgent: true,
    },
    {
      id: "resource-3",
      name: "Escola Bressol Municipal Els Pins",
      type: "escuela",
      address: "Carrer dels Pins, 12, Barcelona",
      city: "Barcelona",
      phone: "934 12 56 78",
      hours: "L-V: 7:30-18:00",
      description: "Escuela infantil municipal para niños de 0 a 3 años",
      services: ["Educación infantil", "Comedor", "Horario ampliado", "Apoyo familias"],
      rating: 4.3,
      distance: 1.2,
      coordinates: { lat: 41.4001, lng: 2.1734 },
      urgent: false,
    },
    {
      id: "resource-4",
      name: "Ajuntament de Barcelona - Distrito Eixample",
      type: "ayuntamiento",
      address: "Carrer d'Aragó, 311, Barcelona",
      city: "Barcelona",
      phone: "010",
      hours: "L-V: 8:30-14:00",
      description: "Oficina de atención ciudadana del distrito del Eixample",
      services: ["Trámites administrativos", "Empadronamiento", "Licencias", "Información municipal"],
      rating: 3.9,
      distance: 2.1,
      coordinates: { lat: 41.3926, lng: 2.1637 },
      urgent: false,
    },
    {
      id: "resource-5",
      name: "Biblioteca Jaume Fuster",
      type: "biblioteca",
      address: "Plaça de Lesseps, 20-22, Barcelona",
      city: "Barcelona",
      phone: "932 56 21 00",
      hours: "L-V: 10:00-21:00, S: 10:00-14:00",
      description: "Biblioteca pública con servicios especiales para familias",
      services: ["Préstamo libros", "Actividades infantiles", "Formación digital", "Espacio estudio"],
      rating: 4.6,
      distance: 1.5,
      coordinates: { lat: 41.4048, lng: 2.1588 },
      urgent: false,
    },
    {
      id: "resource-6",
      name: "Centro de Día Gent Gran Sarrià",
      type: "centro-dia",
      address: "Carrer de Sarrià, 45, Barcelona",
      city: "Barcelona",
      phone: "932 03 45 67",
      hours: "L-V: 8:00-18:00",
      description: "Centro de día para personas mayores con servicios integrales",
      services: ["Atención diurna", "Fisioterapia", "Actividades", "Transporte", "Comedor"],
      rating: 4.4,
      distance: 3.8,
      coordinates: { lat: 41.3985, lng: 2.1189 },
      urgent: false,
    },
  ]

  useEffect(() => {
    // Simular obtención de ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error)
          // Ubicación por defecto (Barcelona)
          setUserLocation({ lat: 41.3851, lng: 2.1734 })
        },
      )
    } else {
      // Ubicación por defecto (Barcelona)
      setUserLocation({ lat: 41.3851, lng: 2.1734 })
    }
  }, [])

  const filteredResources = resources.filter((resource) => {
    const matchesType = selectedType === "all" || resource.type === selectedType
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesType && matchesSearch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "centro-social":
        return "🏢"
      case "hospital":
        return "🏥"
      case "escuela":
        return "🏫"
      case "ayuntamiento":
        return "🏛️"
      case "biblioteca":
        return "📚"
      case "centro-dia":
        return "🏠"
      default:
        return "📍"
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case "centro-social":
        return "Centro Social"
      case "hospital":
        return "Hospital"
      case "escuela":
        return "Escuela"
      case "ayuntamiento":
        return "Ayuntamiento"
      case "biblioteca":
        return "Biblioteca"
      case "centro-dia":
        return "Centro de Día"
      default:
        return "Recurso"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "centro-social":
        return "bg-blue-100 text-blue-800"
      case "hospital":
        return "bg-red-100 text-red-800"
      case "escuela":
        return "bg-green-100 text-green-800"
      case "ayuntamiento":
        return "bg-purple-100 text-purple-800"
      case "biblioteca":
        return "bg-orange-100 text-orange-800"
      case "centro-dia":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mapa de Recursos</h1>
        <p className="text-muted-foreground">Encuentra servicios y recursos cerca de ti</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filtros y lista */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar recursos..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de recurso</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="centro-social">Centros Sociales</SelectItem>
                    <SelectItem value="hospital">Hospitales</SelectItem>
                    <SelectItem value="escuela">Escuelas</SelectItem>
                    <SelectItem value="ayuntamiento">Ayuntamientos</SelectItem>
                    <SelectItem value="biblioteca">Bibliotecas</SelectItem>
                    <SelectItem value="centro-dia">Centros de Día</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" variant="outline">
                <Navigation className="h-4 w-4 mr-2" />
                Usar mi ubicación
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recursos cercanos ({filteredResources.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedResource?.id === resource.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedResource(resource)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getTypeIcon(resource.type)}</span>
                          <div>
                            <h3 className="font-medium text-sm">{resource.name}</h3>
                            <Badge variant="secondary" className={`text-xs ${getTypeColor(resource.type)}`}>
                              {getTypeName(resource.type)}
                            </Badge>
                          </div>
                        </div>
                        {resource.urgent && <Badge className="bg-red-500 text-xs">Urgente</Badge>}
                      </div>

                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{resource.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          <span>{resource.distance} km</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{resource.rating}/5</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {resource.services.slice(0, 2).map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {resource.services.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{resource.services.length - 2} más
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mapa y detalles */}
        <div className="lg:col-span-2 space-y-4">
          {/* Simulación del mapa */}
          <Card>
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-20 right-20 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 left-20 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-10 right-10 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-bounce"></div>
                </div>
                <div className="text-center z-10">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Mapa Interactivo</h3>
                  <p className="text-sm text-muted-foreground">
                    Aquí se mostraría un mapa interactivo con todos los recursos
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    📍 Tu ubicación • 🔴 Centros Sociales • 🔵 Hospitales • 🟢 Escuelas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalles del recurso seleccionado */}
          {selectedResource && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(selectedResource.type)}</span>
                    <div>
                      <CardTitle className="text-xl">{selectedResource.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getTypeColor(selectedResource.type)}>
                          {getTypeName(selectedResource.type)}
                        </Badge>
                        {selectedResource.urgent && <Badge className="bg-red-500">Urgente</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="font-medium">{selectedResource.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{selectedResource.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedResource.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedResource.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedResource.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedResource.distance} km de distancia</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Servicios disponibles:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedResource.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <Navigation className="h-4 w-4 mr-2" />
                    Cómo llegar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar
                  </Button>
                  <Button variant="outline">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
