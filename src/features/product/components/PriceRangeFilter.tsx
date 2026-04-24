'use client'

import RangeInput from '@/components/ui/RangeInput'
import { SectionTitle, PriceDisplayInput } from '@/components/common/FilterSection'

interface PriceRangeFilterProps {
  title: string
  value: [number, number]
  onChange: (value: [number, number]) => void
  min?: number
  max?: number
  step?: number
}

export const PriceRangeFilter = ({
  title,
  value: priceRange,
  onChange: setPriceRange,
  min = 0,
  max = 10000000,
  step = 1000,
}: PriceRangeFilterProps) => {
  return (
    <section>
      <SectionTitle title={title} />
      <div className='space-y-4 pt-2'>
        <RangeInput min={min} max={max} step={step} value={priceRange} onChange={setPriceRange} />
        <div className=''>
          <PriceDisplayInput
            value={priceRange[0]}
            placeholder='Tối thiểu'
            onChange={(val) => {
              const numeric = val === '' ? 0 : Number(val)
              setPriceRange([Math.min(numeric, priceRange[1]), priceRange[1]])
            }}
          />
          <div className='ml-5 border-l-2 border-dashed border-(--color-border-1) h-4'></div>
          <PriceDisplayInput
            value={priceRange[1]}
            placeholder='Tối đa'
            onChange={(val) => {
              const numeric = val === '' ? 0 : Number(val)
              setPriceRange([priceRange[0], Math.min(numeric, max)])
            }}
          />
        </div>
      </div>
    </section>
  )
}

