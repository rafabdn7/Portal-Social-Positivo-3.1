import { supabase } from "./supabase"

export interface AnalyticsEvent {
  event_name: string
  user_id?: string
  session_id: string
  page_url: string
  user_agent: string
  timestamp: string
  properties?: Record<string, any>
}

declare global {
  interface Window {
    gtag: any
  }
}

class Analytics {
  private sessionId: string
  private userId?: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initializeUser()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private async initializeUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    this.userId = user?.id
  }

  async track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      event_name: eventName,
      user_id: this.userId,
      session_id: this.sessionId,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      properties,
    }

    try {
      // Enviar a Supabase
      await supabase.from("analytics_events").insert(event)

      // También enviar a Google Analytics si está configurado
      if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
        window.gtag("event", eventName, {
          custom_parameter_1: properties?.category,
          custom_parameter_2: properties?.value,
        })
      }
    } catch (error) {
      console.error("Error tracking event:", error)
    }
  }

  async trackPageView(page: string) {
    await this.track("page_view", {
      page,
      referrer: document.referrer,
    })
  }

  async trackUserAction(action: string, target: string, value?: any) {
    await this.track("user_action", {
      action,
      target,
      value,
    })
  }

  async trackError(error: Error, context?: string) {
    await this.track("error", {
      error_message: error.message,
      error_stack: error.stack,
      context,
    })
  }

  async trackPerformance(metric: string, value: number) {
    await this.track("performance", {
      metric,
      value,
      connection_type: (navigator as any).connection?.effectiveType,
    })
  }

  setUserId(userId: string) {
    this.userId = userId
  }
}

export const analytics = new Analytics()

// Hook para React
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackUserAction: analytics.trackUserAction.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
  }
}
