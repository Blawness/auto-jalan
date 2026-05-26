# PRD: Auto Jalan — Prototype UI/UX

**Version:** 2.0  
**Date:** 2026-05-26  
**Author:** Yudha Hafiz (Vorca Studio)  
**Status:** Draft — Prototype / Sidang Ready  

---

## 1. Overview

### 1.1 Product Summary
Auto Jalan adalah aplikasi layanan kendaraan *on-demand* yang menghubungkan pengguna dengan montir/bengkel terdekat. Prototype ini adalah implementasi UI/UX interaktif berbasis Next.js 15 dengan dummy data statis — tanpa backend aktif. Tujuan utama: mendemonstrasikan seluruh user flow untuk keperluan sidang/presentasi prototype.

### 1.2 Goals
- Mengimplementasikan seluruh screen sesuai flowchart (±30 screen) dengan navigasi yang berfungsi
- Mendemonstrasikan 4 fitur utama: Cost Transparency, Sparepart Validation, Emergency Responsiveness, Digital Trust
- Semua data menggunakan mock JSON statis — tidak ada API call ke backend nyata
- Live tracking menggunakan simulasi animasi marker (Leaflet.js + setInterval), bukan GPS real

### 1.3 Non-Goals (Out of Scope untuk Prototype)
- Tidak ada backend/database aktif — semua data adalah mock JSON
- Tidak ada autentikasi nyata — register/login hanya UI flow, state disimpan di Zustand
- Tidak ada payment gateway — escrow adalah UI flow only
- Tidak ada in-app call/chat WebRTC — tombol ada, tapi non-functional
- Tidak ada Add-on Service approval flow (mekanik → user) — defer ke v2
- Tidak ada push notification nyata
- Tidak ada GPS device API — lokasi user di-hardcode ke titik dummy Jakarta

---

## 2. Users & Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `GuestUser` | Pengguna belum login | Akses onboarding, register, login screen |
| `AuthUser` | Pengguna sudah login (dummy session) | Akses semua screen: lobby, sparepart, panggil montir, SOS, forum, keranjang, riwayat, akun |
| `Mekanik` | Tidak ada role aktif di prototype | Profil mekanik hanya ditampilkan sebagai data statis |

---

## 3. Core Features (MVP)

### Feature 1: Onboarding & Auth Flow (UI Only)

**Description:**  
Pengguna membuka app → melihat onboarding splash (3 slide) → pilih Register atau Login → mengisi form → masuk ke Lobby. Tidak ada validasi backend — submit form langsung set `isAuthenticated: true` di Zustand store dan redirect ke `/lobby`.

**Acceptance Criteria:**
- [ ] Onboarding terdiri dari 3 slide dengan ilustrasi dan teks deskripsi fitur
- [ ] Halaman Register memiliki field: Nama, Email, No. HP, Password, Konfirmasi Password
- [ ] Halaman Login memiliki field: Email/No. HP, Password
- [ ] Submit form (dummy) → set Zustand `userStore.isAuthenticated = true` → redirect `/lobby`
- [ ] Lobby menampilkan nama user dari Zustand store

**Out of Scope:**  
Validasi email nyata, OTP, JWT, session persistence setelah refresh (boleh reset ke guest).

---

### Feature 2: Lobby / Home Screen

**Description:**  
Halaman utama setelah login. Menampilkan grid menu utama (Cari Sparepart, Panggil Montir, Cari Bengkel, SOS, Forum, About Us) + shortcut Keranjang dan Riwayat di navbar bawah. Floating SOS button selalu terlihat.

**Acceptance Criteria:**
- [ ] Grid menu 2x3 menampilkan: Cari Sparepart, Panggil Montir, Cari Bengkel, SOS, Forum, About Us
- [ ] Bottom navbar: Home, Keranjang, Riwayat, Akun
- [ ] Floating Action Button SOS berwarna merah/oranye di tengah bawah layar
- [ ] Tap FAB SOS → langsung navigasi ke `/sos/detail`
- [ ] Banner promo/informasi opsional di bagian atas

**Out of Scope:**  
Notifikasi real-time, geolocation prompt, personalisasi konten berdasarkan user history.

---

### Feature 3: Cari Sparepart

**Description:**  
User memilih kategori kendaraan (motor/mobil) → pilih merek & model → lihat list sparepart yang kompatibel dengan badge OEM/Aftermarket/KW dan status stok → buka detail produk → tambah ke keranjang.

**Acceptance Criteria:**
- [ ] Screen 1 (`/sparepart`): Filter dropdown Merek, Model, Tahun Kendaraan — semua opsi dari `mockVehicles.json`
- [ ] Screen 2 (`/sparepart/list`): Grid produk dengan badge keaslian di sudut kiri atas foto. Warna badge: hijau = OEM, biru = Aftermarket, abu-abu/kuning = KW
- [ ] Badge stok: "Tersedia" (hijau), "Sisa [n]" (amber), "Kosong" (merah/disabled)
- [ ] Screen 3 (`/sparepart/[id]`): Detail produk — foto, nama, harga, spesifikasi teknis, label keaslian, stok, tombol "Tambah ke Keranjang"
- [ ] Tambah ke keranjang → update `cartStore` di Zustand → tampilkan badge count di navbar

**Out of Scope:**  
Pencarian teks bebas, filter harga, sorting, wishlist, ulasan user (tampilan ulasan dummy ok).

---

### Feature 4: Panggil Montir

**Description:**  
User memilih jenis jasa (servis ringan, ganti oli, turun mesin, dll) → sistem menampilkan list montir tersedia dengan rating dan jarak → user pilih montir → lihat profil lengkap → lanjut ke proses pemesanan.

**Acceptance Criteria:**
- [ ] Screen 1 (`/montir`): List jenis jasa dari `mockServices.json`, tampil sebagai card/list
- [ ] Screen 2 (`/montir/list`): List montir dari `mockMekaniks.json` — tampilkan nama, foto, rating bintang, jarak (km, dummy), bengkel mitra
- [ ] Screen 3 (`/montir/[id]`): Profil montir — foto, nama lengkap, bengkel, plat kendaraan operasional, sertifikasi (jika ada), rating rata-rata, jumlah ulasan, tombol "Pilih Montir Ini"
- [ ] Tap "Pilih Montir Ini" → navigasi ke `/pemesanan/checkout` dengan data montir + jasa yang dipilih

**Out of Scope:**  
Filter berdasarkan lokasi real, algoritma matching, availability real-time mekanik.

---

### Feature 5: Cari Bengkel

**Description:**  
User memilih daerah/wilayah → sistem menampilkan peta (Leaflet.js) dengan marker bengkel mitra → user tap marker → lihat profil bengkel.

**Acceptance Criteria:**
- [ ] Screen 1 (`/bengkel`): Dropdown pilih daerah (Jakarta Selatan, Jakarta Utara, dll) dari `mockAreas.json`
- [ ] Screen 2 (`/bengkel/map`): Leaflet.js map dengan marker bengkel dari `mockBengkels.json`. Default center: Jakarta (-6.2088, 106.8456)
- [ ] Tap marker → popup card mini: nama bengkel, rating, jam buka
- [ ] Tap "Lihat Detail" di popup → navigasi ke `/bengkel/[id]`
- [ ] Screen 3 (`/bengkel/[id]`): Profil bengkel — nama, alamat, jam operasional, spesialisasi, rating, foto, list montir yang bertugas

**Out of Scope:**  
Geolocation GPS user nyata, routing navigasi ke bengkel, filter radius.

---

### Feature 6: SOS / Darurat

**Description:**  
User dalam kondisi darurat (mogok di jalan) → tap SOS → sistem auto-detect lokasi (dummy koordinat) → tampilkan info pesanan darurat → sistem "mencari" montir terdekat (animasi loading) → montir ditemukan → tampilkan live tracking.

**Acceptance Criteria:**
- [ ] Screen 1 (`/sos/detail`): Info darurat — lokasi terdeteksi (dummy alamat), estimasi biaya darurat, tombol "Panggil Montir Sekarang" berwarna merah
- [ ] Screen 2 (`/sos/mencari`): Animasi loading "Sedang mencari montir terdekat..." — setelah 3 detik auto-redirect ke `/sos/tracking`
- [ ] Screen 3 (`/sos/tracking`): Leaflet.js map — marker user (titik merah), marker montir (ikon motor) bergerak mendekati user via `setInterval` setiap 2 detik
- [ ] Floating card di atas peta: foto montir, nama, jarak (berkurang seiring animasi), ETA countdown
- [ ] Tombol "Chat" dan "Telepon" ada tapi non-functional (tampilkan toast "Fitur segera hadir")

**Out of Scope:**  
GPS real, WebSocket real-time, in-app call, WhatsApp integration.

---

### Feature 7: Proses Pemesanan & Cost Transparency

**Description:**  
Halaman checkout sebelum konfirmasi pesanan. Menampilkan breakdown harga 3 komponen dengan fixed-price guarantee. User harus scroll sampai bawah sebelum tombol "Pesan Sekarang" aktif.

**Acceptance Criteria:**
- [ ] Route: `/pemesanan/checkout`
- [ ] Card breakdown harga: Harga Suku Cadang, Biaya Jasa Mekanik, Biaya Kedatangan — masing-masing di baris terpisah
- [ ] Baris terakhir: Biaya Layanan Platform (5%) + Total Harga Akhir (bold, font besar)
- [ ] Ikon "?" di sebelah "Biaya Jasa Mekanik" → tap → `Tooltip` / `Popover` shadcn muncul dengan penjelasan
- [ ] Tombol "Pesan Sekarang" disabled secara default. Aktif setelah user scroll ke bawah card (deteksi via `IntersectionObserver` pada elemen terakhir)
- [ ] Konfirmasi pesanan → navigasi ke `/pemesanan/ongoing`

**Out of Scope:**  
Payment gateway, promo code, metode pembayaran multiple (cukup tampilkan pilihan dummy e-wallet).

---

### Feature 8: Dashboard Ongoing & Digital Trust

**Description:**  
Halaman pesanan yang sedang berjalan. Menampilkan profil mekanik yang ditugaskan, status escrow, dan slider button untuk konfirmasi selesai.

**Acceptance Criteria:**
- [ ] Route: `/pemesanan/ongoing`
- [ ] Card profil mekanik: foto beresolusi jelas, nama, bengkel, plat kendaraan, sertifikasi, rating bintang emas
- [ ] Status escrow: banner info "Dana Anda ditahan oleh Auto Jalan hingga service selesai"
- [ ] Slider button "Geser jika Service Selesai" — implementasi dengan `onMouseMove`/`onTouchMove`, tidak bisa diklik biasa
- [ ] Setelah slider selesai → muncul modal konfirmasi → konfirmasi → navigasi ke `/ulasan`
- [ ] Tombol "Ajukan Komplain" ada — tap → tampilkan modal info "Tim kami akan menghubungi Anda dalam 1x24 jam"

**Out of Scope:**  
Add-on service approval flow, real escrow logic, status update real-time dari mekanik.

---

### Feature 9: Rating & Review

**Description:**  
Setelah konfirmasi selesai, user diminta memberikan ulasan. Pop-up modal tidak bisa di-dismiss tanpa memberi rating atau tap "Nanti Saja".

**Acceptance Criteria:**
- [ ] Route: `/ulasan` atau modal di atas `/pemesanan/ongoing`
- [ ] Star rating 1–5 untuk Mekanik (interactive, highlight on hover/tap)
- [ ] Star rating 1–5 terpisah untuk Kualitas Suku Cadang (muncul hanya jika ada pembelian sparepart)
- [ ] Chip buttons pilihan cepat: [Montir Ramah], [Datang Tepat Waktu], [Pengerjaan Rapi], [Harga Sesuai]
- [ ] Textarea opsional untuk ulasan teks bebas
- [ ] Tombol "Nanti Saja" di pojok kiri bawah, ukuran kecil
- [ ] Submit → simpan ke `reviewStore` Zustand → redirect ke `/lobby`

**Out of Scope:**  
Kirim ulasan ke backend, moderasi konten, balasan dari mekanik.

---

### Feature 10: Forum

**Description:**  
Forum Q&A komunitas otomotif. User bisa lihat list pertanyaan, baca thread, dan ajukan pertanyaan baru.

**Acceptance Criteria:**
- [ ] Screen 1 (`/forum`): Dashboard forum — list thread dari `mockThreads.json` (judul, kategori, jumlah jawaban, waktu)
- [ ] Screen 2 (`/forum/[id]`): Halaman pertanyaan — pertanyaan + list jawaban dummy, tombol "Tulis Jawaban" (non-functional / tampilkan toast)
- [ ] Screen 3 (`/forum/ajukan`): Form ajukan pertanyaan — field Judul, Kategori (dropdown), Deskripsi, tombol Submit → simpan ke `forumStore` Zustand → redirect ke `/forum`

**Out of Scope:**  
Moderasi, upvote/downvote, notifikasi jawaban baru, rich text editor.

---

### Feature 11: Keranjang

**Description:**  
List sparepart yang ditambahkan user. User bisa ubah jumlah atau hapus item, lalu lanjut ke checkout.

**Acceptance Criteria:**
- [ ] Route: `/keranjang`
- [ ] List item dari `cartStore` Zustand — nama, foto, harga, quantity stepper (+/-)
- [ ] Hitung total otomatis
- [ ] Tombol hapus per item
- [ ] Keranjang kosong → tampilkan empty state dengan CTA "Cari Sparepart"
- [ ] Tombol "Checkout" → navigasi ke `/pemesanan/checkout`

**Out of Scope:**  
Promo code, estimasi ongkir, save for later.

---

### Feature 12: Riwayat & Akun

**Description:**  
Halaman riwayat pesanan (selesai + ongoing) dan profil akun user.

**Acceptance Criteria:**
- [ ] Route `/riwayat`: Tab "Ongoing" dan "Selesai" — list dari `orderStore` Zustand + `mockOrders.json`
- [ ] Tap pesanan ongoing → navigasi ke `/pemesanan/ongoing`
- [ ] Tap pesanan selesai → tampilkan detail ringkasan pesanan
- [ ] Route `/akun`: Foto profil (avatar dummy), nama, email, no HP, tombol logout (clear Zustand store → redirect `/login`)

**Out of Scope:**  
Edit profil, ganti password, verifikasi identitas, history pembayaran detail.

---

## 4. Tech Stack

> **Note for AI agents:** Gunakan teknologi berikut secara konsisten di seluruh project. Jangan tambah dependency baru tanpa konfirmasi.

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Runtime** | Node.js 20 LTS | |
| **Framework** | Next.js 15 App Router | Gunakan `app/` directory, bukan `pages/` |
| **Language** | TypeScript 5 | Strict mode ON |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Gunakan shadcn components sebisa mungkin sebelum custom |
| **State Management** | Zustand | Store: `userStore`, `cartStore`, `orderStore`, `forumStore`, `reviewStore` |
| **Maps** | Leaflet.js + react-leaflet | Untuk Cari Bengkel & SOS Live Tracking |
| **Database** | Tidak ada (prototype) | Semua data dari `lib/mock/*.json` |
| **ORM** | Tidak ada (prototype) | |
| **Auth** | Tidak ada (prototype) | Dummy auth via Zustand `userStore.isAuthenticated` |
| **API Style** | Tidak ada (prototype) | Tidak perlu `app/api/` routes — semua data lokal |
| **Animation** | Framer Motion (opsional) | Untuk transisi screen dan animasi onboarding |
| **Package Manager** | pnpm | |
| **Deployment** | Vercel | |

---

## 5. Data Models (Mock JSON Schema)

```typescript
// lib/mock/vehicles.json
type MockVehicle = {
  id: string;
  merek: string;          // "Honda", "Toyota", "Yamaha"
  model: string;          // "Civic FD", "Avanza", "NMAX"
  tahun: number[];        // [2018, 2019, 2020, 2021]
  tipe: "motor" | "mobil";
};

// lib/mock/spareparts.json
type MockSparepart = {
  id: string;
  nama: string;
  harga: number;
  foto: string;           // path ke /public/images/spareparts/
  keaslian: "OEM" | "Aftermarket" | "KW";
  stok: number;           // 0 = kosong, 1-3 = hampir habis, >3 = tersedia
  spesifikasi: Record<string, string>;
  compatibleVehicleIds: string[];
};

// lib/mock/mekaniks.json
type MockMekanik = {
  id: string;
  nama: string;
  foto: string;
  bengkel: string;
  platKendaraan: string;
  sertifikasi: string[];
  rating: number;         // 1.0 - 5.0
  jumlahUlasan: number;
  jarak: number;          // km, dummy
  spesialisasi: string[];
};

// lib/mock/bengkels.json
type MockBengkel = {
  id: string;
  nama: string;
  alamat: string;
  lat: number;
  lng: number;
  jamBuka: string;        // "08:00 - 17:00"
  rating: number;
  spesialisasi: string[];
  mekanikIds: string[];
};

// lib/mock/services.json
type MockService = {
  id: string;
  nama: string;           // "Ganti Oli", "Servis Ringan", "Turun Mesin"
  deskripsi: string;
  hargaJasa: number;
  estimasiWaktu: string;  // "30 menit", "2 jam"
  ikon: string;           // nama icon Lucide
};

// lib/mock/threads.json
type MockThread = {
  id: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  penulis: string;
  waktu: string;          // ISO string
  jumlahJawaban: number;
  jawaban: MockJawaban[];
};

type MockJawaban = {
  id: string;
  penulis: string;
  isi: string;
  waktu: string;
};

// lib/mock/orders.json
type MockOrder = {
  id: string;
  mekanikId: string;
  serviceId: string;
  sparepartIds: string[];
  totalHarga: number;
  status: "ongoing" | "selesai" | "dibatalkan";
  tanggal: string;
};

// Zustand Stores (tidak perlu di-mock, ini runtime state)
type UserStore = {
  isAuthenticated: boolean;
  nama: string;
  email: string;
  noHP: string;
  foto: string;
};

type CartStore = {
  items: { sparepartId: string; qty: number }[];
};

type OrderStore = {
  activeOrder: MockOrder | null;
  history: MockOrder[];
};
```

---

## 6. Route Map

| Screen | Route | File | Notes |
|--------|-------|------|-------|
| Onboarding | `/` | `app/page.tsx` | Redirect ke `/lobby` jika sudah auth |
| Register | `/register` | `app/register/page.tsx` | |
| Login | `/login` | `app/login/page.tsx` | |
| Lobby | `/lobby` | `app/lobby/page.tsx` | Protected — redirect ke `/` jika belum auth |
| Cari Sparepart | `/sparepart` | `app/sparepart/page.tsx` | Filter kendaraan |
| List Sparepart | `/sparepart/list` | `app/sparepart/list/page.tsx` | Query params: merek, model, tahun |
| Detail Sparepart | `/sparepart/[id]` | `app/sparepart/[id]/page.tsx` | |
| Panggil Montir | `/montir` | `app/montir/page.tsx` | List jasa |
| List Montir | `/montir/list` | `app/montir/list/page.tsx` | Query params: serviceId |
| Profil Montir | `/montir/[id]` | `app/montir/[id]/page.tsx` | |
| Cari Bengkel | `/bengkel` | `app/bengkel/page.tsx` | Pilih daerah |
| Map Bengkel | `/bengkel/map` | `app/bengkel/map/page.tsx` | Leaflet map |
| Profil Bengkel | `/bengkel/[id]` | `app/bengkel/[id]/page.tsx` | |
| SOS Detail | `/sos` | `app/sos/page.tsx` | |
| SOS Mencari | `/sos/mencari` | `app/sos/mencari/page.tsx` | Auto-redirect 3 detik |
| SOS Tracking | `/sos/tracking` | `app/sos/tracking/page.tsx` | Leaflet + simulasi |
| Checkout | `/pemesanan/checkout` | `app/pemesanan/checkout/page.tsx` | Cost breakdown |
| Ongoing | `/pemesanan/ongoing` | `app/pemesanan/ongoing/page.tsx` | Slider button |
| Ulasan | `/ulasan` | `app/ulasan/page.tsx` | Rating modal |
| Forum | `/forum` | `app/forum/page.tsx` | |
| Thread | `/forum/[id]` | `app/forum/[id]/page.tsx` | |
| Ajukan Pertanyaan | `/forum/ajukan` | `app/forum/ajukan/page.tsx` | |
| Keranjang | `/keranjang` | `app/keranjang/page.tsx` | |
| Riwayat | `/riwayat` | `app/riwayat/page.tsx` | Tab ongoing + selesai |
| Akun | `/akun` | `app/akun/page.tsx` | |
| About Us | `/about` | `app/about/page.tsx` | |

---

## 7. Project Structure

```
auto-jalan/
├── app/
│   ├── page.tsx                  # Onboarding
│   ├── layout.tsx                # Root layout + bottom navbar
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── lobby/page.tsx
│   ├── sparepart/
│   │   ├── page.tsx
│   │   ├── list/page.tsx
│   │   └── [id]/page.tsx
│   ├── montir/
│   │   ├── page.tsx
│   │   ├── list/page.tsx
│   │   └── [id]/page.tsx
│   ├── bengkel/
│   │   ├── page.tsx
│   │   ├── map/page.tsx
│   │   └── [id]/page.tsx
│   ├── sos/
│   │   ├── page.tsx
│   │   ├── mencari/page.tsx
│   │   └── tracking/page.tsx
│   ├── pemesanan/
│   │   ├── checkout/page.tsx
│   │   └── ongoing/page.tsx
│   ├── ulasan/page.tsx
│   ├── forum/
│   │   ├── page.tsx
│   │   ├── ajukan/page.tsx
│   │   └── [id]/page.tsx
│   ├── keranjang/page.tsx
│   ├── riwayat/page.tsx
│   ├── akun/page.tsx
│   └── about/page.tsx
├── components/
│   ├── ui/                       # shadcn/ui primitives (auto-generated)
│   ├── layout/
│   │   ├── BottomNavbar.tsx
│   │   ├── TopBar.tsx
│   │   └── SOSFab.tsx            # Floating Action Button SOS
│   ├── sparepart/
│   │   ├── SparepartCard.tsx     # Card produk + badge OEM/KW
│   │   ├── KeaslianBadge.tsx     # Badge OEM / Aftermarket / KW
│   │   └── StokBadge.tsx        # Badge stok tersedia/hampir habis/kosong
│   ├── mekanik/
│   │   ├── MekanikCard.tsx       # Card list montir
│   │   └── MekanikProfile.tsx    # Profil lengkap mekanik
│   ├── pemesanan/
│   │   ├── HargaBreakdown.tsx    # Cost transparency card
│   │   ├── SliderButton.tsx      # Geser jika service selesai
│   │   └── EscrowBanner.tsx      # Banner status dana ditahan
│   ├── tracking/
│   │   ├── TrackingMap.tsx       # Leaflet map wrapper
│   │   └── MekanikFloatingCard.tsx
│   ├── forum/
│   │   └── ThreadCard.tsx
│   └── rating/
│       ├── StarRating.tsx        # Interactive star rating
│       └── ChipButton.tsx        # Chip pilihan cepat
├── lib/
│   ├── mock/
│   │   ├── vehicles.json
│   │   ├── spareparts.json
│   │   ├── mekaniks.json
│   │   ├── bengkels.json
│   │   ├── services.json
│   │   ├── threads.json
│   │   └── orders.json
│   └── utils.ts                  # Helper functions (formatRupiah, dll)
├── stores/
│   ├── userStore.ts              # Zustand: auth state
│   ├── cartStore.ts              # Zustand: keranjang
│   ├── orderStore.ts             # Zustand: pesanan aktif + history
│   ├── forumStore.ts             # Zustand: thread baru dari user
│   └── reviewStore.ts            # Zustand: ulasan yang disubmit
├── types/
│   └── index.ts                  # Semua TypeScript types (MockVehicle, MockMekanik, dll)
├── public/
│   └── images/
│       ├── spareparts/
│       ├── mekaniks/
│       └── bengkels/
├── hooks/
│   ├── useScrolledToBottom.ts    # Deteksi IntersectionObserver untuk checkout
│   └── useSimulateTracking.ts    # setInterval animasi marker SOS
├── components.json               # shadcn/ui config
├── tailwind.config.ts
├── next.config.ts
└── pnpm-lock.yaml
```

---

## 8. Environment Variables

```env
# Prototype — tidak ada env yang wajib untuk run lokal
# Jika deploy ke Vercel, tidak perlu env tambahan

# Opsional: untuk Leaflet tile provider custom
NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

---

## 9. Shared Component Conventions

> **Note for AI agents:** Ikuti konvensi ini agar component konsisten di seluruh codebase.

- **Warna primer app:** Biru (`blue-600`) atau sesuaikan ke satu warna konsisten di `tailwind.config.ts`
- **Warna SOS/darurat:** `red-500` / `orange-500`
- **Badge OEM:** `bg-green-100 text-green-800`
- **Badge Aftermarket:** `bg-blue-100 text-blue-800`
- **Badge KW:** `bg-gray-100 text-gray-600` atau `bg-yellow-100 text-yellow-800`
- **Rating bintang:** warna `yellow-400` (emas)
- **Format harga:** selalu gunakan `formatRupiah(number)` dari `lib/utils.ts` — output: `Rp 150.000`
- **Layout mobile-first:** max-width container `max-w-md mx-auto` — prototype ini mensimulasikan tampilan mobile di browser desktop
- **Bottom navbar height:** 64px — semua halaman harus punya `pb-16` agar konten tidak tertutup navbar

---

## 10. Success Metrics (Prototype)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Semua route dapat diakses tanpa error | 100% | Manual QA semua route |
| Full user flow: onboarding → pesan montir → selesai → ulasan | Bisa diselesaikan tanpa bug | Manual walkthrough |
| SOS flow → live tracking animasi berjalan | Marker bergerak smooth | Visual check |
| Cost breakdown muncul & scroll-to-unlock berfungsi | Tombol aktif setelah scroll | Manual QA |
| Slider button tidak bisa diklik biasa | Harus digeser | Manual QA |
| Build produksi tanpa TypeScript error | 0 error | `pnpm build` |

---

## 11. Open Questions

- [ ] Warna primer app: biru atau warna lain? Konfirmasi ke client sebelum mulai styling
- [ ] Apakah Forum masuk MVP atau bisa di-defer? (menambah ±4 screen)
- [ ] Foto dummy: pakai placeholder (via picsum.photos) atau client menyediakan aset?
- [ ] Apakah perlu dark mode? (tidak ada di PRD awal)
- [ ] Deadline prototype: kapan sidang/presentasi?

---

*Generated by prd-generator skill — optimized for AI agentic coding tools.*  
*Auto Jalan Prototype × Vorca Studio × Yudha Hafiz — 2026*