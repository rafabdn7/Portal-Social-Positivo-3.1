import { getPosts } from "@/lib/wordpress"
import PostCard from "@/components/post-card"
import CategoryNav from "@/components/category-nav"
import HeroSection from "@/components/hero-section"

export default async function Home() {
  const posts = await getPosts(10)

  return (
    <main className="min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Catalunya Social Positiva</h2>

        <CategoryNav />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}
