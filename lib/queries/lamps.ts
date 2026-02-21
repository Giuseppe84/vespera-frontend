import { LampsFilters, LampsResponse, Lamp } from '@/types/lamp'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Costruisce la queryKey in modo consistente (usata sia nel prefetch che nel client)
export const lampsKeys = {
  all: ['lamps'] as const,
  list: (filters: LampsFilters) => ['lamps', 'list', filters] as const,
  detail: (slug: string) => ['lamps', 'detail', slug] as const,
}

export async function getLamps(filters: LampsFilters = {}): Promise<LampsResponse> {
  const params = new URLSearchParams()
  if (filters.page)     params.set('page', String(filters.page))
  if (filters.limit)    params.set('limit', String(filters.limit))
  if (filters.category) params.set('category', filters.category)
  if (filters.tag)      params.set('tag', filters.tag)
  if (filters.search)   params.set('search', filters.search)

  const res = await fetch(`${BASE_URL}/lamps?${params.toString()}`, {
    next: { revalidate: 60 }, // ISR: cache 60 secondi
  })

  console.log('fetching lamps with filters:', filters, 'response status:', res.status, 'response:', res)
  if (!res.ok) throw new Error('Errore nel caricamento delle lampade')
  return res.json()
}

export async function getLampBySlug(slug: string): Promise<Lamp> {
  const res = await fetch(`${BASE_URL}/lamps/${slug}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Lampada non trovata')
  return res.json()
}