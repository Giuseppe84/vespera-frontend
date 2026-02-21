import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getLamps } from '@/lib/queries/lamps'
import { lampsKeys } from '@/lib/queries/lamps'
import LampsList from '@/components/lamps/LampList'
import { LampsFilters } from '@/types/lamp'

interface PageProps {
  searchParams: { 
    category?: string
    tag?: string
    page?: string
    search?: string
  }
}

export default async function LampsPage({ searchParams }: PageProps) {
  const queryClient = new QueryClient()

  const filters: LampsFilters = {
    page:     searchParams.page ? Number(searchParams.page) : 1,
    limit:    12,
    category: searchParams.category,
    tag:      searchParams.tag,
    search:   searchParams.search,
  }

  // Prefetch: i dati arrivano già idratati al client, zero loading iniziale
  await queryClient.prefetchQuery({
    queryKey: lampsKeys.list(filters),
    queryFn:  () => getLamps(filters),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Le nostre Lampade</h1>
        <LampsList initialFilters={filters} />
      </div>
    </HydrationBoundary>
  )
}