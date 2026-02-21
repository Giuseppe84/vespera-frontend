'use client'

import { useQuery } from '@tanstack/react-query'
import { getLampBySlug, lampsKeys } from '@/lib/queries/lamps'
import LampHero from './LampHero'
import LampTabs from './LampTabs'
import LampComponents from './LampComponents'
import LampElectrical from './LampElectrical'

export default function LampDetail({ slug }: { slug: string }) {
  const { data: lamp, isLoading, isError } = useQuery({
    queryKey: lampsKeys.detail(slug),
    queryFn: () => getLampBySlug(slug),
    staleTime: 1000 * 60,
  })

  if (isLoading) return <LampDetailSkeleton />
  if (isError || !lamp) return <p className="text-center py-20 text-red-500">Lampada non trovata.</p>

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
      <LampHero lamp={lamp} />
      <LampComponents components={lamp.components} />
      <LampElectrical parts={lamp.electricalParts} />
      <LampTabs lamp={lamp} />
    </div>
  )
}

function LampDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-gray-200 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-16 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}