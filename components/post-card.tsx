"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Share2 } from "lucide-react"

interface PostCardProps {
  post: {
    id: number
    slug: string
    title: string
    excerpt: string
    featuredImage?: string
    author: {
      name: string
      avatar?: string
    }
    commentCount: number
    likeCount: number
    date: string
    categories: string[]
  }
}

export default function PostCard({ post }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="overflow-hidden h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 w-full overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-red-400 to-yellow-400" />
          )}

          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-2 left-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{post.categories[0]}</span>
            </div>
          )}
        </div>

        <CardContent className="flex-grow p-5">
          <Link href={`/post/${post.slug}`}>
            <h3 className="text-xl font-bold mb-2 hover:text-red-500 transition-colors">{post.title}</h3>
          </Link>
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>

        <CardFooter className="border-t p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{post.author.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>{post.commentCount}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>{post.likeCount}</span>
            </div>
            <Share2 className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-red-500 transition-colors" />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
