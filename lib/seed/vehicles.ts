// Motor: 18 brands, Mobil: 35 brands
// Model representatif buat pasar Indonesia
let id = 0
const vid = () => `v${++id}`

export const seedVehicles = [
  // ========== MOTOR ==========
  // Honda
  { id: vid(), merek: "Honda", model: "Vario 125", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Honda", model: "Beat", tahun: [2019, 2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Honda", model: "Scoopy", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Honda", model: "PCX 160", tahun: [2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Honda", model: "CBR150R", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Honda", model: "CRF150L", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Honda", model: "CB150R", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Honda", model: "Supra X 125", tahun: [2015, 2016, 2017, 2018, 2019, 2020], tipe: "motor" as const },

  // Yamaha
  { id: vid(), merek: "Yamaha", model: "NMAX", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Yamaha", model: "Aerox 155", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Yamaha", model: "Mio M3", tahun: [2019, 2020, 2021, 2022], tipe: "motor" as const },
  { id: vid(), merek: "Yamaha", model: "Lexi 125", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Yamaha", model: "R15", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Yamaha", model: "MT-15", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Yamaha", model: "XMAX 250", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },

  // Suzuki
  { id: vid(), merek: "Suzuki", model: "Satria F150", tahun: [2018, 2019, 2020, 2021], tipe: "motor" as const },
  { id: vid(), merek: "Suzuki", model: "GSX-R150", tahun: [2019, 2020, 2021, 2022], tipe: "motor" as const },
  { id: vid(), merek: "Suzuki", model: "Address", tahun: [2018, 2019, 2020, 2021], tipe: "motor" as const },
  { id: vid(), merek: "Suzuki", model: "Nex II", tahun: [2019, 2020, 2021, 2022], tipe: "motor" as const },
  { id: vid(), merek: "Suzuki", model: "Smash", tahun: [2010, 2011, 2012, 2013, 2014], tipe: "motor" as const },

  // Kawasaki
  { id: vid(), merek: "Kawasaki", model: "Ninja 250", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "motor" as const },
  { id: vid(), merek: "Kawasaki", model: "KLX 150", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Kawasaki", model: "Z250", tahun: [2019, 2020, 2021, 2022], tipe: "motor" as const },
  { id: vid(), merek: "Kawasaki", model: "W175", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Kawasaki", model: "Ninja ZX-25R", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },

  // QJMotor
  { id: vid(), merek: "QJMotor", model: "SRK 250", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "QJMotor", model: "VRC 250", tahun: [2021, 2022, 2023], tipe: "motor" as const },

  // CFMoto
  { id: vid(), merek: "CFMoto", model: "250SR", tahun: [2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "CFMoto", model: "450SR", tahun: [2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "CFMoto", model: "650MT", tahun: [2019, 2020, 2021, 2022], tipe: "motor" as const },

  // Vespa
  { id: vid(), merek: "Vespa", model: "Primavera 150", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Vespa", model: "Sprint 150", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Vespa", model: "GTS 300", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },

  // Benelli
  { id: vid(), merek: "Benelli", model: "Leoncino 250", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Benelli", model: "TRK 502", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },

  // Harley Davidson
  { id: vid(), merek: "Harley Davidson", model: "Sportster S", tahun: [2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Harley Davidson", model: "Street 750", tahun: [2015, 2016, 2017, 2018, 2019], tipe: "motor" as const },

  // Ducati
  { id: vid(), merek: "Ducati", model: "Monster", tahun: [2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Ducati", model: "Panigale V4", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Ducati", model: "Scrambler", tahun: [2019, 2020, 2021, 2022], tipe: "motor" as const },

  // TVS
  { id: vid(), merek: "TVS", model: "Apache RTR 160", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "TVS", model: "Ntorq 125", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },

  // BMW Motor
  { id: vid(), merek: "BMW", model: "GS 310", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "BMW", model: "GS 1250", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "BMW", model: "R18", tahun: [2021, 2022, 2023], tipe: "motor" as const },

  // Royal Enfield
  { id: vid(), merek: "Royal Enfield", model: "Classic 350", tahun: [2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Royal Enfield", model: "Himalayan", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Royal Enfield", model: "Interceptor 650", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },

  // Bajaj
  { id: vid(), merek: "Bajaj", model: "Pulsar 200", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Bajaj", model: "Dominar 400", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },

  // Aprilia
  { id: vid(), merek: "Aprilia", model: "RSV4", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Aprilia", model: "Tuono 660", tahun: [2021, 2022, 2023], tipe: "motor" as const },

  // Cleveland CycleWerks
  { id: vid(), merek: "Cleveland CycleWerks", model: "Misfit", tahun: [2018, 2019, 2020], tipe: "motor" as const },
  { id: vid(), merek: "Cleveland CycleWerks", model: "Ace", tahun: [2018, 2019, 2020], tipe: "motor" as const },

  // Viar
  { id: vid(), merek: "Viar", model: "Cross X 200", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "Viar", model: "Vortex 150", tahun: [2020, 2021, 2022], tipe: "motor" as const },

  // U-Winfly
  { id: vid(), merek: "U-Winfly", model: "T-3", tahun: [2020, 2021, 2022, 2023], tipe: "motor" as const },
  { id: vid(), merek: "U-Winfly", model: "U1", tahun: [2021, 2022, 2023], tipe: "motor" as const },

  // ========== MOBIL ==========
  // Toyota
  { id: vid(), merek: "Toyota", model: "Avanza", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Toyota", model: "Innova", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Toyota", model: "Fortuner", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Toyota", model: "Yaris", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Toyota", model: "Rush", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Toyota", model: "Agya", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Toyota", model: "Corolla Cross", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Toyota", model: "Camry", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // Honda (mobil)
  { id: vid(), merek: "Honda", model: "Civic FD", tahun: [2006, 2007, 2008, 2009, 2010], tipe: "mobil" as const },
  { id: vid(), merek: "Honda", model: "Jazz", tahun: [2018, 2019, 2020, 2021], tipe: "mobil" as const },
  { id: vid(), merek: "Honda", model: "Brio", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Honda", model: "HR-V", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Honda", model: "CR-V", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Honda", model: "City", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Honda", model: "Mobilio", tahun: [2018, 2019, 2020, 2021], tipe: "mobil" as const },

  // Daihatsu
  { id: vid(), merek: "Daihatsu", model: "Xenia", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Daihatsu", model: "Terios", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Daihatsu", model: "Ayla", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Daihatsu", model: "Sigra", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Daihatsu", model: "Rocky", tahun: [2021, 2022, 2023], tipe: "mobil" as const },

  // Suzuki (mobil)
  { id: vid(), merek: "Suzuki", model: "Ertiga", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Suzuki", model: "XL7", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Suzuki", model: "Carry", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Suzuki", model: "Ignis", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // Mitsubishi
  { id: vid(), merek: "Mitsubishi", model: "Xpander", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Mitsubishi", model: "Pajero Sport", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Mitsubishi", model: "L300", tahun: [2010, 2011, 2012, 2013, 2014], tipe: "mobil" as const },
  { id: vid(), merek: "Mitsubishi", model: "Colt", tahun: [2010, 2011, 2012, 2013], tipe: "mobil" as const },

  // Nissan
  { id: vid(), merek: "Nissan", model: "Livina", tahun: [2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Nissan", model: "Kicks", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Nissan", model: "Terra", tahun: [2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // Mazda
  { id: vid(), merek: "Mazda", model: "CX-5", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Mazda", model: "Mazda 2", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Mazda", model: "Mazda 3", tahun: [2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Mazda", model: "CX-3", tahun: [2018, 2019, 2020, 2021], tipe: "mobil" as const },

  // Lexus
  { id: vid(), merek: "Lexus", model: "RX 300", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Lexus", model: "LM 350", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // Subaru
  { id: vid(), merek: "Subaru", model: "Forester", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Subaru", model: "XV", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Subaru", model: "BRZ", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // Hyundai
  { id: vid(), merek: "Hyundai", model: "Creta", tahun: [2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Hyundai", model: "Palisade", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Hyundai", model: "Ioniq 5", tahun: [2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Hyundai", model: "Stargazer", tahun: [2022, 2023], tipe: "mobil" as const },

  // KIA
  { id: vid(), merek: "KIA", model: "Seltos", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "KIA", model: "Carnival", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "KIA", model: "Sonet", tahun: [2021, 2022, 2023], tipe: "mobil" as const },

  // Datsun
  { id: vid(), merek: "Datsun", model: "Go", tahun: [2018, 2019, 2020], tipe: "mobil" as const },
  { id: vid(), merek: "Datsun", model: "Go+", tahun: [2018, 2019, 2020], tipe: "mobil" as const },
  { id: vid(), merek: "Datsun", model: "Cross", tahun: [2018, 2019, 2020], tipe: "mobil" as const },

  // BMW (mobil)
  { id: vid(), merek: "BMW", model: "320i", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "BMW", model: "X1", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "BMW", model: "X5", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "BMW", model: "520i", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // Mercedes Benz
  { id: vid(), merek: "Mercedes Benz", model: "C200", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Mercedes Benz", model: "E200", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Mercedes Benz", model: "GLC300", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // Audi
  { id: vid(), merek: "Audi", model: "A4", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Audi", model: "Q3", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Audi", model: "Q7", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // Volkswagen
  { id: vid(), merek: "Volkswagen", model: "Tiguan", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Volkswagen", model: "Golf", tahun: [2018, 2019, 2020, 2021], tipe: "mobil" as const },
  { id: vid(), merek: "Volkswagen", model: "Polo", tahun: [2018, 2019, 2020, 2021], tipe: "mobil" as const },

  // Porsche
  { id: vid(), merek: "Porsche", model: "Cayenne", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Porsche", model: "911", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Porsche", model: "Macan", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // Volvo
  { id: vid(), merek: "Volvo", model: "XC40", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Volvo", model: "XC60", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Volvo", model: "XC90", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // Renault
  { id: vid(), merek: "Renault", model: "Kwid", tahun: [2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Renault", model: "Kiger", tahun: [2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Renault", model: "Duster", tahun: [2018, 2019, 2020, 2021], tipe: "mobil" as const },

  // Citroen
  { id: vid(), merek: "Citroen", model: "C3", tahun: [2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Citroen", model: "C5 Aircross", tahun: [2021, 2022, 2023], tipe: "mobil" as const },

  // Peugeot
  { id: vid(), merek: "Peugeot", model: "3008", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Peugeot", model: "5008", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // Land Rover
  { id: vid(), merek: "Land Rover", model: "Defender", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Land Rover", model: "Range Rover Evoque", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Land Rover", model: "Discovery Sport", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // Mini
  { id: vid(), merek: "Mini", model: "Cooper S", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Mini", model: "Countryman", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // Ford
  { id: vid(), merek: "Ford", model: "Everest", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Ford", model: "Ranger", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // Tesla
  { id: vid(), merek: "Tesla", model: "Model 3", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Tesla", model: "Model Y", tahun: [2021, 2022, 2023], tipe: "mobil" as const },

  // Chevrolet
  { id: vid(), merek: "Chevrolet", model: "Trax", tahun: [2018, 2019, 2020], tipe: "mobil" as const },
  { id: vid(), merek: "Chevrolet", model: "Spark", tahun: [2018, 2019, 2020], tipe: "mobil" as const },
  { id: vid(), merek: "Chevrolet", model: "Trailblazer", tahun: [2018, 2019, 2020], tipe: "mobil" as const },

  // Jeep
  { id: vid(), merek: "Jeep", model: "Wrangler", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Jeep", model: "Compass", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Jeep", model: "Cherokee", tahun: [2018, 2019, 2020, 2021], tipe: "mobil" as const },

  // Wuling
  { id: vid(), merek: "Wuling", model: "Confero", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Wuling", model: "Air EV", tahun: [2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Wuling", model: "Almaz", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // Chery
  { id: vid(), merek: "Chery", model: "Tiggo 8 Pro", tahun: [2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Chery", model: "Omoda 5", tahun: [2022, 2023], tipe: "mobil" as const },

  // BYD
  { id: vid(), merek: "BYD", model: "Seal", tahun: [2023], tipe: "mobil" as const },
  { id: vid(), merek: "BYD", model: "Atto 3", tahun: [2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "BYD", model: "Dolphin", tahun: [2023], tipe: "mobil" as const },
  { id: vid(), merek: "BYD", model: "M6", tahun: [2023], tipe: "mobil" as const },

  // DFSK
  { id: vid(), merek: "DFSK", model: "Glory 560", tahun: [2018, 2019, 2020, 2021], tipe: "mobil" as const },
  { id: vid(), merek: "DFSK", model: "Gelora E", tahun: [2022, 2023], tipe: "mobil" as const },

  // Great Wall Motor (GWM)
  { id: vid(), merek: "Great Wall Motor (GWM)", model: "Haval H6", tahun: [2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Great Wall Motor (GWM)", model: "Ora 03", tahun: [2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Great Wall Motor (GWM)", model: "Tank 300", tahun: [2022, 2023], tipe: "mobil" as const },

  // Geely
  { id: vid(), merek: "Geely", model: "Coolray", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Geely", model: "Emgrand", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // AION
  { id: vid(), merek: "AION", model: "Y Plus", tahun: [2023], tipe: "mobil" as const },
  { id: vid(), merek: "AION", model: "ES", tahun: [2023], tipe: "mobil" as const },

  // Vinfast
  { id: vid(), merek: "Vinfast", model: "VF e34", tahun: [2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Vinfast", model: "VF 5", tahun: [2023], tipe: "mobil" as const },

  // MG
  { id: vid(), merek: "MG", model: "ZS", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "MG", model: "HS", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "MG", model: "4 EV", tahun: [2022, 2023], tipe: "mobil" as const },

  // Tata Motors
  { id: vid(), merek: "Tata Motors", model: "Tiago", tahun: [2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Tata Motors", model: "Nexon", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // Proton
  { id: vid(), merek: "Proton", model: "X50", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Proton", model: "X70", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Proton", model: "Saga", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // Ferrari
  { id: vid(), merek: "Ferrari", model: "488 GTB", tahun: [2018, 2019, 2020, 2021], tipe: "mobil" as const },
  { id: vid(), merek: "Ferrari", model: "F8 Tributo", tahun: [2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Ferrari", model: "SF90 Stradale", tahun: [2020, 2021, 2022, 2023], tipe: "mobil" as const },

  // Lamborghini
  { id: vid(), merek: "Lamborghini", model: "Huracan", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "Lamborghini", model: "Urus", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Lamborghini", model: "Aventador", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },

  // McLaren
  { id: vid(), merek: "McLaren", model: "720S", tahun: [2018, 2019, 2020, 2021, 2022], tipe: "mobil" as const },
  { id: vid(), merek: "McLaren", model: "GT", tahun: [2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "McLaren", model: "Artura", tahun: [2022, 2023], tipe: "mobil" as const },

  // Rolls Royce
  { id: vid(), merek: "Rolls Royce", model: "Phantom", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Rolls Royce", model: "Ghost", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
  { id: vid(), merek: "Rolls Royce", model: "Cullinan", tahun: [2018, 2019, 2020, 2021, 2022, 2023], tipe: "mobil" as const },
]
