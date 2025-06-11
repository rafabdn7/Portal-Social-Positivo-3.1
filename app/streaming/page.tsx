import StreamPlayer from "@/components/live-streaming/stream-player"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MessageSquare, ThumbsUp, Share2, Users, Calendar } from "lucide-react"

export default function StreamingPage() {
  // This would come from your API in a real implementation
  const featuredStream = {
    id: "stream-1",
    title: "Charla sobre recursos para familias monoparentales en Barcelona",
    hostName: "María García - Trabajadora Social",
    streamUrl: "https://example.com/stream.mp4", // This would be a real stream URL
    thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Streaming",
    viewerCount: 245,
    isLive: true,
    description:
      "En esta charla hablaremos sobre los recursos disponibles para familias monoparentales en Barcelona, incluyendo ayudas económicas, servicios de conciliación y apoyo psicológico.",
    tags: ["Familias Monoparentales", "Barcelona", "Ayudas"],
    scheduledFor: "2023-06-09T18:00:00",
  }

  const upcomingStreams = [
    {
      id: "upcoming-1",
      title: "Taller: Gestión emocional para padres y madres",
      hostName: "Dr. Jordi Puig - Psicólogo",
      thumbnailUrl: "/placeholder.svg?height=180&width=320&text=Taller",
      scheduledFor: "2023-06-12T17:30:00",
      viewerCount: 0,
    },
    {
      id: "upcoming-2",
      title: "Mesa redonda: Inclusión de personas con discapacidad",
      hostName: "Fundación Inclusiva",
      thumbnailUrl: "/placeholder.svg?height=180&width=320&text=Mesa+Redonda",
      scheduledFor: "2023-06-15T19:00:00",
      viewerCount: 0,
    },
    {
      id: "upcoming-3",
      title: "Entrevista: Nuevas ayudas para vivienda social",
      hostName: "Departamento de Vivienda",
      thumbnailUrl: "/placeholder.svg?height=180&width=320&text=Entrevista",
      scheduledFor: "2023-06-18T12:00:00",
      viewerCount: 0,
    },
  ]

  const pastStreams = [
    {
      id: "past-1",
      title: "Recursos educativos para familias con niños con TDAH",
      hostName: "Elena Martínez - Educadora",
      thumbnailUrl: "/placeholder.svg?height=180&width=320&text=Recursos+TDAH",
      streamedOn: "2023-06-01T18:00:00",
      viewCount: 1243,
    },
    {
      id: "past-2",
      title: "Cómo solicitar ayudas para el alquiler en 2023",
      hostName: "Oficina de Vivienda",
      thumbnailUrl: "/placeholder.svg?height=180&width=320&text=Ayudas+Alquiler",
      streamedOn: "2023-05-25T17:00:00",
      viewCount: 3567,
    },
    {
      id: "past-3",
      title: "Derechos laborales para cuidadores familiares",
      hostName: "Abogados Sociales",
      thumbnailUrl: "/placeholder.svg?height=180&width=320&text=Derechos+Laborales",
      streamedOn: "2023-05-18T19:30:00",
      viewCount: 2189,
    },
  ]

  return (
    <main className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Streaming en directo</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Featured Stream */}
          <div className="space-y-4">
            <StreamPlayer
              streamUrl={featuredStream.streamUrl}
              title={featuredStream.title}
              hostName={featuredStream.hostName}
              viewerCount={featuredStream.viewerCount}
              isLive={featuredStream.isLive}
              thumbnailUrl={featuredStream.thumbnailUrl}
            />

            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h2 className="text-2xl font-bold mb-2">{featuredStream.title}</h2>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40&text=MG" alt={featuredStream.hostName} />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{featuredStream.hostName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(featuredStream.scheduledFor).toLocaleDateString()} a las{" "}
                    {new Date(featuredStream.scheduledFor).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{featuredStream.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {featuredStream.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm hover:bg-muted/80 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Me gusta</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comentar</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Compartir</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{featuredStream.viewerCount} espectadores</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Upcoming and Past Streams */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="upcoming">Próximos</TabsTrigger>
              <TabsTrigger value="past">Anteriores</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingStreams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={stream.thumbnailUrl || "/placeholder.svg"}
                      alt={stream.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(stream.scheduledFor).toLocaleDateString()}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                    <p className="text-sm text-muted-foreground">{stream.hostName}</p>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                Ver todos los próximos
              </Button>
            </TabsContent>
            <TabsContent value="past" className="space-y-4">
              {pastStreams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={stream.thumbnailUrl || "/placeholder.svg"}
                      alt={stream.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {stream.viewCount.toLocaleString()} vistas
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                    <p className="text-sm text-muted-foreground">{stream.hostName}</p>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                Ver todos los anteriores
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
