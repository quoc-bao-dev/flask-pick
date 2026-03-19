'use client'

import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { FilterIcon } from '@/components/icons/FilterIcon'
import { useUiProductStore } from '../store/uiProductStore'

/**
 * MobileFilterTriggers component
 * Responsibility: Display filter trigger buttons for mobile layout.
 * 
 * @returns {JSX.Element} The rendered component
 */
const MobileFilterTriggers = () => {
  // --- Hooks ---
  const { setIsFilterOpen, setIsDiscountFilterOpen, setIsTypeFilterOpen } = useUiProductStore()

  // --- Handlers ---
  const handleOpenMainFilter = () => {
    setIsFilterOpen(true)
  }

  const handleOpenDiscountFilter = () => {
    setIsDiscountFilterOpen(true)
  }

  const handleOpenTypeFilter = () => {
    setIsTypeFilterOpen(true)
  }

  return (
    <div className='pt-2 lg:hidden' aria-label='Mobile filters'>
      <div className='flex items-center gap-3'>
        {/* Main Filter Icon */}
        <div className='min-w-[24px]' aria-hidden='true'>
          <FilterIcon />
        </div>

        {/* Scrollable Filter Buttons */}
        <div className='flex-1 min-w-0 flex items-center gap-3 overflow-x-auto scrollbar-hide'>
          {/* Price Filter */}
          <button
            type='button'
            onClick={handleOpenMainFilter}
            className='flex items-center gap-2 rounded-lg bg-(--color-surface-50) px-4 py-2 text-[16px] font-semibold text-(--color-gray-2) whitespace-nowrap'
            aria-label='Filter by price'
            title='Lọc theo giá'
          >
            <span>Giá</span>
            <ArrowUpIcon size={16} />
          </button>

          {/* Category Filter */}
          <button
            type='button'
            onClick={handleOpenMainFilter}
            className='flex items-center gap-2 rounded-lg bg-(--color-surface-50) px-4 py-2 text-[16px] font-semibold text-(--color-gray-2) whitespace-nowrap'
            aria-label='Filter by category'
            title='Lọc theo danh mục'
          >
            <span className='truncate'>Danh mục</span>
            <ChevronDownIcon size={16} />
          </button>

          {/* Discount Percent Filter */}
          <button
            type='button'
            onClick={handleOpenDiscountFilter}
            className='flex items-center gap-2 rounded-lg bg-(--color-surface-50) px-4 py-2 text-[16px] font-semibold text-(--color-gray-2) whitespace-nowrap'
            aria-label='Filter by discount percent'
            title='Lọc theo % giảm giá'
          >
            <span className='truncate'>% giảm giá</span>
            <ChevronDownIcon size={16} />
          </button>

          {/* Type Filter */}
          <button
            type='button'
            onClick={handleOpenTypeFilter}
            className='flex items-center gap-2 rounded-lg bg-(--color-surface-50) px-4 py-2 text-[16px] font-semibold text-(--color-gray-2) whitespace-nowrap'
            aria-label='Filter by type'
            title='Lọc theo loại'
          >
            <span className='truncate'>Loại</span>
            <ChevronDownIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileFilterTriggers
