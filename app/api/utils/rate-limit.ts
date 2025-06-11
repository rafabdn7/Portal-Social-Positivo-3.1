// Simple in-memory rate limiter (per IP + endpoint)
// For production: use Redis or a distributed store
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutos
const RATE_LIMIT_MAX = 5; // 5 intentos por ventana

const attempts: Record<string, { count: number; expires: number }> = {}

export function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  if (!attempts[key] || attempts[key].expires < now) {
    attempts[key] = { count: 1, expires: now + RATE_LIMIT_WINDOW_MS }
    return { allowed: true }
  }
  if (attempts[key].count < RATE_LIMIT_MAX) {
    attempts[key].count++
    return { allowed: true }
  }
  // Rate limit exceeded
  return { allowed: false, retryAfter: Math.ceil((attempts[key].expires - now) / 1000) }
}
