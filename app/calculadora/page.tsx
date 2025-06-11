"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, FileText, AlertCircle, CheckCircle, ArrowRight, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function CalculadoraPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Datos personales
    edad: "",
    situacionLaboral: "",
    ingresosMensuales: "",
    municipio: "",
    // Situación familiar
    miembrosFamilia: "1",
    menoresACargo: "0",
    familiaMonoparental: false,
    discapacidad: false,
    gradoDiscapacidad: "",
    dependencia: false,
    gradoDependencia: "",
    // Vivienda
    tipoVivienda: "",
    importeAlquiler: "",
    hipoteca: "",
    // Otros datos
    desempleadoLargaDuracion: false,
    victimaViolenciaGenero: false,
    estudianteBecado: false,
  })

  const [resultados, setResultados] = useState<any>(null)
  const [calculoRealizado, setCalculoRealizado] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica real de cálculo basada en los datos del formulario
    // Por ahora, simulamos resultados
    calcularAyudas()
    setCalculoRealizado(true)
  }

  const calcularAyudas = () => {
    // Simulación de cálculo de ayudas
    const ingresos = Number.parseInt(formData.ingresosMensuales) || 0
    const miembros = Number.parseInt(formData.miembrosFamilia) || 1
    const menores = Number.parseInt(formData.menoresACargo) || 0
    const alquiler = Number.parseInt(formData.importeAlquiler) || 0
    const hipoteca = Number.parseInt(formData.hipoteca) || 0

    const ayudasCalculadas = []

    // Renta Garantizada de Ciudadanía
    if (ingresos < 664 * miembros) {
      const importeRGC = Math.max(0, 664 * miembros - ingresos)
      ayudasCalculadas.push({
        nombre: "Renta Garantizada de Ciudadanía",
        importe: importeRGC.toFixed(2),
        probabilidad: "Alta",
        descripcion:
          "Prestación económica para garantizar un nivel mínimo de ingresos a las familias catalanas con pocos recursos.",
        requisitos: [
          "Residir en Catalunya mínimo 2 años",
          "Ingresos inferiores al umbral establecido",
          "Estar empadronado",
        ],
        enlace: "/recursos/ayuda/rgc",
      })
    }

    // Ayuda al alquiler
    if (
      (formData.tipoVivienda === "alquiler" && alquiler > 0 && ingresos < 1200 * miembros) ||
      formData.familiaMonoparental
    ) {
      const importeAyudaAlquiler = Math.min(alquiler * 0.4, 200)
      ayudasCalculadas.push({
        nombre: "Ayuda al Alquiler",
        importe: importeAyudaAlquiler.toFixed(2),
        probabilidad: "Media",
        descripcion: "Subvención para el pago del alquiler de la vivienda habitual.",
        requisitos: [
          "Contrato de alquiler a nombre del solicitante",
          "Ingresos dentro de los límites establecidos",
          "Vivienda habitual y permanente",
        ],
        enlace: "/recursos/ayuda/alquiler",
      })
    }

    // Ayuda para familias con menores
    if (menores > 0 && ingresos < 1000 * miembros) {
      const importeAyudaMenores = 100 * menores
      ayudasCalculadas.push({
        nombre: "Ayuda para Familias con Menores",
        importe: importeAyudaMenores.toFixed(2),
        probabilidad: "Alta",
        descripcion: "Ayuda económica para familias con hijos menores a cargo.",
        requisitos: ["Tener hijos menores de 18 años", "Ingresos dentro de los límites establecidos"],
        enlace: "/recursos/ayuda/familias-menores",
      })
    }

    // Ayuda por discapacidad
    if (formData.discapacidad) {
      let importeDiscapacidad = 0
      if (formData.gradoDiscapacidad === "33-64") importeDiscapacidad = 150
      else if (formData.gradoDiscapacidad === "65-74") importeDiscapacidad = 250
      else if (formData.gradoDiscapacidad === "75+") importeDiscapacidad = 350

      ayudasCalculadas.push({
        nombre: "Prestación por Discapacidad",
        importe: importeDiscapacidad.toFixed(2),
        probabilidad: "Alta",
        descripcion: "Prestación económica para personas con discapacidad reconocida.",
        requisitos: [
          "Certificado de discapacidad",
          "Grado de discapacidad igual o superior al 33%",
          "Residencia en Catalunya",
        ],
        enlace: "/recursos/ayuda/discapacidad",
      })
    }

    // Beca comedor
    if (menores > 0 && ingresos < 800 * miembros) {
      const importeBecaComedor = 120 * menores
      ayudasCalculadas.push({
        nombre: "Beca Comedor Escolar",
        importe: importeBecaComedor.toFixed(2),
        probabilidad: "Media",
        descripcion: "Ayuda para cubrir el coste del comedor escolar para familias con pocos recursos.",
        requisitos: [
          "Hijos escolarizados en centros públicos o concertados",
          "Ingresos dentro de los límites establecidos",
        ],
        enlace: "/recursos/ayuda/beca-comedor",
      })
    }

    // Ayuda de emergencia social
    if (ingresos < 500 * miembros) {
      ayudasCalculadas.push({
        nombre: "Ayuda de Emergencia Social",
        importe: "Variable según necesidad",
        probabilidad: "Media",
        descripcion: "Prestaciones económicas puntuales para situaciones de emergencia social.",
        requisitos: ["Situación de emergencia social", "Informe de servicios sociales", "Empadronamiento"],
        enlace: "/recursos/ayuda/emergencia-social",
      })
    }

    // Ordenar por probabilidad
    const ordenProbabilidad = { Alta: 3, Media: 2, Baja: 1 }
    ayudasCalculadas.sort(
      (a, b) =>
        ordenProbabilidad[b.probabilidad as keyof typeof ordenProbabilidad] -
        ordenProbabilidad[a.probabilidad as keyof typeof ordenProbabilidad],
    )

    setResultados({
      ayudas: ayudasCalculadas,
      resumen: {
        totalAyudas: ayudasCalculadas.length,
        importeEstimadoMensual: ayudasCalculadas
          .reduce((total, ayuda) => {
            const importe = ayuda.importe !== "Variable según necesidad" ? Number.parseFloat(ayuda.importe) : 0
            return total + importe
          }, 0)
          .toFixed(2),
      },
    })
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-10 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-10 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            3
          </div>
          <div className={`h-1 w-10 ${step >= 4 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            4
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Datos Personales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edad">Edad</Label>
                <Input
                  id="edad"
                  name="edad"
                  type="number"
                  placeholder="Introduce tu edad"
                  value={formData.edad}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="situacionLaboral">Situación Laboral</Label>
                <Select
                  value={formData.situacionLaboral}
                  onValueChange={(value) => handleSelectChange("situacionLaboral", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu situación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="empleado">Empleado/a</SelectItem>
                    <SelectItem value="autonomo">Autónomo/a</SelectItem>
                    <SelectItem value="desempleado">Desempleado/a</SelectItem>
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="jubilado">Jubilado/a</SelectItem>
                    <SelectItem value="hogar">Trabajo del hogar no remunerado</SelectItem>
                    <SelectItem value="otro">Otra situación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ingresosMensuales">Ingresos Mensuales (€)</Label>
                <Input
                  id="ingresosMensuales"
                  name="ingresosMensuales"
                  type="number"
                  placeholder="Introduce tus ingresos mensuales"
                  value={formData.ingresosMensuales}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipio">Municipio de Residencia</Label>
                <Select value={formData.municipio} onValueChange={(value) => handleSelectChange("municipio", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu municipio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                    <SelectItem value="hospitalet">L'Hospitalet de Llobregat</SelectItem>
                    <SelectItem value="badalona">Badalona</SelectItem>
                    <SelectItem value="terrassa">Terrassa</SelectItem>
                    <SelectItem value="sabadell">Sabadell</SelectItem>
                    <SelectItem value="lleida">Lleida</SelectItem>
                    <SelectItem value="tarragona">Tarragona</SelectItem>
                    <SelectItem value="girona">Girona</SelectItem>
                    <SelectItem value="otro">Otro municipio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={nextStep}>Siguiente</Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Situación Familiar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="miembrosFamilia">Número de miembros en la unidad familiar</Label>
                <Select
                  value={formData.miembrosFamilia}
                  onValueChange={(value) => handleSelectChange("miembrosFamilia", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6 o más</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="menoresACargo">Número de menores a cargo</Label>
                <Select
                  value={formData.menoresACargo}
                  onValueChange={(value) => handleSelectChange("menoresACargo", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4 o más</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="familiaMonoparental"
                  name="familiaMonoparental"
                  checked={formData.familiaMonoparental}
                  onCheckedChange={(checked) => setFormData({ ...formData, familiaMonoparental: checked as boolean })}
                />
                <Label htmlFor="familiaMonoparental">Familia monoparental</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discapacidad"
                  name="discapacidad"
                  checked={formData.discapacidad}
                  onCheckedChange={(checked) => setFormData({ ...formData, discapacidad: checked as boolean })}
                />
                <Label htmlFor="discapacidad">Persona con discapacidad en la unidad familiar</Label>
              </div>
            </div>

            {formData.discapacidad && (
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <Label htmlFor="gradoDiscapacidad">Grado de discapacidad</Label>
                <RadioGroup
                  value={formData.gradoDiscapacidad}
                  onValueChange={(value) => handleSelectChange("gradoDiscapacidad", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="33-64" id="r1" />
                    <Label htmlFor="r1">Entre 33% y 64%</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="65-74" id="r2" />
                    <Label htmlFor="r2">Entre 65% y 74%</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="75+" id="r3" />
                    <Label htmlFor="r3">75% o superior</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="dependencia"
                name="dependencia"
                checked={formData.dependencia}
                onCheckedChange={(checked) => setFormData({ ...formData, dependencia: checked as boolean })}
              />
              <Label htmlFor="dependencia">Persona en situación de dependencia en la unidad familiar</Label>
            </div>

            {formData.dependencia && (
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <Label htmlFor="gradoDependencia">Grado de dependencia</Label>
                <RadioGroup
                  value={formData.gradoDependencia}
                  onValueChange={(value) => handleSelectChange("gradoDependencia", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grado1" id="d1" />
                    <Label htmlFor="d1">Grado I - Dependencia moderada</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grado2" id="d2" />
                    <Label htmlFor="d2">Grado II - Dependencia severa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grado3" id="d3" />
                    <Label htmlFor="d3">Grado III - Gran dependencia</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={prevStep}>
                Anterior
              </Button>
              <Button onClick={nextStep}>Siguiente</Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Vivienda</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tipoVivienda">Tipo de vivienda</Label>
                <RadioGroup
                  value={formData.tipoVivienda}
                  onValueChange={(value) => handleSelectChange("tipoVivienda", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="propiedad" id="v1" />
                    <Label htmlFor="v1">Propiedad</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alquiler" id="v2" />
                    <Label htmlFor="v2">Alquiler</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cedida" id="v3" />
                    <Label htmlFor="v3">Cedida o compartida</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="otra" id="v4" />
                    <Label htmlFor="v4">Otra situación</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.tipoVivienda === "alquiler" && (
                <div className="space-y-2">
                  <Label htmlFor="importeAlquiler">Importe mensual del alquiler (€)</Label>
                  <Input
                    id="importeAlquiler"
                    name="importeAlquiler"
                    type="number"
                    placeholder="Introduce el importe"
                    value={formData.importeAlquiler}
                    onChange={handleChange}
                  />
                </div>
              )}

              {formData.tipoVivienda === "propiedad" && (
                <div className="space-y-2">
                  <Label htmlFor="hipoteca">Importe mensual de la hipoteca (€)</Label>
                  <Input
                    id="hipoteca"
                    name="hipoteca"
                    type="number"
                    placeholder="Introduce el importe"
                    value={formData.hipoteca}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={prevStep}>
                Anterior
              </Button>
              <Button onClick={nextStep}>Siguiente</Button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Información Adicional</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="desempleadoLargaDuracion"
                  name="desempleadoLargaDuracion"
                  checked={formData.desempleadoLargaDuracion}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, desempleadoLargaDuracion: checked as boolean })
                  }
                />
                <Label htmlFor="desempleadoLargaDuracion">Desempleado/a de larga duración (más de 12 meses)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="victimaViolenciaGenero"
                  name="victimaViolenciaGenero"
                  checked={formData.victimaViolenciaGenero}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, victimaViolenciaGenero: checked as boolean })
                  }
                />
                <Label htmlFor="victimaViolenciaGenero">Víctima de violencia de género</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="estudianteBecado"
                  name="estudianteBecado"
                  checked={formData.estudianteBecado}
                  onCheckedChange={(checked) => setFormData({ ...formData, estudianteBecado: checked as boolean })}
                />
                <Label htmlFor="estudianteBecado">Estudiante con beca</Label>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg mt-6">
              <p className="text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 inline-block mr-2" />
                La información proporcionada es confidencial y solo se utilizará para calcular las ayudas a las que
                podrías tener derecho. No almacenamos tus datos personales.
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={prevStep}>
                Anterior
              </Button>
              <Button onClick={handleSubmit}>Calcular Ayudas</Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderResultados = () => {
    if (!resultados) return null

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Resumen de Ayudas
            </CardTitle>
            <CardDescription>
              Basado en la información proporcionada, podrías tener derecho a las siguientes ayudas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Número de ayudas</p>
                <p className="text-3xl font-bold">{resultados.resumen.totalAyudas}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Importe estimado mensual</p>
                <p className="text-3xl font-bold text-green-600">{resultados.resumen.importeEstimadoMensual}€</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Importe estimado anual</p>
                <p className="text-3xl font-bold text-green-600">
                  {(Number.parseFloat(resultados.resumen.importeEstimadoMensual) * 12).toFixed(2)}€
                </p>
              </div>
            </div>

            <Tabs defaultValue="todas">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="todas">Todas las ayudas</TabsTrigger>
                <TabsTrigger value="alta">Probabilidad alta</TabsTrigger>
                <TabsTrigger value="media">Probabilidad media</TabsTrigger>
              </TabsList>
              <TabsContent value="todas" className="space-y-4 mt-4">
                {resultados.ayudas.map((ayuda: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold">{ayuda.nombre}</h3>
                            <Badge
                              className={`${
                                ayuda.probabilidad === "Alta"
                                  ? "bg-green-100 text-green-800"
                                  : ayuda.probabilidad === "Media"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              Probabilidad {ayuda.probabilidad}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{ayuda.descripcion}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600 mb-2">
                            {ayuda.importe !== "Variable según necesidad" ? `${ayuda.importe}€/mes` : ayuda.importe}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Requisitos principales:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {ayuda.requisitos.map((requisito: string, i: number) => (
                            <li key={i}>{requisito}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild>
                          <Link href={ayuda.enlace}>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Ver detalles
                          </Link>
                        </Button>
                        <Button variant="outline">Solicitar</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="alta" className="space-y-4 mt-4">
                {resultados.ayudas
                  .filter((ayuda: any) => ayuda.probabilidad === "Alta")
                  .map((ayuda: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-6">{/* Contenido similar al anterior */}</CardContent>
                    </Card>
                  ))}
              </TabsContent>
              <TabsContent value="media" className="space-y-4 mt-4">
                {resultados.ayudas
                  .filter((ayuda: any) => ayuda.probabilidad === "Media")
                  .map((ayuda: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-6">{/* Contenido similar al anterior */}</CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Descargar informe PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Compartir resultados
          </Button>
          <Button onClick={() => setCalculoRealizado(false)}>Volver a calcular</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>¿Necesitas ayuda con los trámites?</CardTitle>
            <CardDescription>
              Podemos ayudarte a solicitar estas ayudas y acompañarte durante todo el proceso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/solicitar-ayuda">Solicitar asistencia</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/recursos">Ver más recursos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Calculadora de Ayudas</h1>
        <p className="text-muted-foreground">
          Descubre a qué ayudas y prestaciones podrías tener derecho en función de tu situación personal y familiar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>¿Cómo funciona?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary h-6 w-6 flex items-center justify-center text-primary-foreground text-sm shrink-0">
                  1
                </div>
                <p className="text-sm">
                  Completa el formulario con tus datos personales, situación familiar y económica.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary h-6 w-6 flex items-center justify-center text-primary-foreground text-sm shrink-0">
                  2
                </div>
                <p className="text-sm">
                  Nuestro sistema calculará automáticamente las ayudas a las que podrías tener derecho.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary h-6 w-6 flex items-center justify-center text-primary-foreground text-sm shrink-0">
                  3
                </div>
                <p className="text-sm">
                  Recibirás un informe detallado con las ayudas disponibles y cómo solicitarlas.
                </p>
              </div>

              <Separator className="my-4" />

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Importante
                </h3>
                <p className="text-sm text-muted-foreground">
                  Esta calculadora proporciona una estimación orientativa. Las ayudas finales pueden variar según
                  criterios específicos de cada convocatoria y tu situación particular.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-medium mb-2 flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  Confidencialidad
                </h3>
                <p className="text-sm text-green-700">
                  Tus datos están seguros. No almacenamos información personal y todos los cálculos se realizan en tu
                  dispositivo.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Ayudas</CardTitle>
              <CardDescription>
                Completa los siguientes pasos para conocer las ayudas disponibles para tu situación
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!calculoRealizado ? (
                <>
                  {renderStepIndicator()}
                  {renderStepContent()}
                </>
              ) : (
                renderResultados()
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
