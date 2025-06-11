"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Bot, AlertTriangle, CheckCircle } from "lucide-react"

export function ContentModerationCard() {
  const [content, setContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    score: number
    category: string
    recommendation: string
    details: { category: string; score: number }[]
  } | null>(null)

  const analyzeContent = () => {
    if (!content.trim()) return

    setIsAnalyzing(true)

    // Simulate API call to AI moderation service
    setTimeout(() => {
      // This would be the response from an AI moderation API in a real implementation
      const mockResult = {
        score: Math.random(),
        category: Math.random() > 0.7 ? "flagged" : "safe",
        recommendation: Math.random() > 0.7 ? "review" : "approve",
        details: [
          { category: "Hate Speech", score: Math.random() },
          { category: "Violence", score: Math.random() },
          { category: "Self-Harm", score: Math.random() },
          { category: "Sexual Content", score: Math.random() },
          { category: "Harassment", score: Math.random() },
        ],
      }

      setResult(mockResult)
      setIsAnalyzing(false)
    }, 1500)
  }

  const getScoreColor = (score: number) => {
    if (score < 0.3) return "text-green-500"
    if (score < 0.7) return "text-amber-500"
    return "text-red-500"
  }

  const getRecommendationBadge = () => {
    if (!result) return null

    if (result.recommendation === "approve") {
      return <Badge className="bg-green-100 text-green-800">Aprobar</Badge>
    } else {
      return <Badge className="bg-amber-100 text-amber-800">Revisar</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Moderación con IA
        </CardTitle>
        <CardDescription>Analiza contenido para detectar posibles violaciones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Pega aquí el contenido a analizar..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px]"
        />

        {result && (
          <div className="rounded-lg border p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">Resultado del análisis</div>
              {getRecommendationBadge()}
            </div>

            <div className="space-y-2">
              {result.details.map((detail, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{detail.category}</span>
                  <span className={getScoreColor(detail.score)}>{(detail.score * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t text-sm">
              <div className="font-medium mb-1">Recomendación:</div>
              <div className="flex items-start gap-2">
                {result.recommendation === "approve" ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                )}
                <span>
                  {result.recommendation === "approve"
                    ? "El contenido parece seguro y puede ser aprobado."
                    : "El contenido puede contener elementos problemáticos. Se recomienda revisión manual."}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={analyzeContent} disabled={!content.trim() || isAnalyzing} className="w-full">
          {isAnalyzing ? "Analizando..." : "Analizar Contenido"}
        </Button>
      </CardFooter>
    </Card>
  )
}
