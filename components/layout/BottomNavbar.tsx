"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Siren, Clock, User } from "lucide-react"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/stores/cartStore"

const navItems = [
  { href: "/lobby", label: "Home", icon: Home, guestBlocked: false },
  { href: "/keranjang", label: "Keranjang", icon: ShoppingCart, guestBlocked: true },
  { href: "/riwayat", label: "Riwayat", icon: Clock, guestBlocked: true },
  { href: "/akun", label: "Akun", icon: User, guestBlocked: true },
]

export function BottomNavbar() {
  const pathname = usePathname()
  const { status } = useSession()
  const isGuest = status === "unauthenticated"
  const itemCount = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0))

  function navHref(href: string, guestBlocked: boolean) {
    if (isGuest && guestBlocked) {
      return `/login?callbackUrl=${encodeURIComponent(href)}`
    }
    return href
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t bg-white">
      <div className="flex h-[62px] items-center justify-evenly px-1">
        {navItems.slice(0, 2).map(({ href, label, icon: Icon, guestBlocked }) => {
          const active = pathname === href || (href !== "/lobby" && pathname.startsWith(href + "/"))
          return (
            <Link
              key={href}
              href={navHref(href, guestBlocked)}
              className={`flex flex-col items-center gap-[3px] rounded-xl px-[10px] py-[6px] text-[10px] font-semibold ${
                active ? "bg-blue-50 text-blue-600" : "text-gray-500"
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

        <Link
          href="/sos"
          aria-label="Darurat SOS"
          className="-mt-[20px] flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-full border-[3px] border-[#f4f6f9] bg-red-500"
        >
          <Siren className="h-[18px] w-[18px] text-white" />
        </Link>

        {navItems.slice(2).map(({ href, label, icon: Icon, guestBlocked }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={navHref(href, guestBlocked)}
              className={`flex flex-col items-center gap-[3px] rounded-xl px-[10px] py-[6px] text-[10px] font-semibold ${
                active ? "bg-blue-50 text-blue-600" : "text-gray-500"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
