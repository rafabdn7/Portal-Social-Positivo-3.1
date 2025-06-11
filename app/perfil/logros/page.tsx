import AchievementCard from "@/components/gamification/achievement-card"
import UserLevelCard from "@/components/gamification/user-level-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AchievementsPage() {
  // This would come from your API in a real implementation
  const user = {
    id: "user-1",
    name: "María García",
    avatar: "/placeholder.svg?height=128&width=128&text=MG",
    level: 5,
    points: 350,
    pointsToNextLevel: 500,
    totalPoints: 2350,
    badges: [
      { id: "badge-1", name: "Colaborador Activo", icon: "trophy" },
      { id: "badge-2", name: "Experto en Ayudas", icon: "star" },
      { id: "badge-3", name: "Mentor de la Comunidad", icon: "award" },
      { id: "badge-4", name: "Participante Destacado", icon: "gift" },
      { id: "badge-5", name: "Creador de Contenido", icon: "trophy" },
      { id: "badge-6", name: "Miembro Veterano", icon: "award" },
      { id: "badge-7", name: "Ayudante Social", icon: "gift" },
    ],
    stats: {
      postsCreated: 12,
      commentsWritten: 87,
      likesGiven: 215,
      sharesCount: 34,
      followersCount: 56,
    },
  }

  const achievements = [
    {
      id: "achievement-1",
      title: "Bienvenido a la Comunidad",
      description: "Completa tu perfil y realiza tu primera publicación",
      icon: "trophy",
      points: 50,
      progress: 2,
      maxProgress: 2,
      isUnlocked: true,
      category: "Participación",
      rarity: "common" as const,
    },
    {
      id: "achievement-2",
      title: "Colaborador Activo",
      description: "Publica 10 comentarios útiles en la comunidad",
      icon: "trophy",
      points: 100,
      progress: 8,
      maxProgress: 10,
      isUnlocked: false,
      category: "Participación",
      rarity: "uncommon" as const,
    },
    {
      id: "achievement-3",
      title: "Experto en Recursos",
      description: "Comparte 5 recursos útiles que ayuden a otros miembros",
      icon: "award",
      points: 200,
      progress: 3,
      maxProgress: 5,
      isUnlocked: false,
      category: "Contribución",
      rarity: "rare" as const,
    },
    {
      id: "achievement-4",
      title: "Mentor de la Comunidad",
      description: "Ayuda a 20 personas respondiendo a sus preguntas",
      icon: "award",
      points: 300,
      progress: 12,
      maxProgress: 20,
      isUnlocked: false,
      category: "Ayuda",
      rarity: "epic" as const,
    },
    {
      id: "achievement-5",
      title: "Superstar Social",
      description: "Alcanza 1000 puntos totales en la plataforma",
      icon: "trophy",
      points: 500,
      progress: 350,
      maxProgress: 1000,
      isUnlocked: false,
      category: "Progreso",
      rarity: "legendary" as const,
    },
    {
      id: "achievement-6",
      title: "Asistente a Eventos",
      description: "Participa en 3 eventos en directo de la plataforma",
      icon: "trophy",
      points: 150,
      progress: 1,
      maxProgress: 3,
      isUnlocked: false,
      category: "Eventos",
      rarity: "uncommon" as const,
    },
  ]

  const categories = [
    { id: "all", name: "Todos" },
    { id: "participation", name: "Participación" },
    { id: "contribution", name: "Contribución" },
    { id: "help", name: "Ayuda" },
    { id: "events", name: "Eventos" },
    { id: "progress", name: "Progreso" },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Logros</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserLevelCard user={user} />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Logros y Desafíos</h2>
              <TabsList>
                {categories.slice(0, 3).map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} {...achievement} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="participation" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements
                  .filter((a) => a.category === "Participación")
                  .map((achievement) => (
                    <AchievementCard key={achievement.id} {...achievement} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="contribution" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements
                  .filter((a) => a.category === "Contribución")
                  .map((achievement) => (
                    <AchievementCard key={achievement.id} {...achievement} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
