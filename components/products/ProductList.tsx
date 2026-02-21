'use client'
import { useQuery } from '@tanstack/react-query'

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lamps`,)

  return res.json()
}

export default function ProductsList() {
  const { data, isLoading } = useQuery({
    queryKey: ['lamps'], // stessa key del prefetch!
    queryFn: getProducts,
  })

console.log('data from ProductList:', data  )
  if (isLoading) return <p>Loading...</p>

  return (
    <ul>
   
    </ul>
  )
}