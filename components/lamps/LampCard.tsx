'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Lamp } from '@/types/lamp'

interface Props {
  lamp: Lamp
}

export default function LampCard({ lamp }: Props) {
  const coverImage = lamp.media?.[0]
console.log(lamp);
  return (
    <Link href={`/lamps/${lamp.slug}`} className="group block">
      <div className="rounded-xl overflow-hidden border hover:shadow-lg transition-shadow">
        
        {/* Immagine */}
        <div className="relative aspect-square bg-gray-100">
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt ?? lamp.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}

          {/* Badge varianti */}
          {lamp.isConfigurable && (
            <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
              Configurabile
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{lamp.category.name}</p>
          <h3 className="font-semibold text-lg">{lamp.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{lamp.shortDescription}</p>

          {/* Tag */}
          <div className="flex gap-1 flex-wrap mt-3">
            {lamp.tags.map(({ tag }) => (
              <span key={tag.id} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {tag.name}
              </span>
            ))}
          </div>

          {/* Prezzo + varianti */}
          <div className="flex items-center justify-between mt-4">
            <span className="font-bold text-xl">
              {lamp.variants.length > 0 
                ? `da €${lamp.basePrice}`
                : `€${lamp.basePrice}`
              }
            </span>
            {lamp.variants.length > 0 && (
              <span className="text-xs text-gray-500">
                {lamp.variants.length} varianti
              </span>
            )}
          </div>

          {/* Recensioni */}
          {lamp._count.reviews > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              {lamp._count.reviews} recensioni
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}