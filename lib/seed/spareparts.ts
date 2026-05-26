export const seedSpareparts = [
  {
    id: "sp1",
    nama: "Kampas Rem Depan",
    harga: 85000,
    foto: "/images/spareparts/sp1.jpg",
    keaslian: "OEM" as const,
    stok: 15,
    spesifikasi: { material: "Semi-metallic", posisi: "Depan" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: ["v1", "v2", "v3", "v4", "v5"] as string[],
  },
  {
    id: "sp2",
    nama: "Oli Mesin 10W-40",
    harga: 65000,
    foto: "/images/spareparts/sp2.jpg",
    keaslian: "OEM" as const,
    stok: 30,
    spesifikasi: { viskositas: "10W-40", volume: "1L" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: ["v1", "v2", "v3", "v4", "v5"] as string[],
  },
  {
    id: "sp3",
    nama: "Aki Kering 12V",
    harga: 350000,
    foto: "/images/spareparts/sp3.jpg",
    keaslian: "Aftermarket" as const,
    stok: 8,
    spesifikasi: { tegangan: "12V", kapasitas: "5Ah" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: ["v1", "v2", "v3", "v4", "v5"] as string[],
  },
  {
    id: "sp4",
    nama: "Filter Udara",
    harga: 55000,
    foto: "/images/spareparts/sp4.jpg",
    keaslian: "OEM" as const,
    stok: 25,
    spesifikasi: { material: "Kertas lipat", tipe: "Standar" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: [
      "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10",
    ] as string[],
  },
  {
    id: "sp5",
    nama: "Busi Iridium",
    harga: 120000,
    foto: "/images/spareparts/sp5.jpg",
    keaslian: "OEM" as const,
    stok: 20,
    spesifikasi: { tipe: "Iridium", celah: "0.8mm" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: [
      "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v9", "v10",
    ] as string[],
  },
  {
    id: "sp6",
    nama: "Kampas Kopling Set",
    harga: 250000,
    foto: "/images/spareparts/sp6.jpg",
    keaslian: "Aftermarket" as const,
    stok: 3,
    spesifikasi: { jumlah: "4 pcs", material: "Kevlar" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: ["v1", "v2", "v3", "v4", "v5"] as string[],
  },
  {
    id: "sp7",
    nama: "Shockbreaker Belakang",
    harga: 180000,
    foto: "/images/spareparts/sp7.jpg",
    keaslian: "KW" as const,
    stok: 12,
    spesifikasi: { tipe: "Twin shock", panjang: "320mm" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: ["v1", "v2", "v5"] as string[],
  },
  {
    id: "sp8",
    nama: "Filter Oli",
    harga: 45000,
    foto: "/images/spareparts/sp8.jpg",
    keaslian: "OEM" as const,
    stok: 40,
    spesifikasi: { material: "Kertas", diameter: "65mm" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: [
      "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10",
    ] as string[],
  },
  {
    id: "sp9",
    nama: "Rantai Motor 428H",
    harga: 95000,
    foto: "/images/spareparts/sp9.jpg",
    keaslian: "Aftermarket" as const,
    stok: 0,
    spesifikasi: { ukuran: "428H", panjang: "118 mata" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: ["v1", "v2", "v3", "v4", "v5"] as string[],
  },
  {
    id: "sp10",
    nama: "Lampu Depan LED",
    harga: 220000,
    foto: "/images/spareparts/sp10.jpg",
    keaslian: "Aftermarket" as const,
    stok: 6,
    spesifikasi: { watt: "25W", warna: "Putih 6000K" } as Record<
      string,
      string
    >,
    compatibleVehicleIds: [
      "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10",
    ] as string[],
  },
]
