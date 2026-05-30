import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const publicRoutes = ["/", "/login", "/register"]

const browseRoutes = [
  "/lobby",
  "/sparepart",
  "/montir",
  "/bengkel",
  "/forum",
  "/about",
]

function isBrowseRoute(pathname: string): boolean {
  if (pathname.startsWith("/forum/ajukan")) return false
  return browseRoutes.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  )
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  if (publicRoutes.includes(pathname)) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/lobby", req.url))
    }
    return NextResponse.next()
  }

  if (isBrowseRoute(pathname)) {
    return NextResponse.next()
  }

  if (!isLoggedIn && !pathname.startsWith("/api")) {
    const loginUrl = new URL("/login", req.url)
    if (pathname !== "/" && pathname !== "/login") {
      loginUrl.searchParams.set("callbackUrl", pathname)
    }
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
}
