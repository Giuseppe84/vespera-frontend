import { LampComponentSlot } from '@/types/lamp'
import Image from 'next/image'

const CATEGORY_LABEL: Record<string, string> = {
  SHADE: 'Paralume',
  BASE: 'Base',
  STEM: 'Asta',
}

export default function LampComponents({ components }: { components: LampComponentSlot[] }) {
  if (!components.length) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Componenti stampati in 3D</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {components
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((slot) => {
            const { component } = slot
            const defaultColor = component.availableColors.find((c) => c.isDefault)

            return (
              <div key={slot.id} className="border rounded-2xl p-5 space-y-4 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono uppercase tracking-wide">
                    {CATEGORY_LABEL[component.category] ?? component.category}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    {component.material}
                  </span>
                </div>

                {/* Thumbnail */}
                {component.thumbnailUrl && (
                  <div className="relative h-32 bg-gray-50 rounded-xl overflow-hidden">
                    <Image
                      src={component.thumbnailUrl}
                      alt={component.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{slot.positionLabel}</p>
                  <h3 className="font-semibold">{component.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{component.description}</p>
                </div>

                {/* Colori disponibili */}
                {component.availableColors.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Colori disponibili</p>
                    <div className="flex gap-2 flex-wrap">
                      {component.availableColors.map((color) => (
                        <div
                          key={color.id}
                          title={`${color.name}${parseFloat(color.priceModifier) > 0 ? ` (+€${color.priceModifier})` : ''}`}
                          className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 cursor-default ${
                            color.isDefault ? 'border-black scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.colorHex }}
                        />
                      ))}
                    </div>
                    {defaultColor && (
                      <p className="text-xs text-gray-400 mt-1">Default: {defaultColor.name}</p>
                    )}
                  </div>
                )}

                {/* Footer stats */}
                <div className="flex justify-between text-xs text-gray-400 border-t pt-3">
                  <span>⏱ {component.printTime}h stampa</span>
                  <span>🧵 {component.filamentGrams}g filamento</span>
                  <span className="font-semibold text-gray-700">€{component.unitCost}</span>
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}