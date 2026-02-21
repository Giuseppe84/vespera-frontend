'use client'

import { LampsFilters } from '@/types/lamp'

// Puoi renderli dinamici fetchando le categorie/tag, o passarli come prop
const CATEGORIES = [
  { label: 'Tutte', slug: '' },
  { label: 'Lampade da Tavolo', slug: 'lampade-da-tavolo' },
  // aggiungi le tue...
]

const TAGS = [
  { label: 'Tutti', slug: '' },
  { label: 'Artigianale', slug: 'artigianale' },
  { label: 'Industrial', slug: 'industrial' },
]

interface Props {
  filters: LampsFilters
  onChange: (filters: Partial<LampsFilters>) => void
}

export default function LampsFiltersBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {/* Ricerca */}
      <input
        type="text"
        placeholder="Cerca lampade..."
        defaultValue={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
        className="border rounded-lg px-4 py-2 flex-1 min-w-[200px]"
      />

      {/* Categorie */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onChange({ category: cat.slug || undefined })}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              filters.category === cat.slug || (!filters.category && !cat.slug)
                ? 'bg-black text-white border-black'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tag */}
      <div className="flex gap-2 flex-wrap">
        {TAGS.map((tag) => (
          <button
            key={tag.slug}
            onClick={() => onChange({ tag: tag.slug || undefined })}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              filters.tag === tag.slug || (!filters.tag && !tag.slug)
                ? 'bg-black text-white border-black'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  )
}