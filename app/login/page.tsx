"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldError,
} from "@/components/ui/field"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

// ✅ Schema di validazione
const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "Minimo 6 caratteri"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // ✅ Funzione submit
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Credenziali non valide")

      const result = await res.json()

      // salva token
      localStorage.setItem("accessToken", result.accessToken)

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Vespera Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLegend>Email</FieldLegend>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...register("email")}
                />
                {errors.email && <FieldError>{errors.email.message}</FieldError>}
              </Field>

              {/* Password */}
              <Field>
                <FieldLegend>Password</FieldLegend>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && <FieldError>{errors.password.message}</FieldError>}
              </Field>

              {/* Error globale */}
              {error && (
                <p className="text-sm text-red-600 text-center mt-2">{error}</p>
              )}

              {/* Bottone */}
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}