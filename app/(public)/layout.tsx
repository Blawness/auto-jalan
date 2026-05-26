export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-white">
      {children}
    </div>
  )
}
