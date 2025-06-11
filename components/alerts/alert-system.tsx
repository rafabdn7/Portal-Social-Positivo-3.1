"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, Calendar, Clock, AlertTriangle, Info, CheckCircle, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AlertaProps {
  id: string
  tipo: "recordatorio" | "urgente" | "informativa" | "vencimiento"
  titulo: string
  mensaje: string
  fecha: string
  leida: boolean
  accionable: boolean
  enlace?: string
}

export default function AlertSystem() {
  const [alertas, setAlertas] = useState<AlertaProps[]>([
    {
      id: "alert-1",
      tipo: "vencimiento",
      titulo: "Documentación pendiente",
      mensaje: "Tu solicitud de RGC requiere documentación adicional. Plazo hasta el 31 de enero.",
      fecha: "2024-01-20T10:00:00",
      leida: false,
      accionable: true,
      enlace: "/mis-solicitudes/sol-001",
    },
    {
      id: "alert-2",
      tipo: "recordatorio",
      titulo: "Evento próximo",
      mensaje: "Taller de gestión emocional familiar mañana a las 18:00 en Barcelona.",
      fecha: "2024-01-19T09:00:00",
      leida: false,
      accionable: true,
      enlace: "/eventos/evento-1",
    },
    {
      id: "alert-3",
      tipo: "informativa",
      titulo: "Nueva ayuda disponible",
      mensaje: "Se ha publicado una nueva ayuda para familias monoparentales en Barcelona.",
      fecha: "2024-01-18T14:30:00",
      leida: true,
      accionable: true,
      enlace: "/recursos/ayuda-nueva",
    },
    {
      id: "alert-4",
      tipo: "urgente",
      titulo: "Cambio en requisitos RGC",
      mensaje: "Importante: Han cambiado los requisitos para la Renta Garantizada de Ciudadanía.",
      fecha: "2024-01-17T16:45:00",
      leida: false,
      accionable: true,
      enlace: "/recursos/rgc-cambios",
    },
  ])

  const [configuracion, setConfiguracion] = useState({
    recordatorios: true,
    urgentes: true,
    informativas: true,
    vencimientos: true,
    email: true,
    push: false,
  })

  const marcarComoLeida = (id: string) => {
    setAlertas(alertas.map((alerta) => (alerta.id === id ? { ...alerta, leida: true } : alerta)))
  }

  const eliminarAlerta = (id: string) => {
    setAlertas(alertas.filter((alerta) => alerta.id !== id))
  }

  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case "urgente":
        return <AlertTriangle className="h-4 w-4" />
      case "vencimiento":
        return <Clock className="h-4 w-4" />
      case "recordatorio":
        return <Calendar className="h-4 w-4" />
      case "informativa":
        return <Info className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getAlertVariant = (tipo: string) => {
    switch (tipo) {
      case "urgente":
        return "destructive"
      case "vencimiento":
        return "default"
      case "recordatorio":
        return "default"
      case "informativa":
        return "default"
      default:
        return "default"
    }
  }

  const alertasNoLeidas = alertas.filter((a) => !a.leida)

  return (
    <div className="space-y-6">
      {/* Resumen de alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Centro de Alertas
          </CardTitle>
          <CardDescription>
            {alertasNoLeidas.length} alertas sin leer de {alertas.length} totales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {alertas.filter((a) => a.tipo === "urgente" && !a.leida).length}
              </div>
              <div className="text-sm text-muted-foreground">Urgentes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {alertas.filter((a) => a.tipo === "vencimiento" && !a.leida).length}
              </div>
              <div className="text-sm text-muted-foreground">Vencimientos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {alertas.filter((a) => a.tipo === "recordatorio" && !a.leida).length}
              </div>
              <div className="text-sm text-muted-foreground">Recordatorios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {alertas.filter((a) => a.tipo === "informativa" && !a.leida).length}
              </div>
              <div className="text-sm text-muted-foreground">Informativas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de alertas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Alertas Recientes</h3>
        {alertas.map((alerta) => (
          <Alert
            key={alerta.id}
            variant={getAlertVariant(alerta.tipo)}
            className={`${alerta.leida ? "opacity-60" : ""} relative`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="flex items-start gap-3 flex-1">
                {getAlertIcon(alerta.tipo)}
                <div className="flex-1">
                  <AlertTitle className="flex items-center gap-2">
                    {alerta.titulo}
                    {!alerta.leida && (
                      <Badge variant="secondary" className="text-xs">
                        Nueva
                      </Badge>
                    )}
                  </AlertTitle>
                  <AlertDescription className="mt-1">{alerta.mensaje}</AlertDescription>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-muted-foreground">{new Date(alerta.fecha).toLocaleString()}</span>
                    <div className="flex gap-2">
                      {alerta.accionable && alerta.enlace && (
                        <Button size="sm" variant="outline">
                          Ver detalles
                        </Button>
                      )}
                      {!alerta.leida && (
                        <Button size="sm" variant="ghost" onClick={() => marcarComoLeida(alerta.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Marcar leída
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => eliminarAlerta(alerta.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Alert>
        ))}
      </div>

      {/* Configuración de alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Alertas</CardTitle>
          <CardDescription>Personaliza qué tipos de alertas quieres recibir</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-medium">Tipos de alertas</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Recordatorios</label>
                  <Switch
                    checked={configuracion.recordatorios}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, recordatorios: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Alertas urgentes</label>
                  <Switch
                    checked={configuracion.urgentes}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, urgentes: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Información general</label>
                  <Switch
                    checked={configuracion.informativas}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, informativas: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Vencimientos</label>
                  <Switch
                    checked={configuracion.vencimientos}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, vencimientos: checked })}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Canales de notificación</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Email</label>
                  <Switch
                    checked={configuracion.email}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, email: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Notificaciones push</label>
                  <Switch
                    checked={configuracion.push}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, push: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button className="w-full">Guardar configuración</Button>
        </CardContent>
      </Card>
    </div>
  )
}
