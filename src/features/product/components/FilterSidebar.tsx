'use client'

import { StarSmallIcon } from '@/components/icons/StarSmallIcon'
import { useDiscountPercentsQuery } from '@/services/discount-percent'
import { useDiscountTypesQuery } from '@/services/discount-type'
import { useFilterProductStore } from '../store/filterProductStore'
import { BrandFilter } from './BrandFilter'
import { FilterCheckboxGroup } from './FilterCheckboxGroup'
import { FilterRadioGroup } from './FilterRadioGroup'
import { PriceRangeFilter } from './PriceRangeFilter'

/**
 * FilterSidebar component
 * Responsibility: Provide a powerful desktop-only sidebar for complex product filtering.
 * Uses the global FilterProductStore to manage and synchronize all filtering parameters.
 *
 * @returns {JSX.Element} The rendered component
 */
const FilterSidebar = () => {
  // --- Hooks ---
  const {
    // State
    sortBy,
    discountTypes,
    discountPercentages,
    priceRange,
    selectedBrands,
    shopTypes,
    ratings,

    // Actions
    setSortBy,
    setDiscountTypes,
    setDiscountPercentages,
    setPriceRange,
    setSelectedBrands,
    setShopTypes,
    setRatings,
    resetFilters,
  } = useFilterProductStore()

  // API Data
  const { data: discountTypesData } = useDiscountTypesQuery()
  const { data: discountPercentsData } = useDiscountPercentsQuery()

  // --- Handlers ---

  const handleApplyFilter = () => {
    // Current pattern: Store updates immediately, Apply button can trigger side effects (API calls, etc.)
    console.log('Filters applied from Sidebar')
  }

  const toggleFilter = (list: string[], setList: (vals: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((t) => t !== value) : [...list, value])
  }

  return (
    <nav
      className='space-y-6 p-4 rounded-[16px] bg-white border border-(--color-border-1) shadow-sm max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-custom'
      aria-label='Filter products'
    >
      {/* 1. Header Section */}
      <div className='flex items-center justify-between pb-4 border-b border-(--color-border-1)'>
        <h2 className='text-[24px] font-semibold text-(--color-text-strong) tracking-tight'>
          Bộ lọc
        </h2>
      </div>

      <FilterRadioGroup
        title='Sắp xếp theo'
        name='sortBySidebar'
        options={[
          { key: 'relevant', label: 'Liên quan' },
          { key: 'newest', label: 'Mới nhất' },
          { key: 'best_seller', label: 'Bán chạy' },
        ]}
        selectedValue={sortBy}
        onChange={setSortBy}
      />

      <PriceRangeFilter title='Khoảng giá' value={priceRange} onChange={setPriceRange} />

      <FilterCheckboxGroup
        title='Loại giảm giá'
        options={
          discountTypesData?.map((type) => ({
            key: type.code,
            label: type.label,
            tooltip: type.description,
            count: 69, // Mock count for now
          })) || []
        }
        selectedValues={discountTypes}
        onChange={(key) => toggleFilter(discountTypes, setDiscountTypes, key)}
      />

      <FilterCheckboxGroup
        title='% giảm giá'
        options={
          discountPercentsData?.data.map((item) => ({
            key: item.code,
            label: item.label,
            count: item.count,
            tooltip: item.description,
          })) || []
        }
        selectedValues={discountPercentages}
        onChange={(key: string) => toggleFilter(discountPercentages, setDiscountPercentages, key)}
      />


      <FilterCheckboxGroup
        title='Shop'
        options={[
          { key: 'mall', label: 'Shop Mall', count: 69 },
          { key: 'favorite', label: 'Shop Yêu thích', count: 69 },
        ]}
        selectedValues={shopTypes}
        onChange={(key) => toggleFilter(shopTypes, setShopTypes, key)}
      />

      <BrandFilter
        title='Thương hiệu'
        selectedBrand={selectedBrands}
        onSelect={setSelectedBrands}
        brands={['Toshiba', 'Sony', 'Samsung', 'LG', 'Casper', 'Sharp']}
      />

      <FilterCheckboxGroup
        title='Đánh giá'
        options={[
          { key: '5.0', label: '5.0', count: 69, icon: <StarSmallIcon className='w-4 h-4' /> },
          {
            key: '4.0+',
            label: '4.0 trở lên',
            count: 69,
            icon: <StarSmallIcon className='w-4 h-4' />,
          },
          {
            key: '3.0+',
            label: '3.0 trở lên',
            count: 69,
            icon: <StarSmallIcon className='w-4 h-4' />,
          },
        ]}
        selectedValues={ratings}
        onChange={(key) => toggleFilter(ratings, setRatings, key)}
      />

      {/* 9. Reset */}
      <button
        type='button'
        onClick={resetFilters}
        className='w-full px-4 py-3 mt-4 border-2 border-(--color-border-1) rounded-xl text-[14px] font-bold text-(--color-text-strong) hover:bg-gray-50 hover:border-(--color-gray-2) transition-all active:scale-[0.98]'
      >
        Thiết lập lại tất cả
      </button>
    </nav>
  )
}

export default FilterSidebar
