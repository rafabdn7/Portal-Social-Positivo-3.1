"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Flag, Reply } from "lucide-react"

interface Comment {
  id: number
  author: {
    name: string
    avatar?: string
  }
  content: string
  date: string
  likes: number
  isLiked: boolean
}

interface CommentSectionProps {
  postId: number
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: "María García",
        avatar: "/placeholder.svg?height=40&width=40&text=MG",
      },
      content: "Muchas gracias por compartir esta información. Me ha sido de gran ayuda para mi familia.",
      date: "2023-05-15T10:30:00",
      likes: 5,
      isLiked: false,
    },
    {
      id: 2,
      author: {
        name: "Jordi Puig",
        avatar: "/placeholder.svg?height=40&width=40&text=JP",
      },
      content: "He contactado con el servicio y han sido muy amables. Recomiendo a todos que lo prueben.",
      date: "2023-05-14T16:45:00",
      likes: 3,
      isLiked: false,
    },
  ])

  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: comments.length + 1,
      author: {
        name: "Usuario Actual",
        avatar: "/placeholder.svg?height=40&width=40&text=UA",
      },
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleLike = (id: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      }),
    )
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6">Comentarios ({comments.length})</h3>

      <div className="mb-8">
        <Textarea
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] mb-3"
        />
        <Button onClick={handleAddComment}>Publicar comentario</Button>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="font-semibold">{comment.author.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{comment.content}</p>

                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500 transition-colors"
                    onClick={() => handleLike(comment.id)}
                  >
                    <Heart className={`h-4 w-4 ${comment.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <span>{comment.likes}</span>
                  </button>

                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                    <Reply className="h-4 w-4" />
                    <span>Responder</span>
                  </button>

                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
                    <Flag className="h-4 w-4" />
                    <span>Reportar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
