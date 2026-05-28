import { config } from "dotenv"
config({ path: ".env.local" })
import { db } from "../db"
import { vehicles, spareparts, mekaniks, bengkels, services } from "../schema"
import { seedVehicles } from "./vehicles"
import { seedSpareparts } from "./spareparts"
import { seedMekaniks } from "./mekaniks"
import { seedBengkels } from "./bengkels"
import { seedServices } from "./services"

async function seed() {
  console.log("Seeding database...")

  let count = 0
  console.log("  vehicles...")
  for (const v of seedVehicles) {
    await db.insert(vehicles).values(v).onConflictDoNothing()
    count++
  }
  console.log(`    ${count} vehicles seeded`)

  console.log("  services...")
  count = 0
  for (const s of seedServices) {
    await db.insert(services).values(s).onConflictDoNothing()
    count++
  }
  console.log(`    ${count} services seeded`)

  console.log("  bengkels...")
  count = 0
  for (const b of seedBengkels) {
    await db.insert(bengkels).values(b).onConflictDoNothing()
    count++
  }
  console.log(`    ${count} bengkels seeded`)

  console.log("  mekaniks...")
  count = 0
  for (const m of seedMekaniks) {
    await db.insert(mekaniks).values(m).onConflictDoNothing()
    count++
  }
  console.log(`    ${count} mekaniks seeded`)

  console.log("  spareparts...")
  count = 0
  for (const s of seedSpareparts) {
    await db.insert(spareparts).values(s).onConflictDoNothing()
    count++
  }
  console.log(`    ${count} spareparts seeded`)

  console.log("Seed complete!")
  process.exit(0)
}

seed().catch((e) => { console.error(e); process.exit(1) })
