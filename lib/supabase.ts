import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de base de datos
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          role: "user" | "moderator" | "admin"
          created_at: string
          updated_at: string
          preferences: any
          verified: boolean
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          role?: "user" | "moderator" | "admin"
          preferences?: any
          verified?: boolean
        }
        Update: {
          full_name?: string
          avatar_url?: string | null
          role?: "user" | "moderator" | "admin"
          preferences?: any
          verified?: boolean
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          author_id: string
          category: string
          status: "draft" | "published" | "archived"
          featured_image: string | null
          created_at: string
          updated_at: string
          views: number
          likes: number
        }
        Insert: {
          title: string
          content: string
          excerpt: string
          author_id: string
          category: string
          status?: "draft" | "published" | "archived"
          featured_image?: string | null
        }
        Update: {
          title?: string
          content?: string
          excerpt?: string
          category?: string
          status?: "draft" | "published" | "archived"
          featured_image?: string | null
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          start_date: string
          end_date: string
          location: string
          organizer_id: string
          category: string
          max_participants: number | null
          current_participants: number
          price: number
          status: "upcoming" | "ongoing" | "completed" | "cancelled"
          created_at: string
        }
        Insert: {
          title: string
          description: string
          start_date: string
          end_date: string
          location: string
          organizer_id: string
          category: string
          max_participants?: number | null
          price?: number
          status?: "upcoming" | "ongoing" | "completed" | "cancelled"
        }
        Update: {
          title?: string
          description?: string
          start_date?: string
          end_date?: string
          location?: string
          category?: string
          max_participants?: number | null
          price?: number
          status?: "upcoming" | "ongoing" | "completed" | "cancelled"
        }
      }
    }
  }
}
