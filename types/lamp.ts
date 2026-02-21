export interface Tag {
  id: string
  name: string
  slug: string
}

export interface LampTag {
  lampId: string
  tagId: string
  tag: Tag
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface MediaItem {
  id: string
  url: string
  alt?: string
}

export interface Variant {
  id: string
  name: string
  price?: string
  // aggiungi i tuoi campi
}

export interface Lamp {
  id: string
  name: string
  slug: string
  sku: string
  shortDescription: string
  description: string
  basePrice: string
  weight: number
  isActive: boolean
  isConfigurable: boolean
  isFeatured: boolean
  categoryId: string
  category: Category
  tags: LampTag[]
  variants: Variant[]
  media: MediaItem[]
  metaTitle: string | null
  metaDescription: string | null
  createdAt: string
  updatedAt: string
  _count: { reviews: number }
}

export interface LampsMeta {
  total: number
  totalPages: number
  page: number
  limit: number
}

export interface LampsResponse {
  data: Lamp[]      // era: lamps: Lamp[]
  meta: LampsMeta
}

export interface LampsFilters {
  page?: number
  limit?: number
  category?: string   // slug
  tag?: string        // slug
  search?: string
}

export interface ComponentColor {
  id: string
  componentId: string
  name: string
  colorHex: string
  priceModifier: string
  isDefault: boolean
}

export interface LampComponent {
  id: string
  name: string
  slug: string
  description: string
  category: 'SHADE' | 'BASE' | 'STEM' | string
  material: string
  colorHex: string
  modelFileUrl: string
  thumbnailUrl: string
  printTime: number
  filamentGrams: number
  unitCost: string
  isActive: boolean
  availableColors: ComponentColor[]
}

export interface LampComponentSlot {
  id: string
  lampId: string
  componentId: string
  quantity: number
  isOptional: boolean
  isSwappable: boolean
  sortOrder: number
  positionLabel: string
  component: LampComponent
}

export interface ElectricalPart {
  id: string
  name: string
  slug: string
  description: string
  sku: string
  lightSourceType: string
  voltage: number
  wattage: number
  colorTemperature: number | null
  lumens: number | null
  cri: number | null
  lifespan: number | null
  cableLength: number
  hasSwitch: boolean
  hasDimmer: boolean
  unitCost: string
  stockQty: number
  thumbnailUrl: string | null
  isActive: boolean
}

export interface LampElectricalSlot {
  id: string
  lampId: string
  partId: string
  quantity: number
  isOptional: boolean
  isSwappable: boolean
  part: ElectricalPart
}

// Estendi Lamp con i nuovi campi
export interface LampDetail extends Lamp {
  components: LampComponentSlot[]
  electricalParts: LampElectricalSlot[]
  attributes: unknown[]
  reviews: unknown[]
}