import { LampElectricalSlot } from '@/types/lamp'

export default function LampElectrical({ parts }: { parts: LampElectricalSlot[] }) {
  if (!parts.length) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Componentistica elettrica</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {parts.map((slot) => {
          const { part } = slot
          return (
            <div key={slot.id} className="border rounded-2xl p-5 space-y-4 bg-white">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-400 font-mono mb-1">{part.sku}</p>
                  <h3 className="font-semibold">{part.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{part.description}</p>
                </div>
                <span className="text-lg font-bold text-nowrap">€{part.unitCost}</span>
              </div>

              {/* Specifiche tecniche */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                {part.voltage && (
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400">Tensione</p>
                    <p className="font-medium">{part.voltage}V</p>
                  </div>
                )}
                {part.wattage && (
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400">Potenza max</p>
                    <p className="font-medium">{part.wattage}W</p>
                  </div>
                )}
                {part.cableLength && (
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400">Lunghezza cavo</p>
                    <p className="font-medium">{part.cableLength}m</p>
                  </div>
                )}
                {part.lightSourceType && (
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400">Tipo sorgente</p>
                    <p className="font-medium">{part.lightSourceType.replace('_', ' ')}</p>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="flex gap-2 flex-wrap">
                {part.hasSwitch && (
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full">
                    Interruttore
                  </span>
                )}
                {part.hasDimmer && (
                  <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full">
                    Dimmer
                  </span>
                )}
                {slot.isOptional && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    Opzionale
                  </span>
                )}
                <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">
                  {part.stockQty} disponibili
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}