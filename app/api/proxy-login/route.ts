// app/api/proxy-login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include", // ❗ necessario per cookie
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // Prendi i cookie dall’header della risposta del backend
  const cookies = res.headers.get("set-cookie");

  const response = NextResponse.json(data);
  if (cookies) {
    // ⚠️ NextResponse non supporta array di cookie in una volta sola
    // Se ce ne sono più di uno, splitta e imposta singolarmente
    cookies.split(",").forEach((c) => response.headers.append("Set-Cookie", c));
  }

  return response;
}