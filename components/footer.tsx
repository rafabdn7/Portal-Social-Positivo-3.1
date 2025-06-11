import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Catalunya Social Positiva</h3>
            <p className="text-muted-foreground mb-4">
              Una plataforma para conectar, ayudar y fortalecer nuestra comunidad.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/comunidad" className="text-muted-foreground hover:text-foreground transition-colors">
                  Comunidad
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/ayuda" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categoria/comunidad"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Comunidad y Convivencia
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/discapacidad"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discapacidad y Dependencia
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/monoparentales"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Familias Monoparentales
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/crianza"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Crianza y Primera Infancia
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/educacion"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Educación y Apoyo Escolar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <span>info@catalunyasocial.org</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5" />
                <span>+34 93 123 45 67</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Suscríbete a nuestro boletín</h4>
              <form className="flex gap-2">
                <input type="email" placeholder="Tu email" className="px-3 py-2 rounded-md border flex-grow text-sm" />
                <button
                  type="submit"
                  className="bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600 transition-colors"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Catalunya Social Positiva. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacidad" className="hover:text-foreground transition-colors">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="hover:text-foreground transition-colors">
              Términos de uso
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Política de cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
