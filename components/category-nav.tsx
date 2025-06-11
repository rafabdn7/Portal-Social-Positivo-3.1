"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "Todos", icon: "🏠" },
  { id: "comunidad", name: "Comunidad y Convivencia", icon: "🏘️" },
  { id: "discapacidad", name: "Discapacidad y Dependencia", icon: "🧩" },
  { id: "monoparentales", name: "Familias Monoparentales", icon: "👩‍👦" },
  { id: "crianza", name: "Crianza y Primera Infancia", icon: "👶" },
  { id: "educacion", name: "Educación y Apoyo Escolar", icon: "📚" },
  { id: "salud-mental", name: "Salud Mental Familiar", icon: "🧠" },
  { id: "vivienda", name: "Vivienda y Alquiler Social", icon: "🏠" },
  { id: "ayudas", name: "Ayudas Económicas", icon: "🧾" },
]

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.id === "all" ? "/" : `/categoria/${category.id}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveCategory(category.id)
              }}
            >
              <div
                className={cn(
                  "relative whitespace-nowrap px-4 py-2 rounded-full border transition-colors",
                  activeCategory === category.id
                    ? "border-red-500 text-red-500"
                    : "border-gray-200 hover:border-red-200",
                )}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-red-50 rounded-full"
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
