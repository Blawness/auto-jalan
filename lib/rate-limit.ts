import { auth } from "@/lib/auth"

const rateMap = new Map<string, { count: number; reset: number }>()

export function checkRateLimit(key: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const entry = rateMap.get(key)
  if (!entry || now > entry.reset) {
    rateMap.set(key, { count: 1, reset: now + windowMs })
    return true
  }
  if (entry.count >= maxRequests) return false
  entry.count++
  return true
}

export async function rateLimitByUser(maxRequests = 20): Promise<string | null> {
  const session = await auth()
  const key = session?.user?.id || "anonymous"
  if (!checkRateLimit(key, maxRequests)) return "Terlalu banyak permintaan. Silakan coba lagi nanti."
  return null
}
