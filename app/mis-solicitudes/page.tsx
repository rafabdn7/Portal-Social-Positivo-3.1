import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  Calendar,
  Phone,
  Download,
  MessageSquare,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function MisSolicitudesPage() {
  const solicitudes = [
    {
      id: "sol-001",
      tipo: "Renta Garantizada de Ciudadanía",
      fechaSolicitud: "2024-01-10",
      estado: "en_revision",
      progreso: 60,
      siguientePaso: "Revisión de documentación",
      fechaEstimada: "2024-01-25",
      documentosRequeridos: ["DNI", "Certificado empadronamiento", "Declaración renta"],
      documentosSubidos: ["DNI", "Certificado empadronamiento"],
      observaciones: "Falta subir la declaración de la renta del año anterior",
      contacto: {
        nombre: "María González",
        telefono: "93 123 45 67",
        email: "maria.gonzalez@gencat.cat",
      },
    },
    {
      id: "sol-002",
      tipo: "Ayuda Emergencia Social",
      fechaSolicitud: "2024-01-05",
      estado: "aprobada",
      progreso: 100,
      siguientePaso: "Cobro realizado",
      fechaEstimada: "2024-01-15",
      importe: "450€",
      fechaCobro: "2024-01-14",
      observaciones: "Ayuda aprobada y transferida correctamente",
    },
    {
      id: "sol-003",
      tipo: "Beca Comedor Escolar",
      fechaSolicitud: "2023-12-20",
      estado: "pendiente_documentacion",
      progreso: 30,
      siguientePaso: "Subir documentación pendiente",
      fechaEstimada: "2024-02-01",
      documentosRequeridos: ["Certificado renta familiar", "Matrícula escolar", "Justificante gastos"],
      documentosSubidos: ["Matrícula escolar"],
      observaciones: "Faltan 2 documentos por subir. Plazo hasta el 31 de enero.",
    },
    {
      id: "sol-004",
      tipo: "Ayuda al Alquiler Joven",
      fechaSolicitud: "2023-11-15",
      estado: "denegada",
      progreso: 100,
      motivoDenegacion: "Ingresos superiores al límite establecido",
      fechaResolucion: "2023-12-10",
      observaciones: "Puede volver a solicitar si cambia su situación económica",
    },
  ]

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente_documentacion":
        return <Badge className="bg-amber-100 text-amber-800">Pendiente Documentación</Badge>
      case "en_revision":
        return <Badge className="bg-blue-100 text-blue-800">En Revisión</Badge>
      case "aprobada":
        return <Badge className="bg-green-100 text-green-800">Aprobada</Badge>
      case "denegada":
        return <Badge className="bg-red-100 text-red-800">Denegada</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "pendiente_documentacion":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "en_revision":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "aprobada":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "denegada":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const solicitudesActivas = solicitudes.filter((s) => s.estado !== "aprobada" && s.estado !== "denegada")
  const solicitudesFinalizadas = solicitudes.filter((s) => s.estado === "aprobada" || s.estado === "denegada")

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Mis Solicitudes</h1>
        <p className="text-muted-foreground">Sigue el estado de todas tus solicitudes de ayudas y servicios</p>
      </div>

      <Tabs defaultValue="activas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activas">Activas ({solicitudesActivas.length})</TabsTrigger>
          <TabsTrigger value="finalizadas">Finalizadas ({solicitudesFinalizadas.length})</TabsTrigger>
          <TabsTrigger value="todas">Todas ({solicitudes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="activas" className="space-y-6">
          {solicitudesActivas.map((solicitud) => (
            <Card key={solicitud.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{solicitud.tipo}</CardTitle>
                    <CardDescription>
                      Solicitud #{solicitud.id} • {new Date(solicitud.fechaSolicitud).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getEstadoIcon(solicitud.estado)}
                    {getEstadoBadge(solicitud.estado)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progreso */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progreso de la solicitud</span>
                    <span>{solicitud.progreso}%</span>
                  </div>
                  <Progress value={solicitud.progreso} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Siguiente paso:</strong> {solicitud.siguientePaso}
                  </p>
                </div>

                {/* Información clave */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Fecha estimada: {new Date(solicitud.fechaEstimada).toLocaleDateString()}</span>
                  </div>
                  {solicitud.contacto && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>Contacto: {solicitud.contacto.nombre}</span>
                    </div>
                  )}
                </div>

                {/* Documentación */}
                {solicitud.documentosRequeridos && (
                  <div>
                    <h4 className="font-medium mb-3">Estado de la documentación</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {solicitud.documentosRequeridos.map((doc) => {
                        const subido = solicitud.documentosSubidos?.includes(doc)
                        return (
                          <div key={doc} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">{doc}</span>
                            </div>
                            {subido ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Button size="sm" variant="outline">
                                Subir
                              </Button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Observaciones */}
                {solicitud.observaciones && (
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Observaciones</h4>
                    <p className="text-sm text-muted-foreground">{solicitud.observaciones}</p>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex flex-wrap gap-2">
                  <Button asChild>
                    <Link href={`/solicitudes/${solicitud.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalles
                    </Link>
                  </Button>
                  {solicitud.estado === "pendiente_documentacion" && (
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Subir documentos
                    </Button>
                  )}
                  {solicitud.contacto && (
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contactar
                    </Button>
                  )}
                  <Button variant="ghost">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="finalizadas" className="space-y-6">
          {solicitudesFinalizadas.map((solicitud) => (
            <Card key={solicitud.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{solicitud.tipo}</CardTitle>
                    <CardDescription>
                      Solicitud #{solicitud.id} • {new Date(solicitud.fechaSolicitud).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getEstadoIcon(solicitud.estado)}
                    {getEstadoBadge(solicitud.estado)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {solicitud.estado === "aprobada" && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">¡Solicitud Aprobada!</h4>
                    {solicitud.importe && (
                      <p className="text-sm text-green-700">
                        Importe: <strong>{solicitud.importe}</strong>
                      </p>
                    )}
                    {solicitud.fechaCobro && (
                      <p className="text-sm text-green-700">
                        Fecha de cobro: {new Date(solicitud.fechaCobro).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}

                {solicitud.estado === "denegada" && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-800 mb-2">Solicitud Denegada</h4>
                    <p className="text-sm text-red-700">
                      <strong>Motivo:</strong> {solicitud.motivoDenegacion}
                    </p>
                    {solicitud.fechaResolucion && (
                      <p className="text-sm text-red-700">
                        Fecha de resolución: {new Date(solicitud.fechaResolucion).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}

                {solicitud.observaciones && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">{solicitud.observaciones}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/solicitudes/${solicitud.id}`}>Ver detalles</Link>
                  </Button>
                  <Button variant="ghost">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar resolución
                  </Button>
                  {solicitud.estado === "denegada" && <Button variant="outline">Solicitar de nuevo</Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="todas" className="space-y-6">
          {solicitudes.map((solicitud) => (
            <Card key={solicitud.id} className="overflow-hidden">
              {/* Contenido similar combinando ambos estados */}
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </main>
  )
}
