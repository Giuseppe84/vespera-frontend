"use client"

import { useQuery } from "@tanstack/react-query"

export function useCurrentUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch("/api/proxy-me", { credentials: "include" })
      //if (!res.ok) throw new Error("Not authenticated")
      return res.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minuti
  })
}