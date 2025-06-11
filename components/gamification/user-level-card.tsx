"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award, Gift, ChevronUp, Users, Heart, MessageSquare, Share2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UserLevelCardProps {
  user: {
    id: string
    name: string
    avatar?: string
    level: number
    points: number
    pointsToNextLevel: number
    totalPoints: number
    badges: Array<{
      id: string
      name: string
      icon: "trophy" | "star" | "award" | "gift"
    }>
    stats: {
      postsCreated: number
      commentsWritten: number
      likesGiven: number
      sharesCount: number
      followersCount: number
    }
  }
}

export default function UserLevelCard({ user }: UserLevelCardProps) {
  const [showAllBadges, setShowAllBadges] = useState(false)

  const progressToNextLevel = Math.round((user.points / user.pointsToNextLevel) * 100)

  const renderBadgeIcon = (icon: string) => {
    switch (icon) {
      case "trophy":
        return <Trophy className="h-4 w-4" />
      case "star":
        return <Star className="h-4 w-4" />
      case "award":
        return <Award className="h-4 w-4" />
      case "gift":
        return <Gift className="h-4 w-4" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-primary/20">
              <AvatarImage src={user.avatar || "/placeholder.svg?height=64&width=64"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription>Miembro de la comunidad</CardDescription>
              <div className="flex items-center gap-1 mt-1">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Nivel {user.level}
                  </span>
                </Badge>
                <Badge variant="outline">
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3 w-3 text-amber-500" />
                    {user.totalPoints} puntos
                  </span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progreso al nivel {user.level + 1}</span>
            <span className="text-muted-foreground">
              {user.points}/{user.pointsToNextLevel} puntos
            </span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Necesitas {user.pointsToNextLevel - user.points} puntos más para subir al siguiente nivel
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Insignias destacadas</h4>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              {(showAllBadges ? user.badges : user.badges.slice(0, 5)).map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger asChild>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {renderBadgeIcon(badge.icon)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>

            {user.badges.length > 5 && !showAllBadges && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setShowAllBadges(true)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <span>Comentarios</span>
            </div>
            <p className="text-2xl font-bold">{user.stats.commentsWritten}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Me gusta</span>
            </div>
            <p className="text-2xl font-bold">{user.stats.likesGiven}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Share2 className="h-4 w-4 text-green-500" />
              <span>Compartidos</span>
            </div>
            <p className="text-2xl font-bold">{user.stats.sharesCount}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-purple-500" />
              <span>Seguidores</span>
            </div>
            <p className="text-2xl font-bold">{user.stats.followersCount}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Ver perfil completo</Button>
      </CardFooter>
    </Card>
  )
}
