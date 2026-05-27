import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = ["/", "/login", "/register"]

const browseRoutes = [
  "/lobby",
  "/sparepart",
  "/montir",
  "/bengkel",
  "/forum",
]

function isBrowseRoute(pathname: string): boolean {
  if (pathname.startsWith("/forum/ajukan")) return false
  return browseRoutes.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  )
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  const isLoggedIn = !!token

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
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
}
