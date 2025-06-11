import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/lib/i18n"
import { AuthProvider } from "@/components/auth/auth-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AccessibilityToolbar from "@/components/accessibility/accessibility-toolbar"
import InstallPrompt from "@/components/pwa/install-prompt"
import SEOHead from "@/components/seo/seo-head"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Catalunya Social Positiva",
  description: "Una plataforma para conectar, ayudar y fortalecer nuestra comunidad",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  themeColor: "#3b82f6",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <SEOHead />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <I18nProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <AccessibilityToolbar />
              <InstallPrompt />
            </I18nProvider>
          </AuthProvider>
        </ThemeProvider>

        {/* Scripts de analytics: Plausible */}
        {/* Reemplaza 'tu-dominio.com' por el dominio real de tu proyecto en plausible.io */}
        <script defer data-domain="tu-dominio.com" src="https://plausible.io/js/plausible.js"></script>
        {/* Función global para eventos personalizados de Plausible */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.trackEvent = function(eventName, props) {
              if (window.plausible) {
                window.plausible(eventName, { props });
              }
            }
          `
        }} />
      </body>
    </html>
  )
}
