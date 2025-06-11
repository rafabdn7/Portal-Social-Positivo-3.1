import { supabase } from "./supabase"

export async function generateSitemap() {
  const baseUrl = "https://catalunyasocial.cat"

  // Páginas estáticas
  const staticPages = [
    "",
    "/recursos",
    "/eventos",
    "/solicitar-ayuda",
    "/comunidad",
    "/voluntariado",
    "/mentorias",
    "/marketplace",
    "/calculadora",
    "/auth/login",
    "/auth/register",
  ]

  // Obtener posts dinámicos
  const { data: posts } = await supabase.from("posts").select("id, updated_at").eq("status", "published")

  // Obtener eventos dinámicos
  const { data: events } = await supabase.from("events").select("id, updated_at").eq("status", "upcoming")

  // Obtener servicios del marketplace
  const { data: services } = await supabase.from("marketplace_services").select("id, updated_at").eq("status", "active")

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>
  `,
    )
    .join("")}
  
  ${
    posts
      ?.map(
        (post) => `
    <url>
      <loc>${baseUrl}/post/${post.id}</loc>
      <lastmod>${post.updated_at}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `,
      )
      .join("") || ""
  }
  
  ${
    events
      ?.map(
        (event) => `
    <url>
      <loc>${baseUrl}/eventos/${event.id}</loc>
      <lastmod>${event.updated_at}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>
  `,
      )
      .join("") || ""
  }
  
  ${
    services
      ?.map(
        (service) => `
    <url>
      <loc>${baseUrl}/marketplace/${service.id}</loc>
      <lastmod>${service.updated_at}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>
  `,
      )
      .join("") || ""
  }
</urlset>`

  return sitemap
}
