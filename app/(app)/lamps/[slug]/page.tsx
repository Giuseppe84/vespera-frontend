import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getLampBySlug, lampsKeys } from '@/lib/queries/lamps'
import LampDetail from '@/components/lamps/detail/LampDetail'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>  // ← Promise, non oggetto diretto
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params  // ← await
  
  try {
    const lamp = await getLampBySlug(slug)
    return {
      title: lamp.metaTitle ?? lamp.name,
      description: lamp.metaDescription ?? lamp.shortDescription,
    }
  } catch {
    return { title: 'Lampada non trovata' }
  }
}

export default async function LampDetailPage({ params }: PageProps) {
  const { slug } = await params  // ← await
  const queryClient = new QueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: lampsKeys.detail(slug),
      queryFn: () => getLampBySlug(slug),
    })
  } catch {
    notFound()
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LampDetail slug={slug} />
    </HydrationBoundary>
  )
}