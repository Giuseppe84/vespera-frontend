"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LampMedia {
  url: string
  altText?: string
}

interface LampTag {
  tag: {
    name: string
  }
}

interface Lamp {
  id: string
  name: string
  slug: string
  shortDescription: string
  basePrice: string
  media: LampMedia[]
  tags: LampTag[]
}

interface LampsResponse {
  data: Lamp[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1/"

export default function PublicLampsPage() {
  const [lamps, setLamps] = useState<Lamp[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [search, setSearch] = useState("")
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [priceMin, setPriceMin] = useState<number | null>(null)
  const [priceMax, setPriceMax] = useState<number | null>(null)
  const [isFeatured, setIsFeatured] = useState<boolean | null>(null)
  const [isConfigurable, setIsConfigurable] = useState<boolean | null>(null)
  const [sortBy, setSortBy] = useState<string>("name")

  const fetchLamps = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("page", page.toString())
      params.append("limit", limit.toString())
      if (search) params.append("search", search)
      if (categoryId) params.append("categoryId", categoryId)
      if (priceMin !== null) params.append("priceMin", priceMin.toString())
      if (priceMax !== null) params.append("priceMax", priceMax.toString())
      if (isFeatured !== null) params.append("isFeatured", isFeatured.toString())
      if (isConfigurable !== null) params.append("isConfigurable", isConfigurable.toString())
      if (sortBy) params.append("sortBy", sortBy)

      const res = await fetch(`${apiUrl}/lamps?${params.toString()}`)
      if (!res.ok) throw new Error("Errore nel caricamento delle lampade")
      const json: LampsResponse = await res.json()
      setLamps(json.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLamps()
  }, [page, limit, search, categoryId, priceMin, priceMax, isFeatured, isConfigurable, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Le nostre Lampade</h1>

      {/* FILTRI */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Cerca lampada..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />

        <Select onValueChange={setSortBy} value={sortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ordina per" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="priceAsc">Prezzo ↑</SelectItem>
            <SelectItem value="priceDesc">Prezzo ↓</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setIsFeatured(v === "true" ? true : v === "false" ? false : null)} value={isFeatured?.toString() || ""}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tutti</SelectItem>
            <SelectItem value="true">Solo Featured</SelectItem>
            <SelectItem value="false">Non Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* CARDS */}
      {loading ? (
        <p className="text-center mt-8">Caricamento lampade...</p>
      ) : error ? (
        <p className="text-center mt-8 text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lamps.map((lamp) => (
            <Card key={lamp.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{lamp.name}</CardTitle>
              </CardHeader>

              {lamp.media[0]?.url && (
                <div className="relative h-64 w-full">
                  <Image
                    src={lamp.media[0].url}
                    alt={lamp.media[0].altText || lamp.name}
                    fill
                    className="object-cover rounded-t-md"
                  />
                </div>
              )}

              <CardContent className="space-y-2">
                <p>{lamp.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {lamp.tags.map((t, idx) => (
                    <Badge key={idx}>{t.tag.name}</Badge>
                  ))}
                </div>
                <p className="font-semibold mt-2">€{lamp.basePrice}</p>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => alert(`Vai alla lampada ${lamp.name}`)}
                >
                  Visualizza
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* PAGINAZIONE */}
      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Indietro
        </Button>
        <span className="flex items-center">Pagina {page}</span>
        <Button onClick={() => setPage((p) => p + 1)} disabled={lamps.length < limit}>
          Avanti
        </Button>
      </div>
    </div>
  )
}