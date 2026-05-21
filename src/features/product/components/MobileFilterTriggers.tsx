'use client'

import { useMemo } from 'react'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { FilterIcon } from '@/components/icons/FilterIcon'
import { useUiProductStore } from '../store/uiProductStore'
import { useFilterProductStore } from '../store/filterProductStore'
import { useCategoryInfiniteQuery } from '@/services/category'

/**
 * MobileFilterTriggers component
 * Responsibility: Display filter trigger buttons for mobile layout.
 *
 * @returns {JSX.Element} The rendered component
 */
interface FilterTriggerButtonProps {
  label: string
  onClick: () => void
  icon: React.ElementType
  ariaLabel: string
}

const FilterTriggerButton = ({
  label,
  onClick,
  icon: Icon,
  ariaLabel,
}: FilterTriggerButtonProps) => (
  <button
    type='button'
    onClick={onClick}
    className='flex items-center gap-2 rounded-[10px] bg-white border border-[#DEE4EE] px-[12px] py-[6px] text-[12px] font-medium text-gray-2 whitespace-nowrap transition-colors hover:bg-gray-50'
    aria-label={ariaLabel}
    title={ariaLabel}
  >
    <span className='truncate'>{label}</span>
    <Icon size={16} />
  </button>
)

const MobileFilterTriggers = () => {
  // --- Hooks ---
  const { setIsFilterOpen, setIsDiscountFilterOpen, setIsTypeFilterOpen, setOpenFilterWithCategory } = useUiProductStore()
  const { categoryIds } = useFilterProductStore()

  const activeCategoryId = categoryIds[0]
  const { data: categoryData } = useCategoryInfiniteQuery({ limit: 20 })

  const categoryLabel = useMemo(() => {
    if (!activeCategoryId || activeCategoryId === 'all') return 'Danh mục'
    const pages = categoryData?.pages || []
    for (const page of pages) {
      const found = page.data.find((cat) => cat.categoryId === activeCategoryId)
      if (found) return found.displayName
    }
    return 'Danh mục'
  }, [activeCategoryId, categoryData?.pages])

  // --- Handlers ---
  const handleOpenMainFilter = () => {
    setOpenFilterWithCategory(false)
    setIsFilterOpen(true)
  }

  const handleOpenCategoryFilter = () => {
    setOpenFilterWithCategory(true)
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
        <div className='' aria-hidden='true'>
          <div className='flex items-center gap-2 rounded-[10px] bg-white border border-[#DEE4EE] px-[12px] py-[6px] text-[12px] font-medium text-gray-2 whitespace-nowrap transition-colors hover:bg-gray-50'>
            <FilterIcon size={18}
              onClick={handleOpenMainFilter}
            />
          </div>
        </div>

        {/* Scrollable Filter Buttons */}
        <div className='flex-1 min-w-0 flex items-center gap-3 overflow-x-auto scrollbar-hide'>

          {/* Category Filter - opens directly to category drawer */}
          <FilterTriggerButton
            label={categoryLabel}
            onClick={handleOpenCategoryFilter}
            icon={ChevronDownIcon}
            ariaLabel='Lọc theo danh mục'
          />

          {/* Discount Percent Filter */}
          <FilterTriggerButton
            label='% giảm giá'
            onClick={handleOpenDiscountFilter}
            icon={ChevronDownIcon}
            ariaLabel='Lọc theo % giảm giá'
          />

          {/* Type Filter */}
          <FilterTriggerButton
            label='Loại'
            onClick={handleOpenTypeFilter}
            icon={ChevronDownIcon}
            ariaLabel='Lọc theo loại'
          />
        </div>
      </div>
    </div>
  )
}

export default MobileFilterTriggers
