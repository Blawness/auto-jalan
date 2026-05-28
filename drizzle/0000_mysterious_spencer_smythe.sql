CREATE TYPE "public"."keaslian" AS ENUM('OEM', 'Aftermarket', 'KW');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('ongoing', 'selesai', 'dibatalkan');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'mekanik', 'admin');--> statement-breakpoint
CREATE TYPE "public"."tipe_kendaraan" AS ENUM('motor', 'mobil');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "bengkels" (
	"id" text PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"alamat" text NOT NULL,
	"lat" real NOT NULL,
	"lng" real NOT NULL,
	"jam_buka" text NOT NULL,
	"rating" real NOT NULL,
	"spesialisasi" jsonb NOT NULL,
	"foto" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forum_answers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"thread_id" text NOT NULL,
	"isi" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forum_threads" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"judul" text NOT NULL,
	"kategori" text NOT NULL,
	"deskripsi" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mekaniks" (
	"id" text PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"foto" text NOT NULL,
	"bengkel_id" text,
	"plat_kendaraan" text NOT NULL,
	"sertifikasi" jsonb NOT NULL,
	"rating" real NOT NULL,
	"jumlah_ulasan" integer NOT NULL,
	"jarak" integer NOT NULL,
	"spesialisasi" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"sparepart_id" text,
	"qty" integer NOT NULL,
	"harga_satuan" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"mekanik_id" text,
	"service_id" text,
	"status" "order_status" DEFAULT 'ongoing' NOT NULL,
	"total_harga" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"mekanik_id" text,
	"order_id" text,
	"rating_mekanik" integer NOT NULL,
	"rating_sparepart" integer,
	"tags" jsonb,
	"teks" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" text PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"deskripsi" text NOT NULL,
	"harga_jasa" integer NOT NULL,
	"estimasi_waktu" text NOT NULL,
	"ikon" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "spareparts" (
	"id" text PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"harga" integer NOT NULL,
	"foto" text NOT NULL,
	"keaslian" "keaslian" NOT NULL,
	"stok" integer NOT NULL,
	"spesifikasi" jsonb NOT NULL,
	"compatible_vehicle_ids" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"image" text,
	"role" "role" DEFAULT 'user' NOT NULL,
	"no_hp" text,
	"password" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" text PRIMARY KEY NOT NULL,
	"merek" text NOT NULL,
	"model" text NOT NULL,
	"tahun" jsonb NOT NULL,
	"tipe" "tipe_kendaraan" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forum_answers" ADD CONSTRAINT "forum_answers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forum_answers" ADD CONSTRAINT "forum_answers_thread_id_forum_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."forum_threads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forum_threads" ADD CONSTRAINT "forum_threads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mekaniks" ADD CONSTRAINT "mekaniks_bengkel_id_bengkels_id_fk" FOREIGN KEY ("bengkel_id") REFERENCES "public"."bengkels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_sparepart_id_spareparts_id_fk" FOREIGN KEY ("sparepart_id") REFERENCES "public"."spareparts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_mekanik_id_mekaniks_id_fk" FOREIGN KEY ("mekanik_id") REFERENCES "public"."mekaniks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_mekanik_id_mekaniks_id_fk" FOREIGN KEY ("mekanik_id") REFERENCES "public"."mekaniks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;