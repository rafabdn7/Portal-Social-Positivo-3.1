import Head from "next/head"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export default function SEOHead({
  title = "Catalunya Social Positiva",
  description = "Plataforma para conectar, ayudar y fortalecer nuestra comunidad catalana",
  keywords = ["catalunya", "social", "ayuda", "comunidad", "barcelona"],
  image = "/og-image.jpg",
  url = "https://catalunyasocial.cat",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: SEOProps) {
  const fullTitle = title.includes("Catalunya Social Positiva") ? title : `${title} | Catalunya Social Positiva`

  const fullUrl = url.startsWith("http") ? url : `https://catalunyasocial.cat${url}`
  const fullImage = image.startsWith("http") ? image : `https://catalunyasocial.cat${image}`

  return (
    <Head>
      {/* Título y descripción básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Catalunya Social Positiva" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:locale:alternate" content="ca_ES" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@catalunyasocial" />

      {/* Artículos específicos */}
      {type === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Idiomas alternativos */}
      <link rel="alternate" hrefLang="es" href={fullUrl} />
      <link rel="alternate" hrefLang="ca" href={fullUrl.replace(".cat", ".cat/ca")} />
      <link rel="alternate" hrefLang="en" href={fullUrl.replace(".cat", ".cat/en")} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === "article" ? "Article" : "WebSite",
            name: fullTitle,
            description: description,
            url: fullUrl,
            image: fullImage,
            ...(type === "article" && {
              headline: title,
              datePublished: publishedTime,
              dateModified: modifiedTime,
              author: {
                "@type": "Person",
                name: author,
              },
              publisher: {
                "@type": "Organization",
                name: "Catalunya Social Positiva",
                logo: {
                  "@type": "ImageObject",
                  url: "https://catalunyasocial.cat/logo.png",
                },
              },
            }),
            ...(type === "website" && {
              potentialAction: {
                "@type": "SearchAction",
                target: "https://catalunyasocial.cat/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }),
        }}
      />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Verificaciones */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
    </Head>
  )
}
