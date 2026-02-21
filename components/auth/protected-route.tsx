
import { useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { cookies } from "next/headers"


interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Controlla JWT nel localStorage
     const token = cookies().get("token")?.value

    if (!token) {
      router.replace("/login") // redirect automatico
    } else {
      // Qui puoi aggiungere validazione token lato client
      setAuthenticated(true)
    }

    setLoading(false)
  }, [router])

  if (loading) return <div>Loading...</div>

  if (!authenticated) return null

  return <>{children}</>
}