"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, MapPin, Calendar, Users, FileText, Star } from "lucide-react"
import Link from "next/link"

export default function BuscarPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    categoria: "",
    ubicacion: "",
    tipo: "",
    urgencia: false,
    gratuito: false,
  })

  const resultados = {
    ayudas: [
      {
        id: "ayuda-1",
        titulo: "Renta Garantizada de Ciudadanía",
        descripcion: "Prestación económica para garantizar ingresos mínimos",
        categoria: "Ayuda Económica",
        ubicacion: "Catalunya",
        cuantia: "Hasta 664€/mes",
        urgente: false,
        gratuito: true,
        valoracion: 4.5,
        tipo: "ayuda",
      },
      {
        id: "ayuda-2",
        titulo: "Ayuda Emergencia Social Barcelona",
        descripcion: "Prestaciones puntuales para emergencias",
        categoria: "Emergencia",
        ubicacion: "Barcelona",
        cuantia: "Variable",
        urgente: true,
        gratuito: true,
        valoracion: 4.2,
        tipo: "ayuda",
      },
    ],
    servicios: [
      {
        id: "servicio-1",
        titulo: "Centro Servicios Sociales Gràcia",
        descripcion: "Atención social integral para familias",
        categoria: "Servicios Sociales",
        ubicacion: "Barcelona - Gràcia",
        horario: "L-V 9:00-18:00",
        gratuito: true,
        valoracion: 4.7,
        tipo: "servicio",
      },
      {
        id: "servicio-2",
        titulo: "PIJ Sabadell",
        descripcion: "Punto de Información Juvenil",
        categoria: "Juventud",
        ubicacion: "Sabadell",
        horario: "L-V 10:00-20:00",
        gratuito: true,
        valoracion: 4.3,
        tipo: "servicio",
      },
    ],
    eventos: [
      {
        id: "evento-1",
        titulo: "Taller: Gestión Emocional Familiar",
        descripcion: "Aprende técnicas para gestionar el estrés familiar",
        categoria: "Formación",
        ubicacion: "Barcelona",
        fecha: "2024-01-15",
        hora: "18:00",
        gratuito: true,
        plazas: 25,
        tipo: "evento",
      },
    ],
  }

  const categorias = [
    "Ayuda Económica",
    "Vivienda",
    "Educación",
    "Salud",
    "Servicios Sociales",
    "Juventud",
    "Emergencia",
    "Formación",
    "Empleo",
    "Familia",
  ]

  const ubicaciones = [
    "Barcelona",
    "Girona",
    "Lleida",
    "Tarragona",
    "Sabadell",
    "Terrassa",
    "Badalona",
    "Hospitalet de Llobregat",
    "Mataró",
    "Reus",
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Búsqueda Avanzada</h1>
        <p className="text-muted-foreground">Encuentra exactamente lo que necesitas con nuestros filtros avanzados</p>
      </div>

      {/* Barra de búsqueda principal */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="¿Qué estás buscando? (ej: ayuda alquiler Barcelona, centro salud mental...)"
            className="pl-12 h-12 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="absolute right-2 top-2 h-8">Buscar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panel de filtros */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Categoría</label>
                <Select
                  value={selectedFilters.categoria}
                  onValueChange={(value) => setSelectedFilters({ ...selectedFilters, categoria: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Ubicación</label>
                <Select
                  value={selectedFilters.ubicacion}
                  onValueChange={(value) => setSelectedFilters({ ...selectedFilters, ubicacion: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toda Catalunya" />
                  </SelectTrigger>
                  <SelectContent>
                    {ubicaciones.map((ubi) => (
                      <SelectItem key={ubi} value={ubi}>
                        {ubi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tipo de recurso</label>
                <Select
                  value={selectedFilters.tipo}
                  onValueChange={(value) => setSelectedFilters({ ...selectedFilters, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ayuda">Ayudas</SelectItem>
                    <SelectItem value="servicio">Servicios</SelectItem>
                    <SelectItem value="evento">Eventos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgente"
                    checked={selectedFilters.urgencia}
                    onCheckedChange={(checked) =>
                      setSelectedFilters({ ...selectedFilters, urgencia: checked as boolean })
                    }
                  />
                  <label htmlFor="urgente" className="text-sm">
                    Solo urgentes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gratuito"
                    checked={selectedFilters.gratuito}
                    onCheckedChange={(checked) =>
                      setSelectedFilters({ ...selectedFilters, gratuito: checked as boolean })
                    }
                  />
                  <label htmlFor="gratuito" className="text-sm">
                    Solo gratuitos
                  </label>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-muted-foreground">
              {resultados.ayudas.length + resultados.servicios.length + resultados.eventos.length} resultados
              encontrados
            </p>
            <Select defaultValue="relevancia">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Más relevantes</SelectItem>
                <SelectItem value="fecha">Más recientes</SelectItem>
                <SelectItem value="valoracion">Mejor valorados</SelectItem>
                <SelectItem value="distancia">Más cercanos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="todos" className="space-y-4">
            <TabsList>
              <TabsTrigger value="todos">
                Todos ({resultados.ayudas.length + resultados.servicios.length + resultados.eventos.length})
              </TabsTrigger>
              <TabsTrigger value="ayudas">Ayudas ({resultados.ayudas.length})</TabsTrigger>
              <TabsTrigger value="servicios">Servicios ({resultados.servicios.length})</TabsTrigger>
              <TabsTrigger value="eventos">Eventos ({resultados.eventos.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="space-y-4">
              {/* Ayudas */}
              {resultados.ayudas.map((ayuda) => (
                <Card key={ayuda.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-green-600" />
                          <h3 className="text-lg font-semibold">{ayuda.titulo}</h3>
                          {ayuda.urgente && <Badge className="bg-red-100 text-red-800">Urgente</Badge>}
                          {ayuda.gratuito && <Badge className="bg-green-100 text-green-800">Gratuito</Badge>}
                        </div>
                        <p className="text-muted-foreground mb-2">{ayuda.descripcion}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{ayuda.ubicacion}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{ayuda.valoracion}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600 mb-2">{ayuda.cuantia}</div>
                        <Badge variant="outline">{ayuda.categoria}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild>
                        <Link href={`/recursos/ayuda/${ayuda.id}`}>Ver detalles</Link>
                      </Button>
                      <Button variant="outline">Solicitar</Button>
                      <Button variant="ghost">Guardar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Servicios */}
              {resultados.servicios.map((servicio) => (
                <Card key={servicio.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-semibold">{servicio.titulo}</h3>
                          {servicio.gratuito && <Badge className="bg-green-100 text-green-800">Gratuito</Badge>}
                        </div>
                        <p className="text-muted-foreground mb-2">{servicio.descripcion}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{servicio.ubicacion}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{servicio.valoracion}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-2">{servicio.horario}</div>
                        <Badge variant="outline">{servicio.categoria}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild>
                        <Link href={`/servicios/${servicio.id}`}>Ver detalles</Link>
                      </Button>
                      <Button variant="outline">Contactar</Button>
                      <Button variant="ghost">Guardar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Eventos */}
              {resultados.eventos.map((evento) => (
                <Card key={evento.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-purple-600" />
                          <h3 className="text-lg font-semibold">{evento.titulo}</h3>
                          {evento.gratuito && <Badge className="bg-green-100 text-green-800">Gratuito</Badge>}
                        </div>
                        <p className="text-muted-foreground mb-2">{evento.descripcion}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{evento.ubicacion}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(evento.fecha).toLocaleDateString()} - {evento.hora}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-2">{evento.plazas} plazas</div>
                        <Badge variant="outline">{evento.categoria}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild>
                        <Link href={`/eventos/${evento.id}`}>Ver detalles</Link>
                      </Button>
                      <Button variant="outline">Inscribirse</Button>
                      <Button variant="ghost">Guardar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ayudas" className="space-y-4">
              {resultados.ayudas.map((ayuda) => (
                <Card key={ayuda.id} className="hover:shadow-md transition-shadow">
                  {/* Contenido similar al de arriba */}
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
