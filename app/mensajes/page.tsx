"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  type: "user" | "moderator" | "admin"
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: "text" | "image" | "file"
  read: boolean
}

export default function MensajesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("conv-1")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const conversations: Conversation[] = [
    {
      id: "conv-1",
      name: "María García",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
      lastMessage: "Gracias por la información sobre la RGC",
      timestamp: "10:30",
      unread: 2,
      online: true,
      type: "user",
    },
    {
      id: "conv-2",
      name: "Moderador - Elena",
      avatar: "/placeholder.svg?height=40&width=40&text=EM",
      lastMessage: "Tu consulta ha sido revisada",
      timestamp: "09:45",
      unread: 0,
      online: true,
      type: "moderator",
    },
    {
      id: "conv-3",
      name: "Jordi Puig",
      avatar: "/placeholder.svg?height=40&width=40&text=JP",
      lastMessage: "¿Has probado el nuevo centro de día?",
      timestamp: "Ayer",
      unread: 1,
      online: false,
      type: "user",
    },
    {
      id: "conv-4",
      name: "Soporte Técnico",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      lastMessage: "Problema resuelto. ¡Gracias!",
      timestamp: "Ayer",
      unread: 0,
      online: true,
      type: "admin",
    },
    {
      id: "conv-5",
      name: "Ana López",
      avatar: "/placeholder.svg?height=40&width=40&text=AL",
      lastMessage: "Te envío el enlace del taller",
      timestamp: "2 días",
      unread: 0,
      online: false,
      type: "user",
    },
  ]

  const messages: Record<string, Message[]> = {
    "conv-1": [
      {
        id: "msg-1",
        senderId: "maria-garcia",
        content: "Hola! He visto tu publicación sobre la Renta Garantizada de Ciudadanía",
        timestamp: "10:25",
        type: "text",
        read: true,
      },
      {
        id: "msg-2",
        senderId: "me",
        content: "¡Hola María! Sí, he pasado por todo el proceso recientemente. ¿En qué te puedo ayudar?",
        timestamp: "10:27",
        type: "text",
        read: true,
      },
      {
        id: "msg-3",
        senderId: "maria-garcia",
        content: "¿Cuánto tiempo tardaron en responderte después de enviar la solicitud?",
        timestamp: "10:28",
        type: "text",
        read: true,
      },
      {
        id: "msg-4",
        senderId: "me",
        content:
          "En mi caso tardaron unos 2 meses, pero depende mucho de la carga de trabajo que tengan. Te recomiendo que llames al 012 para hacer seguimiento.",
        timestamp: "10:29",
        type: "text",
        read: true,
      },
      {
        id: "msg-5",
        senderId: "maria-garcia",
        content: "Gracias por la información sobre la RGC",
        timestamp: "10:30",
        type: "text",
        read: false,
      },
    ],
    "conv-2": [
      {
        id: "msg-6",
        senderId: "moderator-elena",
        content: "Hola! He revisado tu consulta sobre las ayudas para familias numerosas.",
        timestamp: "09:40",
        type: "text",
        read: true,
      },
      {
        id: "msg-7",
        senderId: "me",
        content: "Perfecto, ¿hay alguna novedad?",
        timestamp: "09:42",
        type: "text",
        read: true,
      },
      {
        id: "msg-8",
        senderId: "moderator-elena",
        content: "Tu consulta ha sido revisada y hemos añadido la información al foro correspondiente.",
        timestamp: "09:45",
        type: "text",
        read: true,
      },
    ],
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedConv = conversations.find((c) => c.id === selectedConversation)
  const conversationMessages = selectedConversation ? messages[selectedConversation] || [] : []

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      read: true,
    }

    // In a real app, this would be sent to the server
    setNewMessage("")
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "moderator":
        return "bg-blue-100 text-blue-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "moderator":
        return "Moderador"
      case "admin":
        return "Admin"
      default:
        return ""
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mensajes</h1>
        <p className="text-muted-foreground">Conecta con otros miembros de la comunidad</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Lista de conversaciones */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Conversaciones</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversaciones..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">{conversation.name}</p>
                          {conversation.type !== "user" && (
                            <Badge variant="secondary" className={`text-xs ${getUserTypeColor(conversation.type)}`}>
                              {getUserTypeLabel(conversation.type)}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          {conversation.unread > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Área de chat */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConv ? (
            <>
              {/* Header del chat */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConv.avatar || "/placeholder.svg"} alt={selectedConv.name} />
                        <AvatarFallback>{selectedConv.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedConv.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{selectedConv.name}</h3>
                        {selectedConv.type !== "user" && (
                          <Badge variant="secondary" className={`text-xs ${getUserTypeColor(selectedConv.type)}`}>
                            {getUserTypeLabel(selectedConv.type)}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedConv.online ? "En línea" : "Desconectado"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                        <DropdownMenuItem>Silenciar notificaciones</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Bloquear usuario</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              {/* Mensajes */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {conversationMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.senderId === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground/70"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Input de mensaje */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Escribe un mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[40px] max-h-[120px] resize-none pr-12"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                    />
                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Selecciona una conversación</h3>
                <p className="text-sm text-muted-foreground">Elige una conversación para empezar a chatear</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  )
}
