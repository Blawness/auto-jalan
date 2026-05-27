import "dotenv/config"
import { db } from "../db"
import { vehicles, spareparts, mekaniks, bengkels, services } from "../schema"
import { seedVehicles } from "./vehicles"
import { seedSpareparts } from "./spareparts"
import { seedMekaniks } from "./mekaniks"
import { seedBengkels } from "./bengkels"
import { seedServices } from "./services"

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

async function seed() {
  console.log("Seeding database...")

  const vehicleChunks = chunk(seedVehicles, 30)
  for (let i = 0; i < vehicleChunks.length; i++) {
    console.log(`  vehicles batch ${i + 1}/${vehicleChunks.length} (${vehicleChunks[i].length} rows)`)
    await db.insert(vehicles).values(vehicleChunks[i]).onConflictDoNothing()
  }

  console.log("  services...")
  await db.insert(services).values(seedServices).onConflictDoNothing()

  for (const b of seedBengkels) {
    await db.insert(bengkels).values(b).onConflictDoNothing()
  }
  for (const m of seedMekaniks) {
    await db.insert(mekaniks).values(m).onConflictDoNothing()
  }
  for (const s of seedSpareparts) {
    await db.insert(spareparts).values(s).onConflictDoNothing()
  }
  console.log("Seed complete!")
  process.exit(0)
}

seed().catch((e) => { console.error(e); process.exit(1) })
