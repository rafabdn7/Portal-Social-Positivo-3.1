// This file handles the WordPress API integration

type Post = {
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

// WordPress REST API endpoint
const API_URL = process.env.WORDPRESS_API_URL || "https://your-wordpress-site.com/wp-json/wp/v2"

// Fetch posts from WordPress
export async function getPosts(count = 10): Promise<Post[]> {
  try {
    // In a real implementation, you would fetch from the WordPress REST API
    // const response = await fetch(`${API_URL}/posts?_embed&per_page=${count}`)
    // const data = await response.json()

    // For demo purposes, returning mock data
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      slug: `post-${i + 1}`,
      title: `Ayuda para familias en ${["Barcelona", "Girona", "Tarragona", "Lleida"][i % 4]}`,
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
      featuredImage: `/placeholder.svg?height=400&width=600&text=Post+${i + 1}`,
      author: {
        name: `Autor ${i + 1}`,
        avatar: `/placeholder.svg?height=40&width=40&text=A${i + 1}`,
      },
      commentCount: Math.floor(Math.random() * 50),
      likeCount: Math.floor(Math.random() * 100),
      date: new Date().toISOString(),
      categories: [["Comunidad", "Vivienda", "Educación", "Salud"][i % 4]],
    }))
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // In a real implementation, you would fetch from the WordPress REST API
    // const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`)
    // const data = await response.json()

    // For demo purposes, returning mock data
    return {
      id: 1,
      slug,
      title: `Detalles sobre ${slug.replace(/-/g, " ")}`,
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
      featuredImage: `/placeholder.svg?height=600&width=1200&text=${slug}`,
      author: {
        name: "Autor del Post",
        avatar: "/placeholder.svg?height=40&width=40&text=A",
      },
      commentCount: Math.floor(Math.random() * 50),
      likeCount: Math.floor(Math.random() * 100),
      date: new Date().toISOString(),
      categories: ["Comunidad", "Ayudas"],
    }
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

// Get categories from WordPress
export async function getCategories() {
  try {
    // In a real implementation, you would fetch from the WordPress REST API
    // const response = await fetch(`${API_URL}/categories`)
    // const data = await response.json()

    // For demo purposes, returning mock data
    return [
      { id: 1, name: "Comunidad y Convivencia", slug: "comunidad" },
      { id: 2, name: "Discapacidad y Dependencia", slug: "discapacidad" },
      { id: 3, name: "Familias Monoparentales", slug: "monoparentales" },
      { id: 4, name: "Crianza y Primera Infancia", slug: "crianza" },
      { id: 5, name: "Educación y Apoyo Escolar", slug: "educacion" },
      { id: 6, name: "Salud Mental Familiar", slug: "salud-mental" },
      { id: 7, name: "Vivienda y Alquiler Social", slug: "vivienda" },
      { id: 8, name: "Ayudas Económicas", slug: "ayudas" },
    ]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
