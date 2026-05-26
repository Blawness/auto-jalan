"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Clock, User } from "lucide-react"
import { useCartStore } from "@/stores/cartStore"

const links = [
  { href: "/lobby", label: "Home", icon: Home },
  { href: "/keranjang", label: "Keranjang", icon: ShoppingCart },
  { href: "/riwayat", label: "Riwayat", icon: Clock },
  { href: "/akun", label: "Akun", icon: User },
]

export function BottomNavbar() {
  const pathname = usePathname()
  const itemCount = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0))

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white h-16">
      <div className="mx-auto flex h-full max-w-md items-center justify-around px-4">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 text-xs ${
                active ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {href === "/keranjang" && itemCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {itemCount}
                  </span>
                )}
              </div>
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
