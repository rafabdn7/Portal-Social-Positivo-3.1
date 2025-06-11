import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Download, ExternalLink, Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function RecursosPage() {
  const recursos = {
    ayudas: [
      {
        id: "ayuda-1",
        titulo: "Renta Garantizada de Ciudadanía (RGC)",
        descripcion: "Prestación económica para garantizar un nivel mínimo de ingresos a las familias catalanas",
        organismo: "Generalitat de Catalunya",
        cuantia: "Hasta 664€/mes por unidad familiar",
        requisitos: [
          "Residir en Catalunya mínimo 2 años",
          "Ingresos inferiores al umbral establecido",
          "Estar empadronado",
        ],
        enlace: "https://web.gencat.cat/ca/tramits/tramits-temes/Renda-garantida-de-ciutadania",
        telefono: "012",
        categoria: "economica",
        urgente: false,
      },
      {
        id: "ayuda-2",
        titulo: "Ayuda de Emergencia Social",
        descripcion: "Prestaciones económicas puntuales para situaciones de emergencia social",
        organismo: "Ayuntamientos de Catalunya",
        cuantia: "Variable según necesidad",
        requisitos: ["Situación de emergencia social", "Informe de servicios sociales", "Empadronamiento"],
        enlace: "https://ajuntament.barcelona.cat/benestarfamiliar/ca",
        telefono: "010",
        categoria: "emergencia",
        urgente: true,
      },
      {
        id: "ayuda-3",
        titulo: "Beca Comedor Escolar",
        descripcion: "Ayudas para el comedor escolar de centros públicos y concertados",
        organismo: "Departament d'Educació",
        cuantia: "100% del coste del comedor",
        requisitos: ["Renta familiar per cápita inferior a 6.000€", "Escolarización en centro público o concertado"],
        enlace: "https://educacio.gencat.cat/ca/tramits/ajuts-beques-subvencions/",
        telefono: "935 51 78 00",
        categoria: "educacion",
        urgente: false,
      },
      {
        id: "ayuda-4",
        titulo: "Ayuda al Alquiler Joven",
        descripcion: "Subvención para jóvenes de 18 a 35 años para el pago del alquiler",
        organismo: "Agència de l'Habitatge de Catalunya",
        cuantia: "Hasta 200€/mes durante 3 años",
        requisitos: ["Edad entre 18 y 35 años", "Ingresos entre 0,5 y 2,5 veces el IRSC", "Contrato de alquiler"],
        enlace: "https://www.habitatge.gencat.cat/ca/",
        telefono: "935 51 50 00",
        categoria: "vivienda",
        urgente: false,
      },
    ],
    servicios: [
      {
        id: "servicio-1",
        titulo: "Centros de Servicios Sociales",
        descripcion: "Atención social integral para familias y personas en situación de vulnerabilidad",
        horario: "Lunes a Viernes: 9:00 - 14:00 y 16:00 - 18:00",
        ubicaciones: ["Barcelona", "Girona", "Lleida", "Tarragona"],
        servicios: ["Información y orientación", "Tramitación de ayudas", "Apoyo psicológico", "Mediación familiar"],
        gratuito: true,
        categoria: "social",
      },
      {
        id: "servicio-2",
        titulo: "Puntos de Información Juvenil (PIJ)",
        descripcion: "Información y asesoramiento para jóvenes en temas de formación, trabajo, vivienda y ocio",
        horario: "Lunes a Viernes: 10:00 - 14:00 y 16:00 - 20:00",
        ubicaciones: ["Más de 200 puntos en Catalunya"],
        servicios: ["Orientación laboral", "Información formativa", "Asesoramiento en vivienda", "Actividades de ocio"],
        gratuito: true,
        categoria: "juventud",
      },
      {
        id: "servicio-3",
        titulo: "Centros de Atención Primaria (CAP)",
        descripcion: "Atención sanitaria de proximidad y programas de salud comunitaria",
        horario: "Lunes a Viernes: 8:00 - 20:00",
        ubicaciones: ["Toda Catalunya"],
        servicios: ["Medicina familiar", "Pediatría", "Enfermería", "Trabajo social sanitario"],
        gratuito: true,
        categoria: "salud",
      },
    ],
    documentos: [
      {
        id: "doc-1",
        titulo: "Guía de Ayudas Sociales 2024",
        descripcion: "Compendio completo de todas las ayudas disponibles en Catalunya",
        tipo: "PDF",
        tamaño: "2.5 MB",
        idiomas: ["Catalán", "Castellano"],
        categoria: "guias",
      },
      {
        id: "doc-2",
        titulo: "Formulario Solicitud RGC",
        descripcion: "Formulario oficial para solicitar la Renta Garantizada de Ciudadanía",
        tipo: "PDF",
        tamaño: "1.2 MB",
        idiomas: ["Catalán", "Castellano", "Árabe"],
        categoria: "formularios",
      },
      {
        id: "doc-3",
        titulo: "Manual de Derechos de las Familias",
        descripcion: "Información sobre derechos y recursos para familias en Catalunya",
        tipo: "PDF",
        tamaño: "3.1 MB",
        idiomas: ["Catalán", "Castellano"],
        categoria: "manuales",
      },
    ],
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Recursos y Ayudas</h1>
        <p className="text-muted-foreground text-lg">
          Encuentra todas las ayudas, servicios y recursos disponibles para familias en Catalunya
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar recursos, ayudas o servicios..." className="pl-10" />
        </div>
      </div>

      <Tabs defaultValue="ayudas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ayudas">Ayudas Económicas</TabsTrigger>
          <TabsTrigger value="servicios">Servicios</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="ayudas" className="space-y-6">
          <div className="grid gap-6">
            {recursos.ayudas.map((ayuda) => (
              <Card key={ayuda.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{ayuda.titulo}</CardTitle>
                      <CardDescription>{ayuda.descripcion}</CardDescription>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{ayuda.organismo}</Badge>
                        {ayuda.urgente && <Badge className="bg-red-100 text-red-800">Urgente</Badge>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{ayuda.cuantia}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Requisitos principales:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {ayuda.requisitos.map((requisito, index) => (
                        <li key={index}>{requisito}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href={ayuda.enlace} target="_blank" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Solicitar Online
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {ayuda.telefono}
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/recursos/ayuda/${ayuda.id}`}>Ver Detalles</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="servicios" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {recursos.servicios.map((servicio) => (
              <Card key={servicio.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{servicio.titulo}</CardTitle>
                      <CardDescription>{servicio.descripcion}</CardDescription>
                    </div>
                    {servicio.gratuito && <Badge className="bg-green-100 text-green-800">Gratuito</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{servicio.horario}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{servicio.ubicaciones.join(", ")}</span>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-sm">Servicios disponibles:</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                      {servicio.servicios.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Encontrar Centro
                    </Button>
                    <Button size="sm" variant="outline">
                      Más Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documentos" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recursos.documentos.map((documento) => (
              <Card key={documento.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{documento.titulo}</CardTitle>
                  <CardDescription className="text-sm">{documento.descripcion}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tipo:</span>
                    <Badge variant="outline">{documento.tipo}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tamaño:</span>
                    <span>{documento.tamaño}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Idiomas:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {documento.idiomas.map((idioma, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {idioma}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" className="w-full flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
