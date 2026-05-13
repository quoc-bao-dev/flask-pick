'use client'

import { useMemo } from 'react'
import FilterChip from '@/components/common/FilterChip'
import { usePricePresetQuery } from '@/services/price-preset'
import { useFilterProductStore } from '../store/filterProductStore'

const MAX_PRICE = 10_000_000

/**
 * Props for the FlashSaleDeals component
 */
interface FlashSaleDealsProps {
  variant?: 'mobile' | 'desktop'
}

/**
 * FlashSaleDeals component
 * Responsibility: Display and allow selection of different price-based deals for flash sales.
 * Supports both mobile and desktop layouts through the 'variant' prop.
 *
 * @param {string} variant - 'mobile' or 'desktop' to adjust layout and styling.
 * @returns {JSX.Element} The rendered component
 */
const FlashSaleDeals = ({ variant = 'mobile' }: FlashSaleDealsProps) => {
  // --- Hooks ---
  const { activeDeal, setActiveDeal, setPriceRange } = useFilterProductStore()
  const { data: presetData } = usePricePresetQuery()

  // Build deal options from API data with a leading "Tất cả" tab
  const dealOptions = useMemo(() => {
    const allTab = { code: 'all', label: 'Tất cả', minPrice: 0, maxPrice: MAX_PRICE }

    if (!presetData?.data?.length) return [allTab]

    const apiTabs = presetData.data.map((p) => ({
      code: p.code,
      label: p.label,
      minPrice: p.minPrice,
      maxPrice: p.maxPrice ?? MAX_PRICE,
    }))

    return [allTab, ...apiTabs]
  }, [presetData])

  // --- Handlers ---
  const handleDealChange = (code: string) => {
    setActiveDeal(code)

    const selected = dealOptions.find((o) => o.code === code)
    if (selected) {
      setPriceRange([selected.minPrice, selected.maxPrice])
    }
  }

  // Common Button Rendering
  const renderButtons = () => {
    return dealOptions.map((option) => {
      const isActive = option.code === activeDeal

      return (
        <FilterChip
          key={option.code}
          label={option.label}
          isActive={isActive}
          onClick={() => handleDealChange(option.code)}
          variant={variant}
        />
      )
    })
  }

  // --- Render Layouts ---

  // Desktop Component
  if (variant === 'desktop') {
    return (
      <div className='flex items-center gap-3' aria-label='Flash Sale Deals (Desktop)'>
        <span className='text-[16px] font-medium text-(--color-gray-2) uppercase'>DEAL</span>
        <div className='flex items-center gap-3'>{renderButtons()}</div>
      </div>
    )
  }

  // Mobile Component (matches original layout exactly)
  return (
    <nav className='pt-2 lg:hidden' aria-label='Flash Sale Deals'>
      <div className='flex items-center gap-3 text-[16px] font-medium text-(--color-gray-2)'>
        {/* Label */}
        <span className='uppercase text-[16px]'>DEAL</span>

        {/* Scrollable Container */}
        <div className='flex-1 min-w-0'>
          <div className='flex w-max items-center gap-3 scrollbar-hide max-w-full overflow-x-auto pb-1'>
            {renderButtons()}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default FlashSaleDeals
