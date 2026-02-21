// app/api/proxy-me/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // Leggi i cookie dalla request
  const cookieHeader = req.headers.get("cookie") || ""

  // Proxy verso backend NestJS
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader, // ❗ Passa i cookie HttpOnly al backend
    },
  })
  console.log("Proxy /api/proxy-me - backend response:", res.status) // Debug
  if (!res.ok) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}