'use client'

import Image from 'next/image'
import { LampDetail } from '@/types/lamp'
import { useState } from 'react'

export default function LampHero({ lamp }: { lamp: LampDetail }) {
  const images = lamp.media.filter((m) => m.type === 'image')
  const [activeImg, setActiveImg] = useState(0)

  const coverImage = images[activeImg]

  // Calcola prezzo totale dai componenti (base + modificatori colore default)
  const totalPrice = lamp.components.reduce((acc, slot) => {
    const defaultColor = slot.component.availableColors.find((c) => c.isDefault)
    const modifier = defaultColor ? parseFloat(defaultColor.priceModifier) : 0
    return acc + parseFloat(slot.component.unitCost) + modifier
  }, parseFloat(lamp.basePrice))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Galleria */}
      <div className="space-y-3">
        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.altText ?? lamp.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Nessuna immagine
            </div>
          )}

          {/* Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {lamp.isFeatured && (
              <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                In evidenza
              </span>
            )}
            {lamp.isConfigurable && (
              <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                Configurabile
              </span>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveImg(i)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === activeImg ? 'border-black' : 'border-transparent'
                }`}
              >
                <Image src={img.url} alt={img.altText ?? ''} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-5">
        {/* Categoria + SKU */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{lamp.category.name}</span>
          <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{lamp.sku}</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">{lamp.name}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">{lamp.shortDescription}</p>

        {/* Tag */}
        <div className="flex flex-wrap gap-2">
          {lamp.tags.map(({ tag }) => (
            <span key={tag.id} className="text-xs bg-gray-100 border px-3 py-1 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>

        {/* Prezzo */}
        <div className="border-t pt-5">
          <p className="text-sm text-gray-400 mb-1">Prezzo base</p>
          <p className="text-4xl font-bold">€{totalPrice.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">
            Include {lamp.components.length} componenti stampati in 3D
          </p>
        </div>

        {/* Specifiche rapide */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400">Peso</p>
            <p className="font-semibold">{lamp.weight} kg</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400">Recensioni</p>
            <p className="font-semibold">{lamp._count.reviews || 'Nessuna ancora'}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400">Componenti</p>
            <p className="font-semibold">{lamp.components.length}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400">Parti elettriche</p>
            <p className="font-semibold">{lamp.electricalParts.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}