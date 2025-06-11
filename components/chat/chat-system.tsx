"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreVertical, Search } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { supabase } from "@/lib/supabase"

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  message_type: "text" | "image" | "file"
  read: boolean
  created_at: string
  sender?: {
    full_name: string
    avatar_url: string
  }
}

interface Contact {
  id: string
  full_name: string
  avatar_url: string
  last_message?: string
  last_message_time?: string
  unread_count: number
  online: boolean
}

export default function ChatSystem() {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      loadContacts()
      subscribeToMessages()
    }
  }, [user])

  useEffect(() => {
    if (selectedContact) {
      loadMessages(selectedContact.id)
      markMessagesAsRead(selectedContact.id)
    }
  }, [selectedContact])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadContacts = async () => {
    if (!user) return

    const { data, error } = await supabase.from("profiles").select("id, full_name, avatar_url").neq("id", user.id)

    if (error) {
      console.error("Error loading contacts:", error)
      return
    }

    // En una implementación real, aquí cargarías los últimos mensajes y conteos
    const contactsWithMessages = data.map((contact) => ({
      ...contact,
      last_message: "",
      last_message_time: "",
      unread_count: 0,
      online: Math.random() > 0.5, // Simulado
    }))

    setContacts(contactsWithMessages)
  }

  const loadMessages = async (contactId: string) => {
    if (!user) return

    const { data, error } = await supabase
      .from("chat_messages")
      .select(`
        *,
        sender:sender_id (
          full_name,
          avatar_url
        )
      `)
      .or(
        `and(sender_id.eq.${user.id},receiver_id.eq.${contactId}),and(sender_id.eq.${contactId},receiver_id.eq.${user.id})`,
      )
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error loading messages:", error)
      return
    }

    setMessages(data || [])
  }

  const sendMessage = async () => {
    if (!user || !selectedContact || !newMessage.trim()) return

    const { error } = await supabase.from("chat_messages").insert({
      sender_id: user.id,
      receiver_id: selectedContact.id,
      content: newMessage.trim(),
      message_type: "text",
    })

    if (error) {
      console.error("Error sending message:", error)
      return
    }

    setNewMessage("")
  }

  const markMessagesAsRead = async (contactId: string) => {
    if (!user) return

    await supabase
      .from("chat_messages")
      .update({ read: true })
      .eq("sender_id", contactId)
      .eq("receiver_id", user.id)
      .eq("read", false)
  }

  const subscribeToMessages = () => {
    if (!user) return

    const subscription = supabase
      .channel("chat_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `receiver_id=eq.${user.id}`,
        },
        (payload) => {
          const newMessage = payload.new as Message
          if (selectedContact && newMessage.sender_id === selectedContact.id) {
            setMessages((prev) => [...prev, newMessage])
            markMessagesAsRead(selectedContact.id)
          }
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Lista de contactos */}
      <div className="w-1/3 border-r bg-muted/20">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar contactos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                selectedContact?.id === contact.id ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={contact.avatar_url || "/placeholder.svg"} alt={contact.full_name} />
                    <AvatarFallback>{contact.full_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{contact.full_name}</p>
                    {contact.unread_count > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {contact.unread_count}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{contact.last_message || "Sin mensajes"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área de chat */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Header del chat */}
            <div className="p-4 border-b bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={selectedContact.avatar_url || "/placeholder.svg"}
                      alt={selectedContact.full_name}
                    />
                    <AvatarFallback>{selectedContact.full_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedContact.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.online ? "En línea" : "Desconectado"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender_id === user?.id ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender_id === user?.id ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {formatTime(message.created_at)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensaje */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium">Selecciona un contacto</p>
              <p className="text-muted-foreground">Elige una conversación para empezar a chatear</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
