// Simple in-memory log (para demo)
// En producción: enviar a un sistema de logs o base de datos
interface LogEntry {
  timestamp: number
  ip: string
  email?: string
  endpoint: string
  type: 'success' | 'fail' | 'rate-limit'
  reason?: string
}

const log: LogEntry[] = []

export function log2FA(entry: LogEntry) {
  log.push({ ...entry, timestamp: Date.now() })
  // Opcional: imprimir en consola para demo
  if (entry.type !== 'success') {
    console.warn(`[2FA][${entry.endpoint}] [${entry.type}]`, entry)
  }
}

export function get2FALogs() {
  return log
}
