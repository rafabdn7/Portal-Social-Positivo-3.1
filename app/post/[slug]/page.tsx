import { getPostBySlug } from "@/lib/wordpress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, Heart, Share2, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CommentSection from "@/components/comment-section"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return <div className="container mx-auto px-4 py-12">Post no encontrado</div>
  }

  return (
    <main className="min-h-screen">
      <div className="relative h-[40vh] w-full">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-red-400 to-yellow-400" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <div className="flex gap-2 mb-4">
                {post.categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categoria/${category.toLowerCase()}`}
                    className="bg-red-500 text-white text-sm px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl
                aliquam nisl, eu aliquam nisl nisl eu nisl.
              </p>
              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed
                euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
              </p>
              <h2>Cómo acceder a las ayudas</h2>
              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed
                euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
              </p>
              <ul>
                <li>Visitar la oficina de servicios sociales más cercana</li>
                <li>Presentar la documentación requerida</li>
                <li>Solicitar cita previa en el portal del ayuntamiento</li>
                <li>Completar el formulario de solicitud</li>
              </ul>
              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed
                euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
              </p>
            </div>

            <div className="flex items-center justify-between mt-8 py-4 border-t border-b">
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  <span>Me gusta ({post.likeCount})</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  <span>Compartir</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>{post.commentCount} comentarios</span>
              </div>
            </div>

            <CommentSection postId={post.id} />
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-4 space-y-6">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-lg font-bold mb-4">Recursos relacionados</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-red-600 hover:underline flex items-center gap-2">
                      <span>📝</span> Formulario de solicitud de ayudas
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-red-600 hover:underline flex items-center gap-2">
                      <span>📞</span> Teléfonos de contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-red-600 hover:underline flex items-center gap-2">
                      <span>📍</span> Mapa de oficinas de atención
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-red-600 hover:underline flex items-center gap-2">
                      <span>📅</span> Calendario de eventos
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                <h3 className="text-lg font-bold mb-4">¿Necesitas ayuda?</h3>
                <p className="mb-4">
                  Si necesitas asistencia inmediata, puedes contactar con nuestro equipo de soporte.
                </p>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600">Contactar ahora</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
