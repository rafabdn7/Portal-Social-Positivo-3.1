import { NextResponse } from "next/server"
import { generateSitemap } from "@/lib/sitemap"

export async function GET() {
  const sitemap = await generateSitemap()

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
