import { Suspense } from "react"
import { BottomNavbar } from "@/components/layout/BottomNavbar"

async function AuthLayoutInner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-gray-50 pb-[62px]">
      {children}
      <BottomNavbar />
    </div>
  )
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div className="mx-auto min-h-screen max-w-md bg-gray-50" />}>
      <AuthLayoutInner>{children}</AuthLayoutInner>
    </Suspense>
  )
}
