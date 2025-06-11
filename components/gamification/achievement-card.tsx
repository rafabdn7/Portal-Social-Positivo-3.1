import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Lock, Award } from "lucide-react"

interface AchievementCardProps {
  id: string
  title: string
  description: string
  icon: "trophy" | "award" | "custom"
  customIcon?: React.ReactNode
  points: number
  progress: number
  maxProgress: number
  isUnlocked: boolean
  category: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  className?: string
}

export default function AchievementCard({
  title,
  description,
  icon,
  customIcon,
  points,
  progress,
  maxProgress,
  isUnlocked,
  category,
  rarity,
  className,
}: AchievementCardProps) {
  const progressPercentage = Math.min(100, Math.round((progress / maxProgress) * 100))

  const rarityColors = {
    common: "bg-slate-200 text-slate-800",
    uncommon: "bg-green-200 text-green-800",
    rare: "bg-blue-200 text-blue-800",
    epic: "bg-purple-200 text-purple-800",
    legendary: "bg-yellow-200 text-yellow-800",
  }

  const renderIcon = () => {
    if (icon === "trophy") return <Trophy className="h-6 w-6" />
    if (icon === "award") return <Award className="h-6 w-6" />
    return customIcon
  }

  return (
    <Card className={cn("overflow-hidden transition-all", isUnlocked ? "opacity-100" : "opacity-70", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "p-2 rounded-full",
                isUnlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
              )}
            >
              {renderIcon()}
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-xs">{category}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={cn("ml-auto", rarityColors[rarity])}>
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progreso</span>
            <span>
              {progress}/{maxProgress}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex items-center gap-1 text-amber-500">
          <Trophy className="h-4 w-4" />
          <span className="font-medium">{points} puntos</span>
        </div>
        {!isUnlocked && (
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Lock className="h-3 w-3" />
            <span>Bloqueado</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
