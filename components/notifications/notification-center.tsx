"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, X, MessageSquare, Calendar, Heart, AlertTriangle, Info } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Notification {
  id: string
  type: "message" | "event" | "like" | "comment" | "system" | "urgent"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  avatar?: string
  priority: "low" | "medium" | "high"
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-1",
      type: "urgent",
      title: "Nueva ayuda disponible",
      message: "Se ha publicado una nueva ayuda para familias monoparentales en Barcelona",
      timestamp: "2024-06-09T10:30:00",
      read: false,
      actionUrl: "/recursos/ayuda-monoparentales",
      priority: "high",
    },
    {
      id: "notif-2",
      type: "event",
      title: "Recordatorio de evento",
      message: "El taller 'Gestión del Estrés' comienza en 1 hora",
      timestamp: "2024-06-09T09:00:00",
      read: false,
      actionUrl: "/eventos/taller-estres",
      priority: "medium",
    },
    {
      id: "notif-3",
      type: "message",
      title: "Nuevo mensaje",
      message: "María García te ha enviado un mensaje privado",
      timestamp: "2024-06-09T08:45:00",
      read: false,
      avatar: "/placeholder.svg?height=32&width=32&text=MG",
      actionUrl: "/mensajes/maria-garcia",
      priority: "medium",
    },
    {
      id: "notif-4",
      type: "comment",
      title: "Nueva respuesta",
      message: "Alguien ha respondido a tu pregunta sobre la RGC",
      timestamp: "2024-06-08T16:20:00",
      read: true,
      actionUrl: "/comunidad/tema/rgc-dudas",
      priority: "low",
    },
    {
      id: "notif-5",
      type: "like",
      title: "Me gusta en tu publicación",
      message: "Tu publicación sobre recursos educativos ha recibido 5 nuevos me gusta",
      timestamp: "2024-06-08T14:15:00",
      read: true,
      actionUrl: "/comunidad/mi-publicacion",
      priority: "low",
    },
    {
      id: "notif-6",
      type: "system",
      title: "Actualización del sistema",
      message: "Hemos mejorado la búsqueda de recursos. ¡Pruébala!",
      timestamp: "2024-06-08T12:00:00",
      read: false,
      priority: "low",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "like":
        return <Heart className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "urgent":
        return <AlertTriangle className="h-4 w-4" />
      case "system":
        return <Info className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-500"
    if (type === "urgent") return "text-red-500"
    if (type === "event") return "text-blue-500"
    if (type === "message") return "text-green-500"
    if (type === "like") return "text-pink-500"
    return "text-muted-foreground"
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Hace unos minutos"
    if (diffInHours < 24) return `Hace ${diffInHours} horas`
    if (diffInHours < 48) return "Ayer"
    return date.toLocaleDateString()
  }

  const groupedNotifications = {
    unread: notifications.filter((n) => !n.read),
    read: notifications.filter((n) => n.read),
    urgent: notifications.filter((n) => n.type === "urgent" || n.priority === "high"),
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notificaciones</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Marcar todas como leídas
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mx-4 mb-4">
                <TabsTrigger value="all">Todas {notifications.length > 0 && `(${notifications.length})`}</TabsTrigger>
                <TabsTrigger value="unread">Sin leer {unreadCount > 0 && `(${unreadCount})`}</TabsTrigger>
                <TabsTrigger value="urgent">
                  Urgentes {groupedNotifications.urgent.length > 0 && `(${groupedNotifications.urgent.length})`}
                </TabsTrigger>
              </TabsList>

              <div className="max-h-96 overflow-y-auto">
                <TabsContent value="all" className="mt-0">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No tienes notificaciones</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-muted/50 transition-colors border-l-4 ${
                            notification.read
                              ? "border-l-transparent"
                              : notification.priority === "high"
                                ? "border-l-red-500"
                                : "border-l-primary"
                          } ${!notification.read ? "bg-muted/20" : ""}`}
                        >
                          <div className="flex gap-3">
                            {notification.avatar ? (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className={`${getTypeColor(notification.type, notification.priority)} mt-1`}>
                                {getIcon(notification.type)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    {formatTime(notification.timestamp)}
                                  </p>
                                </div>
                                <div className="flex gap-1 ml-2">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <Check className="h-3 w-3" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="unread" className="mt-0">
                  {groupedNotifications.unread.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Check className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No tienes notificaciones sin leer</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {groupedNotifications.unread.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 hover:bg-muted/50 transition-colors border-l-4 border-l-primary bg-muted/20"
                        >
                          <div className="flex gap-3">
                            {notification.avatar ? (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className={`${getTypeColor(notification.type, notification.priority)} mt-1`}>
                                {getIcon(notification.type)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    {formatTime(notification.timestamp)}
                                  </p>
                                </div>
                                <div className="flex gap-1 ml-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="urgent" className="mt-0">
                  {groupedNotifications.urgent.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No tienes notificaciones urgentes</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {groupedNotifications.urgent.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 hover:bg-muted/50 transition-colors border-l-4 border-l-red-500 bg-red-50"
                        >
                          <div className="flex gap-3">
                            <div className="text-red-500 mt-1">{getIcon(notification.type)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    {formatTime(notification.timestamp)}
                                  </p>
                                </div>
                                <div className="flex gap-1 ml-2">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <Check className="h-3 w-3" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
