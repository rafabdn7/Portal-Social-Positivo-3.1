"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Locale = "ca" | "es" | "en"

export type Translations = {
  [key: string]: {
    [locale in Locale]: string
  }
}

// Traducciones comunes
export const translations: Translations = {
  // Navegación
  "nav.home": {
    ca: "Inici",
    es: "Inicio",
    en: "Home",
  },
  "nav.community": {
    ca: "Comunitat",
    es: "Comunidad",
    en: "Community",
  },
  "nav.resources": {
    ca: "Recursos",
    es: "Recursos",
    en: "Resources",
  },
  "nav.events": {
    ca: "Esdeveniments",
    es: "Eventos",
    en: "Events",
  },
  "nav.streaming": {
    ca: "Streaming",
    es: "Streaming",
    en: "Streaming",
  },
  "nav.map": {
    ca: "Mapa",
    es: "Mapa",
    en: "Map",
  },
  "nav.help": {
    ca: "Sol·licitar Ajuda",
    es: "Solicitar Ayuda",
    en: "Request Help",
  },
  "nav.categories": {
    ca: "Categories",
    es: "Categorías",
    en: "Categories",
  },
  "nav.search": {
    ca: "Cerca",
    es: "Buscar",
    en: "Search",
  },
  "nav.messages": {
    ca: "Missatges",
    es: "Mensajes",
    en: "Messages",
  },
  "nav.notifications": {
    ca: "Notificacions",
    es: "Notificaciones",
    en: "Notifications",
  },
  "nav.profile": {
    ca: "Perfil",
    es: "Perfil",
    en: "Profile",
  },
  "nav.login": {
    ca: "Iniciar sessió",
    es: "Iniciar sesión",
    en: "Log in",
  },
  "nav.register": {
    ca: "Registrar-se",
    es: "Registrarse",
    en: "Sign up",
  },

  // Categorías
  "category.community": {
    ca: "Comunitat i Convivència",
    es: "Comunidad y Convivencia",
    en: "Community and Coexistence",
  },
  "category.disability": {
    ca: "Discapacitat i Dependència",
    es: "Discapacidad y Dependencia",
    en: "Disability and Dependency",
  },
  "category.singleparent": {
    ca: "Famílies Monoparentals",
    es: "Familias Monoparentales",
    en: "Single-Parent Families",
  },
  "category.childhood": {
    ca: "Criança i Primera Infància",
    es: "Crianza y Primera Infancia",
    en: "Parenting and Early Childhood",
  },
  "category.education": {
    ca: "Educació i Suport Escolar",
    es: "Educación y Apoyo Escolar",
    en: "Education and School Support",
  },

  // Botones comunes
  "button.search": {
    ca: "Cercar",
    es: "Buscar",
    en: "Search",
  },
  "button.apply": {
    ca: "Sol·licitar",
    es: "Solicitar",
    en: "Apply",
  },
  "button.save": {
    ca: "Guardar",
    es: "Guardar",
    en: "Save",
  },
  "button.cancel": {
    ca: "Cancel·lar",
    es: "Cancelar",
    en: "Cancel",
  },
  "button.send": {
    ca: "Enviar",
    es: "Enviar",
    en: "Send",
  },
  "button.details": {
    ca: "Veure detalls",
    es: "Ver detalles",
    en: "View details",
  },
  "button.register": {
    ca: "Inscriure's",
    es: "Inscribirse",
    en: "Register",
  },
  "button.contact": {
    ca: "Contactar",
    es: "Contactar",
    en: "Contact",
  },

  // Página de inicio
  "home.title": {
    ca: "Catalunya Social Positiva",
    es: "Catalunya Social Positiva",
    en: "Catalunya Social Positiva",
  },
  "home.subtitle": {
    ca: "Una plataforma per connectar, ajudar i enfortir la nostra comunitat",
    es: "Una plataforma para conectar, ayudar y fortalecer nuestra comunidad",
    en: "A platform to connect, help and strengthen our community",
  },

  // Recursos
  "resources.title": {
    ca: "Recursos i Ajudes",
    es: "Recursos y Ayudas",
    en: "Resources and Aid",
  },
  "resources.subtitle": {
    ca: "Troba totes les ajudes, serveis i recursos disponibles per a famílies a Catalunya",
    es: "Encuentra todas las ayudas, servicios y recursos disponibles para familias en Catalunya",
    en: "Find all the aid, services and resources available for families in Catalonia",
  },
  "resources.tabs.aid": {
    ca: "Ajudes Econòmiques",
    es: "Ayudas Económicas",
    en: "Financial Aid",
  },
  "resources.tabs.services": {
    ca: "Serveis",
    es: "Servicios",
    en: "Services",
  },
  "resources.tabs.documents": {
    ca: "Documents",
    es: "Documentos",
    en: "Documents",
  },

  // Eventos
  "events.title": {
    ca: "Esdeveniments i Activitats",
    es: "Eventos y Actividades",
    en: "Events and Activities",
  },
  "events.subtitle": {
    ca: "Participa en tallers, xerrades i trobades dissenyades per donar suport a les famílies catalanes",
    es: "Participa en talleres, charlas y encuentros diseñados para apoyar a las familias catalanas",
    en: "Participate in workshops, talks and meetings designed to support Catalan families",
  },
  "events.tabs.upcoming": {
    ca: "Propers Esdeveniments",
    es: "Próximos Eventos",
    en: "Upcoming Events",
  },
  "events.tabs.past": {
    ca: "Esdeveniments Passats",
    es: "Eventos Pasados",
    en: "Past Events",
  },
  "events.tabs.my": {
    ca: "Els Meus Esdeveniments",
    es: "Mis Eventos",
    en: "My Events",
  },

  // Solicitar ayuda
  "help.title": {
    ca: "Sol·licitar Ajuda",
    es: "Solicitar Ayuda",
    en: "Request Help",
  },
  "help.subtitle": {
    ca: "Explica'ns la teva situació i t'ajudarem a trobar els recursos adequats",
    es: "Cuéntanos tu situación y te ayudaremos a encontrar los recursos adecuados",
    en: "Tell us about your situation and we'll help you find the right resources",
  },

  // Mensajes
  "messages.title": {
    ca: "Missatges",
    es: "Mensajes",
    en: "Messages",
  },
  "messages.subtitle": {
    ca: "Connecta amb altres membres de la comunitat",
    es: "Conecta con otros miembros de la comunidad",
    en: "Connect with other community members",
  },
  "messages.conversations": {
    ca: "Converses",
    es: "Conversaciones",
    en: "Conversations",
  },
  "messages.write": {
    ca: "Escriu un missatge...",
    es: "Escribe un mensaje...",
    en: "Write a message...",
  },

  // Mapa
  "map.title": {
    ca: "Mapa de Recursos",
    es: "Mapa de Recursos",
    en: "Resource Map",
  },
  "map.subtitle": {
    ca: "Troba serveis i recursos a prop teu",
    es: "Encuentra servicios y recursos cerca de ti",
    en: "Find services and resources near you",
  },
  "map.filters": {
    ca: "Filtres",
    es: "Filtros",
    en: "Filters",
  },
  "map.nearby": {
    ca: "Recursos propers",
    es: "Recursos cercanos",
    en: "Nearby resources",
  },

  // Perfil
  "profile.title": {
    ca: "El Meu Perfil",
    es: "Mi Perfil",
    en: "My Profile",
  },
  "profile.subtitle": {
    ca: "Gestiona la teva informació personal i activitat a la plataforma",
    es: "Gestiona tu información personal y actividad en la plataforma",
    en: "Manage your personal information and activity on the platform",
  },
  "profile.tabs.info": {
    ca: "Informació",
    es: "Información",
    en: "Information",
  },
  "profile.tabs.saved": {
    ca: "Guardats",
    es: "Guardados",
    en: "Saved",
  },
  "profile.tabs.reviews": {
    ca: "Les Meves Ressenyes",
    es: "Mis Reseñas",
    en: "My Reviews",
  },
  "profile.tabs.settings": {
    ca: "Configuració",
    es: "Configuración",
    en: "Settings",
  },

  // Footer
  "footer.quicklinks": {
    ca: "Enllaços ràpids",
    es: "Enlaces rápidos",
    en: "Quick links",
  },
  "footer.categories": {
    ca: "Categories",
    es: "Categorías",
    en: "Categories",
  },
  "footer.contact": {
    ca: "Contacte",
    es: "Contacto",
    en: "Contact",
  },
  "footer.newsletter": {
    ca: "Subscriu-te al nostre butlletí",
    es: "Suscríbete a nuestro boletín",
    en: "Subscribe to our newsletter",
  },
  "footer.rights": {
    ca: "Tots els drets reservats",
    es: "Todos los derechos reservados",
    en: "All rights reserved",
  },
  "footer.privacy": {
    ca: "Política de privacitat",
    es: "Política de privacidad",
    en: "Privacy policy",
  },
  "footer.terms": {
    ca: "Termes d'ús",
    es: "Términos de uso",
    en: "Terms of use",
  },
  "footer.cookies": {
    ca: "Política de cookies",
    es: "Política de cookies",
    en: "Cookie policy",
  },
}

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Cambiado a .tsx para permitir JSX
export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("ca")

  useEffect(() => {
    // Intentar obtener el idioma del navegador
    const browserLang = navigator.language.split("-")[0] as Locale
    if (browserLang === "ca" || browserLang === "es" || browserLang === "en") {
      setLocale(browserLang)
    }

    // Intentar obtener el idioma de localStorage
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale === "ca" || savedLocale === "es" || savedLocale === "en") {
      setLocale(savedLocale)
    }
  }, [])

  useEffect(() => {
    // Guardar el idioma en localStorage cuando cambie
    localStorage.setItem("locale", locale)
    // Actualizar el atributo lang del html
    document.documentElement.lang = locale
  }, [locale])

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][locale] || key
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
