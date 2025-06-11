"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, ThumbsDown, Flag, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  title: string
  content: string
  date: string
  helpful: number
  notHelpful: number
  verified: boolean
  response?: {
    author: string
    content: string
    date: string
  }
}

interface ReviewSystemProps {
  resourceId: string
  resourceName: string
  resourceType: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
}

export default function ReviewSystem({
  resourceId,
  resourceName,
  resourceType,
  averageRating,
  totalReviews,
  reviews,
}: ReviewSystemProps) {
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    content: "",
  })
  const [showReviewForm, setShowReviewForm] = useState(false)

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 60 },
    { stars: 4, count: 20, percentage: 27 },
    { stars: 3, count: 8, percentage: 11 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ]

  const handleRatingClick = (rating: number) => {
    setNewReview({ ...newReview, rating })
  }

  const submitReview = () => {
    if (newReview.rating === 0 || !newReview.content.trim()) return

    // En una implementación real, esto se enviaría al servidor
    console.log("Nueva reseña:", newReview)
    setNewReview({ rating: 0, title: "", content: "" })
    setShowReviewForm(false)
  }

  const renderStars = (rating: number, interactive = false, size = "h-4 w-4") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : interactive
                  ? "text-gray-300 hover:text-yellow-400 cursor-pointer"
                  : "text-gray-300"
            } ${interactive ? "transition-colors" : ""}`}
            onClick={interactive ? () => handleRatingClick(star) : undefined}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Resumen de valoraciones */}
      <Card>
        <CardHeader>
          <CardTitle>Valoraciones y Reseñas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Puntuación general */}
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">{renderStars(Math.round(averageRating), false, "h-5 w-5")}</div>
              <p className="text-sm text-muted-foreground">Basado en {totalReviews} reseñas</p>
              <Button
                className="mt-4"
                onClick={() => setShowReviewForm(!showReviewForm)}
                variant={showReviewForm ? "outline" : "default"}
              >
                {showReviewForm ? "Cancelar" : "Escribir reseña"}
              </Button>
            </div>

            {/* Distribución de puntuaciones */}
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{item.stars}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={item.percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario de nueva reseña */}
          {showReviewForm && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/20">
              <h4 className="font-medium mb-4">Escribe tu reseña sobre {resourceName}</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tu puntuación</label>
                  {renderStars(newReview.rating, true, "h-6 w-6")}
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Título (opcional)</label>
                  <input
                    type="text"
                    placeholder="Resumen de tu experiencia"
                    className="w-full p-2 border rounded-md"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tu reseña</label>
                  <Textarea
                    placeholder="Comparte tu experiencia con este recurso..."
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={submitReview} disabled={newReview.rating === 0 || !newReview.content.trim()}>
                    Publicar reseña
                  </Button>
                  <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de reseñas */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Verificado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Flag className="h-4 w-4 mr-2" />
                      Reportar reseña
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {review.title && <h4 className="font-medium mb-2">{review.title}</h4>}
              <p className="text-muted-foreground mb-4">{review.content}</p>

              {/* Respuesta oficial */}
              {review.response && (
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Respuesta oficial
                    </Badge>
                    <span className="text-sm text-muted-foreground">{review.response.date}</span>
                  </div>
                  <p className="text-sm">{review.response.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">- {review.response.author}</p>
                </div>
              )}

              {/* Acciones de la reseña */}
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Útil ({review.helpful})</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4" />
                  <span>No útil ({review.notHelpful})</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
