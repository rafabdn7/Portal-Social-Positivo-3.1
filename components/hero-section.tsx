"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative bg-gradient-to-r from-red-500 via-yellow-400 to-blue-400 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Catalunya Social Positiva</h1>
          <p className="text-xl text-white/90 mb-8">
            Una plataforma para conectar, ayudar y fortalecer nuestra comunidad
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Input type="text" placeholder="Buscar recursos, ayuda o información..." className="pl-10 h-12 w-full" />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            </div>
            <Button className="h-12 px-6 bg-white text-red-500 hover:bg-white/90">Buscar</Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
