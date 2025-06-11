"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import NotificationCenter from "@/components/notifications/notification-center"
import LanguageSwitcher from "@/components/language-switcher"
import { useI18n } from "@/lib/i18n"
import { Menu, X, Search, MessageSquare, User, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useI18n()

  const mainNavItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.community"), href: "/comunidad" },
    { name: t("nav.resources"), href: "/recursos" },
    { name: t("nav.events"), href: "/eventos" },
    { name: t("nav.streaming"), href: "/streaming" },
    { name: t("nav.map"), href: "/mapa" },
  ]

  const categoryItems = [
    { name: t("category.community"), href: "/categoria/comunidad", icon: "🏘️" },
    { name: t("category.disability"), href: "/categoria/discapacidad", icon: "🧩" },
    { name: t("category.singleparent"), href: "/categoria/monoparentales", icon: "👩‍👦" },
    { name: t("category.childhood"), href: "/categoria/crianza", icon: "👶" },
    { name: t("category.education"), href: "/categoria/educacion", icon: "📚" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex md:hidden">
          <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-500 to-yellow-400 flex items-center justify-center text-white font-bold">
              CS
            </div>
            <span className="hidden font-bold sm:inline-block">Catalunya Social</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1 ml-6">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === item.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1">
                {t("nav.categories")}
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("nav.categories")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/categorias" className="cursor-pointer">
                  {t("nav.categories")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">{t("nav.search")}</span>
          </Button>

          <NotificationCenter />

          <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
            <Link href="/mensajes">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">{t("nav.messages")}</span>
            </Link>
          </Button>

          <LanguageSwitcher />

          <ModeToggle />

          <Button variant="outline" size="sm" className="hidden md:flex">
            {t("nav.login")}
          </Button>

          <Button size="sm" className="hidden md:flex">
            {t("nav.register")}
          </Button>

          <Button className="bg-red-500 hover:bg-red-600 hidden md:flex" asChild>
            <Link href="/solicitar-ayuda">{t("nav.help")}</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <User className="h-5 w-5" />
                <span className="sr-only">{t("nav.profile")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/perfil">{t("nav.profile")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/mensajes">{t("nav.messages")}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="pt-2 border-t">
              <p className="px-3 py-2 text-sm font-medium">{t("nav.categories")}</p>
              <nav className="flex flex-col space-y-1 mt-1">
                {categoryItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-2 border-t flex flex-col space-y-2">
              <Button variant="outline" className="w-full">
                {t("nav.login")}
              </Button>
              <Button className="w-full">{t("nav.register")}</Button>
              <Button className="w-full bg-red-500 hover:bg-red-600" asChild>
                <Link href="/solicitar-ayuda">{t("nav.help")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
