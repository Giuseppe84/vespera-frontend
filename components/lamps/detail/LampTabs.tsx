'use client'

import { useState } from 'react'
import { LampDetail } from '@/types/lamp'

const TABS = ['Descrizione', 'Specifiche', 'Recensioni'] as const
type Tab = typeof TABS[number]

export default function LampTabs({ lamp }: { lamp: LampDetail }) {
  const [active, setActive] = useState<Tab>('Descrizione')

  return (
    <section>
      {/* Tab bar */}
      <div className="flex border-b mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              active === tab
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab}
            {tab === 'Recensioni' && (
              <span className="ml-1.5 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                {lamp._count.reviews}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Descrizione */}
      {active === 'Descrizione' && (
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
            {lamp.description}
          </p>
        </div>
      )}

      {/* Specifiche */}
      {active === 'Specifiche' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {[
            { label: 'SKU', value: lamp.sku },
            { label: 'Peso', value: `${lamp.weight} kg` },
            { label: 'Categoria', value: lamp.category.name },
            { label: 'Configurabile', value: lamp.isConfigurable ? 'Sì' : 'No' },
            {
              label: 'Totale componenti',
              value: `${lamp.components.length} parti stampate in 3D`,
            },
            {
              label: 'Tempo di stampa totale',
              value: `${lamp.components.reduce((acc, s) => acc + s.component.printTime, 0)}h`,
            },
            {
              label: 'Filamento totale',
              value: `${lamp.components.reduce((acc, s) => acc + s.component.filamentGrams, 0)}g`,
            },
            {
              label: 'Materiali',
              value: [...new Set(lamp.components.map((s) => s.component.material))].join(', '),
            },
            { label: 'Aggiornato', value: new Date(lamp.updatedAt).toLocaleDateString('it-IT') },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between border-b py-3">
              <span className="text-gray-400">{label}</span>
              <span className="font-medium text-right">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Recensioni */}
      {active === 'Recensioni' && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">💬</p>
          <p className="font-medium">Nessuna recensione ancora</p>
          <p className="text-sm mt-1">Sii il primo ad acquistare e recensire questa lampada.</p>
        </div>
      )}
    </section>
  )
}