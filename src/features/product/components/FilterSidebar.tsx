'use client'

import { useState, useRef, useEffect } from 'react'
import { BalanceIcon } from '@/components/icons/BalanceIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { SparkleIcon } from '@/components/icons/SparkleIcon'
import { StarSmallIcon } from '@/components/icons/StarSmallIcon'
import RangeInput from '@/components/ui/RangeInput'
import { formatCurrency } from '@/core/utils/format'
import { useFilterProductStore } from '../store/filterProductStore'
import Tooltip from '@/components/ui/Tooltip'
import SearchableFilterDropdown from '@/components/common/SearchableFilterDropdown'
import Checkbox from '@/components/ui/Checkbox'
import { RosetteIcon } from '@/components/icons/RosetteIcon'

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

  // 1. Transient UI States (Keep local as they don't persist in business logic)
  const [isBrandOpen, setIsBrandOpen] = useState(false)

  // 2. Refs
  const brandDropdownRef = useRef<HTMLDivElement>(null)

  // 3. Side Effects
  // Handle click outside for brand dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false)
      }
    }

    if (isBrandOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isBrandOpen])

  // --- Handlers ---

  const handleApplyFilter = () => {
    // Current pattern: Store updates immediately, Apply button can trigger side effects (API calls, etc.)
    console.log('Filters applied from Sidebar')
  }

  const toggleFilter = (list: string[], setList: (vals: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((t) => t !== value) : [...list, value])
  }

  // --- Sub-components ---

  const SectionTitle = ({ title }: { title: string }) => (
    <h3 className='text-[14px] leading-[28px] tracking-normal text-(--color-gray-2) mb-3 uppercase'>
      {title}
    </h3>
  )

  const PriceDisplayInput = ({
    value,
    onChange,
    placeholder,
  }: {
    value: number
    onChange: (val: string) => void
    placeholder: string
  }) => (
    <div className='relative flex border border-(--color-border-1) rounded-[10px] bg-white transition-shadow focus-within:shadow-sm overflow-hidden'>
      <div className='px-3 py-2 bg-[#F7F9FB] border-r border-(--color-border-1) text-(--color-gray-2) text-[14px] font-medium pointer-events-none'>
        ₫
      </div>
      <input
        type='text'
        inputMode='numeric'
        value={formatCurrency(value)}
        onChange={(e) => onChange(e.target.value)}
        className='flex-1 px-3 py-2 text-[14px] font-medium text-(--color-text-strong) outline-none'
        placeholder={placeholder}
      />
    </div>
  )

  return (
    <nav
      className='space-y-6 p-4 rounded-[16px] bg-white border border-(--color-border-1) shadow-sm'
      aria-label='Filter products'
    >
      {/* 1. Header Section */}
      <div className='flex items-center justify-between pb-4 border-b border-(--color-border-1)'>
        <h2 className='text-[24px] font-semibold text-(--color-text-strong) tracking-tight'>
          Bộ lọc
        </h2>
      </div>

      {/* 2. Sorting */}
      <section aria-labelledby='sort-label'>
        <SectionTitle title='Sắp xếp theo' />
        <div className='space-y-3 font-medium'>
          {[
            { key: 'relevant', label: 'Liên quan' },
            { key: 'newest', label: 'Mới nhất' },
            { key: 'bestselling', label: 'Bán chạy' },
          ].map((option) => (
            <label
              key={option.key}
              className='flex justify-between items-center cursor-pointer group'
            >
              <span className='text-[14px] text-[#111625] group-hover:text-(--color-orange-1) transition-colors'>
                {option.label}
              </span>
              <input
                type='radio'
                name='sortBySidebar'
                value={option.key}
                checked={sortBy === option.key}
                onChange={() => setSortBy(option.key)}
                className='w-5 h-5 border-2 border-[#DEE4EE] rounded-full appearance-none cursor-pointer bg-white checked:border-(--color-orange-1) relative checked:after:content-[""] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-(--color-orange-1) checked:after:rounded-full transition-all'
              />
            </label>
          ))}
        </div>
      </section>

      {/* 3. Discount Type */}
      <section>
        <SectionTitle title='Loại giảm giá' />
        <div className='space-y-3'>
          {[
            {
              key: 'cheaper',
              label: 'Rẻ hơn lịch sử',
              tooltip: 'Giá thấp hơn so với trung bình 30 ngày qua',
              count: 69,
              icon: <SparkleIcon className='h-4 w-4' />,
            },
            {
              key: 'stable',
              label: 'Giá không đổi',
              tooltip: 'Sản phẩm duy trì mức giá ổn định',
              count: 69,
              icon: <BalanceIcon className='h-4 w-4' />,
            },
          ].map((option) => (
            <label
              key={option.key}
              className='flex items-center justify-between cursor-pointer group'
            >
              <div className='flex items-center gap-2'>
                <Tooltip content={option.tooltip}>
                  <span className='text-[14px] font-medium text-(--color-text-strong) underline decoration-wavy decoration-[#8796AF]/50 decoration-1 underline-offset-4 group-hover:text-(--color-orange-1) transition-colors'>
                    {option.label}
                  </span>
                </Tooltip>
                <span className='text-[13px] text-(--color-gray-2) font-medium'>
                  ({option.count})
                </span>
              </div>
              <Checkbox
                checked={discountTypes.includes(option.key)}
                onChange={() => toggleFilter(discountTypes, setDiscountTypes, option.key)}
              />
            </label>
          ))}
        </div>
      </section>

      {/* 3. Discount Type */}
      <section>
        <SectionTitle title='% giảm giá' />
        <div className='space-y-3'>
          {[
            { key: '>50', label: 'Giảm sốc (Trên 50%)', count: 69 },
            { key: '30-50', label: 'Giảm sâu (30% - 50%)', count: 69 },
            { key: '10-30', label: 'Giảm vừa (10% - 30%)', count: 69 },
            { key: '<10', label: 'Giảm ít (Dưới 10%)', count: 69 },
          ].map((option) => (
            <label
              key={option.key}
              className='flex items-center justify-between cursor-pointer group'
            >
              <div className='flex items-center gap-2'>
                <span className='text-[14px] font-medium text-(--color-text-strong) group-hover:text-(--color-orange-1) transition-colors'>
                  {option.label}
                </span>
                <span className='text-[13px] text-(--color-gray-2) font-medium'>
                  ({option.count})
                </span>
              </div>
              <Checkbox
                checked={discountPercentages.includes(option.key)}
                onChange={() =>
                  toggleFilter(discountPercentages, setDiscountPercentages, option.key)
                }
              />
            </label>
          ))}
        </div>
      </section>

      {/* 4. Price Range */}
      <section>
        <SectionTitle title='Khoảng giá' />
        <div className='space-y-4 pt-2'>
          <RangeInput
            min={0}
            max={10000000}
            step={1000}
            value={priceRange}
            onChange={setPriceRange}
          />
          <div className=''>
            <PriceDisplayInput
              value={priceRange[0]}
              placeholder='Tối thiểu'
              onChange={(val) => {
                const numeric = Number(val.replace(/[^\d]/g, ''))
                setPriceRange([Math.min(numeric, priceRange[1]), priceRange[1]])
              }}
            />
            <div className='ml-5 border-l-2 border-dashed border-(--color-border-1) h-4'></div>
            <PriceDisplayInput
              value={priceRange[1]}
              placeholder='Tối đa'
              onChange={(val) => {
                const numeric = Number(val.replace(/[^\d]/g, ''))
                setPriceRange([priceRange[0], Math.min(numeric, 10000000)])
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. Apply Button */}
      <button
        type='button'
        onClick={handleApplyFilter}
        className='w-full px-4 py-3 bg-[#F15024] rounded-xl text-[15px] font-bold text-white hover:bg-(--color-orange-1)/90 transition-all shadow-md active:scale-[0.98]'
      >
        Áp dụng
      </button>

      {/* 6. Shop Types */}
      <section>
        <SectionTitle title='Shop' />
        <div className='space-y-3'>
          {[
            { key: 'mall', label: 'Shop Mall', count: 69 },
            { key: 'favorite', label: 'Shop Yêu thích', count: 69 },
          ].map((option) => (
            <label
              key={option.key}
              className='flex items-center justify-between cursor-pointer group'
            >
              <div className='flex items-center gap-2'>
                <span className='text-[14px] font-medium text-(--color-text-strong) group-hover:text-(--color-orange-1) transition-colors'>
                  {option.label}
                </span>
                <span className='text-[13px] text-(--color-gray-2) font-medium'>
                  ({option.count})
                </span>
              </div>
              <Checkbox
                checked={shopTypes.includes(option.key)}
                onChange={() => toggleFilter(shopTypes, setShopTypes, option.key)}
              />
            </label>
          ))}
        </div>
      </section>

      {/* 6. Brands */}
      <section className='relative' ref={brandDropdownRef}>
        <SectionTitle title='thương hiệu' />
        <button
          type='button'
          onClick={() => setIsBrandOpen(!isBrandOpen)}
          className={`w-full mt-2 py-2 px-3 rounded-[10px] border flex gap-2 items-center justify-between transition-all group ${
            isBrandOpen
              ? 'border-(--color-orange-1) bg-white shadow-sm'
              : 'border-(--color-border-1) bg-white hover:bg-gray-50'
          }`}
          title='Chọn thương hiệu'
        >
          <div className='flex items-center gap-2 flex-1 min-w-0'>
            <RosetteIcon
              size={18}
              color={isBrandOpen ? '#f15024' : '#596881'}
              className='shrink-0 transition-colors'
            />
            <p className='text-[14px] font-medium text-(--color-gray-2) truncate text-left'>
              {selectedBrands.length > 0 ? selectedBrands.join(', ') : 'Chọn thương hiệu'}
            </p>
          </div>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform duration-200 ${
              isBrandOpen ? 'rotate-180 text-(--color-orange-1)' : 'text-(--color-gray-2)'
            }`}
          />
        </button>

        {isBrandOpen && (
          <SearchableFilterDropdown
            items={['Toshiba', 'Sony', 'Samsung', 'LG', 'Casper', 'Sharp']}
            selectedItems={selectedBrands}
            onToggle={(brand) => toggleFilter(selectedBrands, setSelectedBrands, brand)}
            className='absolute top-full left-0 right-0 mt-2 z-50'
          />
        )}
      </section>

      {/* 7. Ratings */}
      <section>
        <SectionTitle title='Đánh giá' />
        <div className='space-y-3'>
          {[
            { key: '5.0', label: '5.0', count: 69 },
            { key: '4.0+', label: '4.0 trở lên', count: 69 },
            { key: '3.0+', label: '3.0 trở lên', count: 69 },
          ].map((option) => (
            <label
              key={option.key}
              className='flex items-center justify-between cursor-pointer group'
            >
              <div className='flex items-center gap-2'>
                <StarSmallIcon className='w-4 h-4' />
                <span className='text-[14px] font-medium text-(--color-text-strong) group-hover:text-(--color-orange-1) transition-colors'>
                  {option.label}
                </span>
                <span className='text-[13px] text-(--color-gray-2) font-medium'>
                  ({option.count})
                </span>
              </div>
              <Checkbox
                checked={ratings.includes(option.key)}
                onChange={() => toggleFilter(ratings, setRatings, option.key)}
              />
            </label>
          ))}
        </div>
      </section>

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
