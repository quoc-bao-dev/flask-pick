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
  layout?: 'vertical' | 'horizontal'
}

export const PriceRangeFilter = ({
  title,
  value: priceRange,
  onChange: setPriceRange,
  min = 0,
  max = 10_000_000,
  step = 1000,
  layout = 'vertical',
}: PriceRangeFilterProps) => {
  const isHorizontal = layout === 'horizontal'

  return (
    <section>
      <SectionTitle title={title} />
      <div className={`space-y-4 pt-2 ${isHorizontal ? 'px-3' : ''}`}>
        <RangeInput min={min} max={max} step={step} value={priceRange} onChange={setPriceRange} />
        <div className={isHorizontal ? 'flex items-center' : ''}>
          <div className={isHorizontal ? 'flex-1 min-w-0' : ''}>
            <PriceDisplayInput
              value={priceRange[0]}
              placeholder='Tối thiểu'
              step={step}
              onChange={(val) => {
                const numeric = val === '' ? 0 : Number(val)
                setPriceRange([Math.min(numeric, priceRange[1]), priceRange[1]])
              }}
            />
          </div>

          {isHorizontal ? (
            <div className='w-5 shrink-0 border-t-2 border-dashed border-(--color-border-1)'></div>
          ) : (
            <div className='ml-5 border-l-2 border-dashed border-(--color-border-1) h-4'></div>
          )}

          <div className={isHorizontal ? 'flex-1 min-w-0' : ''}>
            <PriceDisplayInput
              value={priceRange[1]}
              placeholder='Tối đa'
              step={step}
              onChange={(val) => {
                const numeric = val === '' ? 0 : Number(val)
                setPriceRange([priceRange[0], Math.min(numeric, max)])
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

