

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">


      <main className="flex-1 p-8 bg-muted/40 min-h-screen">
        {children}
      </main>
    </div>
  )
}