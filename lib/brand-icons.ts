import {
  AudiIcon, BMWIcon, BYDIcon, ChevroletIcon, FerrariIcon, FordIcon,
  HondaIcon, HyundaiIcon, JeepIcon, KiaIcon, LamborghiniIcon, LandroverIcon,
  LexusIcon, MazdaIcon, MclarenIcon, MBIcon, MiniIcon, MitsubishiIcon,
  NissanIcon, PorscheIcon, RollsRoyceIcon, SubaruIcon, TeslaIcon, ToyotaIcon,
  VinfastIcon, VolkswagenIcon, VolvoIcon,
} from "@cardog-icons/react"
import type { ComponentType } from "react"

export type BrandIconProps = { size?: number; className?: string }

export const brandIconMap: Record<string, ComponentType<BrandIconProps>> = {
  "Audi": AudiIcon,
  "BMW": BMWIcon,
  "BYD": BYDIcon,
  "Chevrolet": ChevroletIcon,
  "Ferrari": FerrariIcon,
  "Ford": FordIcon,
  "Honda": HondaIcon,
  "Hyundai": HyundaiIcon,
  "Jeep": JeepIcon,
  "KIA": KiaIcon,
  "Lamborghini": LamborghiniIcon,
  "Land Rover": LandroverIcon,
  "Lexus": LexusIcon,
  "Mazda": MazdaIcon,
  "McLaren": MclarenIcon,
  "Mercedes Benz": MBIcon,
  "Mini": MiniIcon,
  "Mitsubishi": MitsubishiIcon,
  "Nissan": NissanIcon,
  "Porsche": PorscheIcon,
  "Rolls Royce": RollsRoyceIcon,
  "Subaru": SubaruIcon,
  "Tesla": TeslaIcon,
  "Toyota": ToyotaIcon,
  "Vinfast": VinfastIcon,
  "Volkswagen": VolkswagenIcon,
  "Volvo": VolvoIcon,
}
