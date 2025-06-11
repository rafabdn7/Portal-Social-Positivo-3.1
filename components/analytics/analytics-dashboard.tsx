"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Users, Eye, Clock, TrendingUp } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  pageViews: number
  avgSessionDuration: number
  topPages: Array<{ page: string; views: number }>
  userGrowth: number
  conversionRate: number
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      // En una implementación real, estas consultas serían más complejas
      const endDate = new Date()
      const startDate = new Date()

      switch (timeRange) {
        case "24h":
          startDate.setHours(startDate.getHours() - 24)
          break
        case "7d":
          startDate.setDate(startDate.getDate() - 7)
          break
        case "30d":
          startDate.setDate(startDate.getDate() - 30)
          break
        case "90d":
          startDate.setDate(startDate.getDate() - 90)
          break
      }

      // Obtener usuarios únicos
      const { data: uniqueUsers } = await supabase
        .from("analytics_events")
        .select("user_id")
        .gte("timestamp", startDate.toISOString())
        .lte("timestamp", endDate.toISOString())
        .not("user_id", "is", null)

      // Obtener vistas de página
      const { data: pageViews } = await supabase
        .from("analytics_events")
        .select("*")
        .eq("event_name", "page_view")
        .gte("timestamp", startDate.toISOString())
        .lte("timestamp", endDate.toISOString())

      // Calcular métricas
      const totalUsers = new Set(uniqueUsers?.map((u) => u.user_id)).size
      const totalPageViews = pageViews?.length || 0

      // Páginas más visitadas
      const pageViewCounts =
        pageViews?.reduce(
          (acc, view) => {
            const page = view.properties?.page || view.page_url
            acc[page] = (acc[page] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ) || {}

      const topPages = Object.entries(pageViewCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([page, views]) => ({ page, views }))

      setData({
        totalUsers,
        activeUsers: Math.round(totalUsers * 0.7), // Simulado
        pageViews: totalPageViews,
        avgSessionDuration: 245, // Simulado en segundos
        topPages,
        userGrowth: 12.5, // Simulado
        conversionRate: 3.2, // Simulado
      })
    } catch (error) {
      console.error("Error loading analytics:", error)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data) {
    return <div>Error cargando datos de analytics</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="24h">24h</TabsTrigger>
            <TabsTrigger value="7d">7d</TabsTrigger>
            <TabsTrigger value="30d">30d</TabsTrigger>
            <TabsTrigger value="90d">90d</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{data.userGrowth}% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeUsers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round((data.activeUsers / data.totalUsers) * 100)}% del total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vistas de Página</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.pageViews.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {(data.pageViews / data.totalUsers).toFixed(1)} por usuario
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duración Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(data.avgSessionDuration / 60)}:{(data.avgSessionDuration % 60).toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground">minutos por sesión</div>
          </CardContent>
        </Card>
      </div>

      {/* Páginas más visitadas */}
      <Card>
        <CardHeader>
          <CardTitle>Páginas Más Visitadas</CardTitle>
          <CardDescription>Top 5 páginas por número de visitas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{index + 1}</Badge>
                  <span className="font-medium">{page.page}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={(page.views / data.topPages[0].views) * 100} className="w-20" />
                  <span className="text-sm text-muted-foreground w-12 text-right">{page.views}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas de conversión */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tasa de Conversión</CardTitle>
            <CardDescription>Porcentaje de usuarios que completan acciones clave</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.conversionRate}%</div>
            <Progress value={data.conversionRate} className="mt-2" />
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +0.8% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Usuarios</CardTitle>
            <CardDescription>Nuevos usuarios registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+{data.userGrowth}%</div>
            <Progress value={data.userGrowth} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-2">Comparado con el período anterior</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
