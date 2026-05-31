import {
  pgTable,
  pgEnum,
  text,
  integer,
  real,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const roleEnum = pgEnum("role", ["user", "mekanik", "admin"])
export const orderStatusEnum = pgEnum("order_status", [
  "ongoing",
  "selesai",
  "dibatalkan",
])
export const keaslianEnum = pgEnum("keaslian", ["OEM", "Aftermarket", "KW"])
export const tipeKendaraanEnum = pgEnum("tipe_kendaraan", ["motor", "mobil"])

// Auth.js tables
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  role: roleEnum("role").default("user").notNull(),
  noHP: text("no_hp"),
  password: text("password"),
})

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
})

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
})

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires").notNull(),
})

// Catalog tables
export const vehicles = pgTable("vehicles", {
  id: text("id").primaryKey(),
  merek: text("merek").notNull(),
  model: text("model").notNull(),
  tahun: jsonb("tahun").$type<number[]>().notNull(),
  tipe: tipeKendaraanEnum("tipe").notNull(),
})

export const spareparts = pgTable("spareparts", {
  id: text("id").primaryKey(),
  nama: text("nama").notNull(),
  harga: integer("harga").notNull(),
  foto: text("foto").notNull(),
  keaslian: keaslianEnum("keaslian").notNull(),
  stok: integer("stok").notNull(),
  spesifikasi: jsonb("spesifikasi")
    .$type<Record<string, string>>()
    .notNull(),
  compatibleVehicleIds: jsonb("compatible_vehicle_ids")
    .$type<string[]>()
    .notNull(),
})

export const bengkels = pgTable("bengkels", {
  id: text("id").primaryKey(),
  nama: text("nama").notNull(),
  alamat: text("alamat").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  jamBuka: text("jam_buka").notNull(),
  rating: real("rating").notNull(),
  spesialisasi: jsonb("spesialisasi").$type<string[]>().notNull(),
  foto: text("foto").notNull(),
})

export const mekaniks = pgTable("mekaniks", {
  id: text("id").primaryKey(),
  nama: text("nama").notNull(),
  foto: text("foto").notNull(),
  bengkelId: text("bengkel_id").references(() => bengkels.id),
  platKendaraan: text("plat_kendaraan").notNull(),
  sertifikasi: jsonb("sertifikasi").$type<string[]>().notNull(),
  rating: real("rating").notNull(),
  jumlahUlasan: integer("jumlah_ulasan").notNull(),
  jarak: integer("jarak").notNull(),
  spesialisasi: jsonb("spesialisasi").$type<string[]>().notNull(),
})

export const services = pgTable("services", {
  id: text("id").primaryKey(),
  nama: text("nama").notNull(),
  deskripsi: text("deskripsi").notNull(),
  hargaJasa: integer("harga_jasa").notNull(),
  estimasiWaktu: text("estimasi_waktu").notNull(),
  ikon: text("ikon").notNull(),
})

// Transactional tables
export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  mekanikId: text("mekanik_id").references(() => mekaniks.id),
  serviceId: text("service_id").references(() => services.id),
  vehicleId: text("vehicle_id").references(() => vehicles.id),
  status: orderStatusEnum("status").notNull().default("ongoing"),
  totalHarga: integer("total_harga").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  sparepartId: text("sparepart_id").references(() => spareparts.id),
  qty: integer("qty").notNull(),
  hargaSatuan: integer("harga_satuan").notNull(),
})

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  mekanikId: text("mekanik_id").references(() => mekaniks.id),
  orderId: text("order_id").references(() => orders.id),
  ratingMekanik: integer("rating_mekanik").notNull(),
  ratingSparepart: integer("rating_sparepart"),
  tags: jsonb("tags").$type<string[]>().$defaultFn(() => []),
  teks: text("teks"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const forumThreads = pgTable("forum_threads", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  judul: text("judul").notNull(),
  kategori: text("kategori").notNull(),
  deskripsi: text("deskripsi").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const forumAnswers = pgTable("forum_answers", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  threadId: text("thread_id")
    .notNull()
    .references(() => forumThreads.id, { onDelete: "cascade" }),
  isi: text("isi").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Relations
export const mekaniksRelations = relations(mekaniks, ({ one }) => ({
  bengkel: one(bengkels, {
    fields: [mekaniks.bengkelId],
    references: [bengkels.id],
  }),
}))

export const bengkelsRelations = relations(bengkels, ({ many }) => ({
  mekaniks: many(mekaniks),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  mekanik: one(mekaniks, {
    fields: [orders.mekanikId],
    references: [mekaniks.id],
  }),
  service: one(services, {
    fields: [orders.serviceId],
    references: [services.id],
  }),
  vehicle: one(vehicles, {
    fields: [orders.vehicleId],
    references: [vehicles.id],
  }),
  orderItems: many(orderItems),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  sparepart: one(spareparts, {
    fields: [orderItems.sparepartId],
    references: [spareparts.id],
  }),
}))

export const forumThreadsRelations = relations(forumThreads, ({ one, many }) => ({
  user: one(users, {
    fields: [forumThreads.userId],
    references: [users.id],
  }),
  answers: many(forumAnswers),
}))

export const forumAnswersRelations = relations(forumAnswers, ({ one }) => ({
  user: one(users, {
    fields: [forumAnswers.userId],
    references: [users.id],
  }),
  thread: one(forumThreads, {
    fields: [forumAnswers.threadId],
    references: [forumThreads.id],
  }),
}))
