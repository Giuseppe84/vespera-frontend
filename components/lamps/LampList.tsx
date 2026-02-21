'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { getLamps, lampsKeys } from '@/lib/queries/lamps'
import { LampsFilters } from '@/types/lamp'
import LampCard from './LampCard'
import LampsFiltersBar from './LampFilters'

interface LampsListProps {
  initialFilters: LampsFilters
}

export default function LampsList({ initialFilters }: LampsListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<LampsFilters>(initialFilters)

  // I dati sono già in cache grazie al prefetch → nessun loading al primo render
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: lampsKeys.list(filters),
    queryFn: () => getLamps(filters),
    staleTime: 1000 * 60, // 1 minuto
  })

  console.log(data)
  // Aggiorna i filtri e l'URL in modo sincrono
  const updateFilters = (newFilters: Partial<LampsFilters>) => {
    const updated = { ...filters, ...newFilters, page: 1 }
    setFilters(updated)

    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updated).forEach(([key, val]) => {
      if (val) params.set(key, String(val))
      else params.delete(key)
    })
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  if (isError) return <p className="text-red-500">Errore nel caricamento.</p>

  return (
    <div>
      <LampsFiltersBar filters={filters} onChange={updateFilters} />

      {/* Overlay sottile durante refetch (cambio filtri) */}
      <div className={`relative transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.data.map((lamp) => (
                <LampCard key={lamp.id} lamp={lamp} />
              ))}
            </div>

            {/* Paginazione */}
            {data && data.meta.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: data.meta.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => updateFilters({ page: p })}
                    className={`px-4 py-2 rounded-lg border ${p === filters.page
                      ? 'bg-black text-white'
                      : 'bg-white hover:bg-gray-100'
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}