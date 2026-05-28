import { drizzle } from "drizzle-orm/node-postgres"
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net"

setDefaultAutoSelectFamilyAttemptTimeout(10000)

export const db = drizzle(process.env.DATABASE_URL!)
