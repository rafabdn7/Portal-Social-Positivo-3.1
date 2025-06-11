"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accessibility, Type, Eye, Volume2, Keyboard, RotateCcw } from "lucide-react"

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0,
    highContrast: false,
    darkMode: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicator: true,
    colorBlindFriendly: false,
    textToSpeech: false,
    magnifier: false,
    cursorSize: 1,
  })

  useEffect(() => {
    // Aplicar configuraciones de accesibilidad
    const root = document.documentElement

    // Tamaño de fuente
    root.style.setProperty("--accessibility-font-size", `${settings.fontSize}px`)

    // Altura de línea
    root.style.setProperty("--accessibility-line-height", settings.lineHeight.toString())

    // Espaciado de letras
    root.style.setProperty("--accessibility-letter-spacing", `${settings.letterSpacing}px`)

    // Alto contraste
    if (settings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    // Modo oscuro
    if (settings.darkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Movimiento reducido
    if (settings.reducedMotion) {
      root.classList.add("reduced-motion")
    } else {
      root.classList.remove("reduced-motion")
    }

    // Indicador de foco mejorado
    if (settings.focusIndicator) {
      root.classList.add("enhanced-focus")
    } else {
      root.classList.remove("enhanced-focus")
    }

    // Colores amigables para daltonismo
    if (settings.colorBlindFriendly) {
      root.classList.add("colorblind-friendly")
    } else {
      root.classList.remove("colorblind-friendly")
    }

    // Tamaño del cursor
    root.style.setProperty("--cursor-size", settings.cursorSize.toString())
  }, [settings])

  const resetSettings = () => {
    setSettings({
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0,
      highContrast: false,
      darkMode: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      focusIndicator: true,
      colorBlindFriendly: false,
      textToSpeech: false,
      magnifier: false,
      cursorSize: 1,
    })
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button size="lg" className="rounded-full h-14 w-14 shadow-lg" aria-label="Herramientas de accesibilidad">
            <Accessibility className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Accesibilidad</h3>
                <Button variant="ghost" size="sm" onClick={resetSettings} aria-label="Restablecer configuración">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Configuración de texto */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  <span className="font-medium">Texto</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Tamaño de fuente: {settings.fontSize}px</label>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={(value) => updateSetting("fontSize", value[0])}
                      min={12}
                      max={24}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Altura de línea: {settings.lineHeight}</label>
                    <Slider
                      value={[settings.lineHeight]}
                      onValueChange={(value) => updateSetting("lineHeight", value[0])}
                      min={1}
                      max={2.5}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Espaciado de letras: {settings.letterSpacing}px</label>
                    <Slider
                      value={[settings.letterSpacing]}
                      onValueChange={(value) => updateSetting("letterSpacing", value[0])}
                      min={0}
                      max={3}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Configuración visual */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">Visual</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Alto contraste</label>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Modo oscuro</label>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Reducir movimiento</label>
                    <Switch
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Colores para daltonismo</label>
                    <Switch
                      checked={settings.colorBlindFriendly}
                      onCheckedChange={(checked) => updateSetting("colorBlindFriendly", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Configuración de navegación */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Keyboard className="h-4 w-4" />
                  <span className="font-medium">Navegación</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Navegación por teclado</label>
                    <Switch
                      checked={settings.keyboardNavigation}
                      onCheckedChange={(checked) => updateSetting("keyboardNavigation", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Indicador de foco mejorado</label>
                    <Switch
                      checked={settings.focusIndicator}
                      onCheckedChange={(checked) => updateSetting("focusIndicator", checked)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tamaño del cursor: {settings.cursorSize}x</label>
                    <Slider
                      value={[settings.cursorSize]}
                      onValueChange={(value) => updateSetting("cursorSize", value[0])}
                      min={1}
                      max={3}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Configuración de audio */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <span className="font-medium">Audio</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Lector de pantalla</label>
                    <Switch
                      checked={settings.screenReader}
                      onCheckedChange={(checked) => updateSetting("screenReader", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Texto a voz</label>
                    <Switch
                      checked={settings.textToSpeech}
                      onCheckedChange={(checked) => updateSetting("textToSpeech", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  Cerrar
                </Button>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  )
}
