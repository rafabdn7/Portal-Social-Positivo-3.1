"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Users, Home, GraduationCap, Heart } from "lucide-react"

export default function SolicitarAyudaPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    tipoAyuda: "",
    datosPersonales: {
      nombre: "",
      apellidos: "",
      dni: "",
      fechaNacimiento: "",
      telefono: "",
      email: "",
      direccion: "",
      codigoPostal: "",
      municipio: "",
    },
    situacionFamiliar: {
      estadoCivil: "",
      numeroHijos: "",
      edadesHijos: "",
      personasACargo: "",
      tipoFamilia: "",
    },
    situacionEconomica: {
      ingresosMensuales: "",
      gastosVivienda: "",
      otrosGastos: "",
      situacionLaboral: "",
      prestacionesActuales: [],
    },
    documentacion: {
      dni: false,
      certificadoEmpadronamiento: false,
      declaracionRenta: false,
      nominasRecibos: false,
      libroFamilia: false,
    },
    motivoSolicitud: "",
    aceptaCondiciones: false,
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const tiposAyuda = [
    {
      id: "renta-garantizada",
      titulo: "Renta Garantizada de Ciudadanía",
      descripcion: "Prestación económica para garantizar ingresos mínimos",
      icon: <Users className="h-6 w-6" />,
      cuantia: "Hasta 664€/mes",
    },
    {
      id: "emergencia-social",
      titulo: "Ayuda de Emergencia Social",
      descripcion: "Prestación puntual para situaciones de emergencia",
      icon: <AlertCircle className="h-6 w-6" />,
      cuantia: "Variable",
    },
    {
      id: "ayuda-vivienda",
      titulo: "Ayuda al Alquiler",
      descripcion: "Subvención para el pago del alquiler de vivienda",
      icon: <Home className="h-6 w-6" />,
      cuantia: "Hasta 200€/mes",
    },
    {
      id: "beca-comedor",
      titulo: "Beca Comedor Escolar",
      descripcion: "Ayuda para el comedor escolar de centros educativos",
      icon: <GraduationCap className="h-6 w-6" />,
      cuantia: "100% del coste",
    },
    {
      id: "apoyo-familiar",
      titulo: "Apoyo a Familias Vulnerables",
      descripcion: "Ayudas específicas para familias en situación de vulnerabilidad",
      icon: <Heart className="h-6 w-6" />,
      cuantia: "Variable",
    },
  ]

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Aquí se enviaría el formulario
    alert("Solicitud enviada correctamente. Recibirás una confirmación por email.")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Selecciona el tipo de ayuda que necesitas</h3>
              <div className="grid gap-4">
                {tiposAyuda.map((ayuda) => (
                  <Card
                    key={ayuda.id}
                    className={`cursor-pointer transition-all ${
                      formData.tipoAyuda === ayuda.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setFormData({ ...formData, tipoAyuda: ayuda.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-primary">{ayuda.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{ayuda.titulo}</h4>
                            <Badge variant="outline">{ayuda.cuantia}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{ayuda.descripcion}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Datos Personales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.datosPersonales.nombre}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      datosPersonales: { ...formData.datosPersonales, nombre: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos *</Label>
                <Input
                  id="apellidos"
                  value={formData.datosPersonales.apellidos}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      datosPersonales: { ...formData.datosPersonales, apellidos: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dni">DNI/NIE *</Label>
                <Input
                  id="dni"
                  value={formData.datosPersonales.dni}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      datosPersonales: { ...formData.datosPersonales, dni: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={formData.datosPersonales.fechaNacimiento}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      datosPersonales: { ...formData.datosPersonales, fechaNacimiento: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  value={formData.datosPersonales.telefono}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      datosPersonales: { ...formData.datosPersonales, telefono: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.datosPersonales.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      datosPersonales: { ...formData.datosPersonales, email: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  value={formData.datosPersonales.direccion}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      datosPersonales: { ...formData.datosPersonales, direccion: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigoPostal">Código Postal *</Label>
                <Input
                  id="codigoPostal"
                  value={formData.datosPersonales.codigoPostal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      datosPersonales: { ...formData.datosPersonales, codigoPostal: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipio">Municipio *</Label>
                <Input
                  id="municipio"
                  value={formData.datosPersonales.municipio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      datosPersonales: { ...formData.datosPersonales, municipio: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Situación Familiar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estado Civil *</Label>
                <Select
                  value={formData.situacionFamiliar.estadoCivil}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      situacionFamiliar: { ...formData.situacionFamiliar, estadoCivil: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu estado civil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soltero">Soltero/a</SelectItem>
                    <SelectItem value="casado">Casado/a</SelectItem>
                    <SelectItem value="pareja-hecho">Pareja de hecho</SelectItem>
                    <SelectItem value="separado">Separado/a</SelectItem>
                    <SelectItem value="divorciado">Divorciado/a</SelectItem>
                    <SelectItem value="viudo">Viudo/a</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Familia</Label>
                <RadioGroup
                  value={formData.situacionFamiliar.tipoFamilia}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      situacionFamiliar: { ...formData.situacionFamiliar, tipoFamilia: value },
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monoparental" id="monoparental" />
                    <Label htmlFor="monoparental">Familia monoparental</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="biparental" id="biparental" />
                    <Label htmlFor="biparental">Familia biparental</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="numerosa" id="numerosa" />
                    <Label htmlFor="numerosa">Familia numerosa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unipersonal" id="unipersonal" />
                    <Label htmlFor="unipersonal">Unidad unipersonal</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroHijos">Número de hijos</Label>
                <Input
                  id="numeroHijos"
                  type="number"
                  min="0"
                  value={formData.situacionFamiliar.numeroHijos}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      situacionFamiliar: { ...formData.situacionFamiliar, numeroHijos: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="personasACargo">Personas a cargo</Label>
                <Input
                  id="personasACargo"
                  type="number"
                  min="0"
                  value={formData.situacionFamiliar.personasACargo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      situacionFamiliar: { ...formData.situacionFamiliar, personasACargo: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edadesHijos">Edades de los hijos (separadas por comas)</Label>
                <Input
                  id="edadesHijos"
                  placeholder="Ej: 5, 8, 12"
                  value={formData.situacionFamiliar.edadesHijos}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      situacionFamiliar: { ...formData.situacionFamiliar, edadesHijos: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Situación Económica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ingresosMensuales">Ingresos mensuales totales (€) *</Label>
                <Input
                  id="ingresosMensuales"
                  type="number"
                  min="0"
                  value={formData.situacionEconomica.ingresosMensuales}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      situacionEconomica: { ...formData.situacionEconomica, ingresosMensuales: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gastosVivienda">Gastos de vivienda mensuales (€) *</Label>
                <Input
                  id="gastosVivienda"
                  type="number"
                  min="0"
                  value={formData.situacionEconomica.gastosVivienda}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      situacionEconomica: { ...formData.situacionEconomica, gastosVivienda: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Situación Laboral *</Label>
                <Select
                  value={formData.situacionEconomica.situacionLaboral}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      situacionEconomica: { ...formData.situacionEconomica, situacionLaboral: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu situación laboral" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="empleado">Empleado/a</SelectItem>
                    <SelectItem value="autonomo">Autónomo/a</SelectItem>
                    <SelectItem value="desempleado">Desempleado/a</SelectItem>
                    <SelectItem value="jubilado">Jubilado/a</SelectItem>
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="incapacidad">Incapacidad temporal/permanente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="otrosGastos">Otros gastos mensuales (€)</Label>
                <Input
                  id="otrosGastos"
                  type="number"
                  min="0"
                  value={formData.situacionEconomica.otrosGastos}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      situacionEconomica: { ...formData.situacionEconomica, otrosGastos: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Prestaciones que recibes actualmente</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Prestación por desempleo",
                  "Pensión de jubilación",
                  "Pensión de viudedad",
                  "Prestación por incapacidad",
                  "Ayuda familiar",
                  "Ninguna",
                ].map((prestacion) => (
                  <div key={prestacion} className="flex items-center space-x-2">
                    <Checkbox
                      id={prestacion}
                      checked={formData.situacionEconomica.prestacionesActuales.includes(prestacion)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            situacionEconomica: {
                              ...formData.situacionEconomica,
                              prestacionesActuales: [...formData.situacionEconomica.prestacionesActuales, prestacion],
                            },
                          })
                        } else {
                          setFormData({
                            ...formData,
                            situacionEconomica: {
                              ...formData.situacionEconomica,
                              prestacionesActuales: formData.situacionEconomica.prestacionesActuales.filter(
                                (p) => p !== prestacion,
                              ),
                            },
                          })
                        }
                      }}
                    />
                    <Label htmlFor={prestacion} className="text-sm">
                      {prestacion}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Documentación y Finalización</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Documentación requerida</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Marca los documentos que puedes aportar (se solicitarán posteriormente)
                </p>
                <div className="space-y-2">
                  {[
                    { key: "dni", label: "Copia del DNI/NIE" },
                    { key: "certificadoEmpadronamiento", label: "Certificado de empadronamiento" },
                    { key: "declaracionRenta", label: "Declaración de la renta o certificado de no declarar" },
                    { key: "nominasRecibos", label: "Nóminas o recibos de prestaciones" },
                    { key: "libroFamilia", label: "Libro de familia" },
                  ].map((doc) => (
                    <div key={doc.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={doc.key}
                        checked={formData.documentacion[doc.key as keyof typeof formData.documentacion]}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            documentacion: { ...formData.documentacion, [doc.key]: checked },
                          })
                        }
                      />
                      <Label htmlFor={doc.key}>{doc.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivoSolicitud">Motivo de la solicitud *</Label>
                <Textarea
                  id="motivoSolicitud"
                  placeholder="Explica brevemente tu situación y por qué necesitas esta ayuda..."
                  value={formData.motivoSolicitud}
                  onChange={(e) => setFormData({ ...formData, motivoSolicitud: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aceptaCondiciones"
                  checked={formData.aceptaCondiciones}
                  onCheckedChange={(checked) => setFormData({ ...formData, aceptaCondiciones: !!checked })}
                />
                <Label htmlFor="aceptaCondiciones" className="text-sm">
                  Acepto las condiciones de uso y la política de privacidad *
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Solicitar Ayuda</h1>
        <p className="text-muted-foreground">
          Completa este formulario para solicitar ayudas sociales. Te guiaremos paso a paso.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Paso {currentStep} de {totalSteps}
            </CardTitle>
            <Badge variant="outline">{Math.round(progress)}% completado</Badge>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Anterior
        </Button>
        <div className="flex gap-2">
          {currentStep < totalSteps ? (
            <Button onClick={nextStep} disabled={currentStep === 1 && !formData.tipoAyuda}>
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.aceptaCondiciones || !formData.motivoSolicitud}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Enviar Solicitud
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
