import { GET, POST } from "@/app/api/posts/route"
import { NextRequest } from "next/server"
import { supabase } from "@/lib/supabase"
import { jest } from "@jest/globals"

jest.mock("@/lib/supabase")

describe("/api/posts", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("GET", () => {
    it("should return posts with pagination", async () => {
      const mockPosts = [
        {
          id: "1",
          title: "Test Post",
          content: "Test content",
          author_id: "user1",
          category: "test",
          status: "published",
          created_at: "2024-01-01T00:00:00Z",
        },
      ]

      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: mockPosts,
          error: null,
          count: 1,
        }),
      }
      ;(supabase as any).from.mockReturnValue(mockSupabase)

      const request = new NextRequest("http://localhost:3000/api/posts?page=1&limit=10")
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toEqual(mockPosts)
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      })
    })

    it("should handle database errors", async () => {
      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: null,
          error: { message: "Database error" },
          count: null,
        }),
      }
      ;(supabase as any).from.mockReturnValue(mockSupabase)

      const request = new NextRequest("http://localhost:3000/api/posts")
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe("Database error")
    })
  })

  describe("POST", () => {
    it("should create a new post", async () => {
      const mockUser = { id: "user1", email: "test@example.com" }
      const mockPost = {
        id: "1",
        title: "New Post",
        content: "New content",
        category: "test",
        author_id: "user1",
      }

      const mockAuth = {
        getUser: jest.fn().mockResolvedValue({
          data: { user: mockUser },
          error: null,
        }),
      }

      const mockSupabase = {
        auth: mockAuth,
        from: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockPost,
          error: null,
        }),
      }
      ;(supabase as any).auth = mockAuth
      ;(supabase as any).from.mockReturnValue(mockSupabase)

      const request = new NextRequest("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          title: "New Post",
          content: "New content",
          category: "test",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data).toEqual(mockPost)
    })

    it("should return 401 for unauthorized requests", async () => {
      const request = new NextRequest("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "New Post",
          content: "New content",
          category: "test",
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe("Token de autorización requerido")
    })
  })
})
