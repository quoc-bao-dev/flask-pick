'use client'

import FilterChip from '@/components/common/FilterChip'
import { SectionTitle } from '@/components/common/FilterSection'
import FilterSelectButton from '@/components/common/FilterSelectButton'
import { CategoryIcon } from '@/components/icons/CategoryIcon'
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon'
import { RosetteIcon } from '@/components/icons/RosetteIcon'
import { StarSmallIcon } from '@/components/icons/StarSmallIcon'
import { _Image } from '@/core/constant/asset'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCategoryInfiniteQuery } from '@/services/category'
import { useDiscountPercentsQuery } from '@/services/discount-percent'
import { useDiscountTypesQuery } from '@/services/discount-type'
import { useFilterProductStore } from '../store/filterProductStore'
import BaseBottomSheet from './BaseBottomSheet'
import DiscountExplanationModal from './DiscountExplanationModal'
import { FilterCheckboxGroup } from './FilterCheckboxGroup'
import { PriceRangeFilter } from './PriceRangeFilter'

interface FilterBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  onReset: () => void
  openWithCategory?: boolean
}

// Category options are now fetched from API

const BRAND_OPTIONS = [
  'Toshiba',
  'Sony',
  'Mitsubishi',
  'Kawasaki',
  'Toyota',
  'Honda',
  'Yamaha',
  'Subaru',
  'Daikin',
  'Canon',
  'LG',
  'Huyndai',
  'Samsung',
  'Casper',
  'Sharp',
]

const FilterBottomSheet = ({ isOpen, onClose, onApply, onReset, openWithCategory = false }: FilterBottomSheetProps) => {
  const {
    sortBy,
    setSortBy,
    categoryIds,
    setCategoryIds,
    discountTypes,
    setDiscountTypes,
    discountPercentages,
    setDiscountPercentages,
    priceRange,
    setPriceRange,
    shopTypes,
    setShopTypes,
    selectedBrands,
    setSelectedBrands,
    ratings,
    setRatings,
    resetFilters,
  } = useFilterProductStore()

  const { data: discountTypesData } = useDiscountTypesQuery()
  const { data: discountPercentsData } = useDiscountPercentsQuery()
  const { data: categoryData } = useCategoryInfiniteQuery({ limit: 50 })

  const categories = useMemo(() => {
    const apiCategories =
      categoryData?.pages
        .flatMap((page) => page.data)
        .map((cat) => ({
          id: cat.categoryId,
          label: cat.displayName,
          icon: _Image.all,
        })) || []
    return [{ id: 'all', label: 'Tất cả', icon: _Image.all }, ...apiCategories]
  }, [categoryData?.pages])

  const selectedCategory = categoryIds[0] ?? 'all'
  const setSelectedCategory = (id: string) =>
    setCategoryIds(id === 'all' ? [] : [id])

  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [brandSearch, setBrandSearch] = useState('')
  const [isDiscountInfoOpen, setIsDiscountInfoOpen] = useState(false)

  // Auto-open category drawer when openWithCategory is true
  useEffect(() => {
    if (isOpen && openWithCategory) {
      setIsCategoryOpen(true)
    }
  }, [isOpen, openWithCategory])

  // Refs for height transition
  const mainRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsCategoryOpen(false)
        setIsBrandOpen(false)
        setCategorySearch('')
        setBrandSearch('')
        setContainerHeight('auto')
      }, 300)
      return () => clearTimeout(timer)
    }

    let activeRef = mainRef
    if (isCategoryOpen) activeRef = categoryRef
    else if (isBrandOpen) activeRef = brandRef

    if (activeRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerHeight(entry.target.scrollHeight)
        }
      })
      observer.observe(activeRef.current)
      return () => observer.disconnect()
    }
  }, [
    isOpen,
    isCategoryOpen,
    isBrandOpen,
    discountTypes,
    discountPercentages,
    shopTypes,
    ratings,
    sortBy,
    priceRange,
    categorySearch,
    brandSearch,
  ])

  const toggleShopType = (type: string) => {
    setShopTypes(
      shopTypes.includes(type) ? shopTypes.filter((t) => t !== type) : [...shopTypes, type],
    )
  }

  const toggleDiscountType = (type: string) => {
    setDiscountTypes(
      discountTypes.includes(type)
        ? discountTypes.filter((t) => t !== type)
        : [...discountTypes, type],
    )
  }

  const toggleDiscountPercentage = (percent: string) => {
    setDiscountPercentages(
      discountPercentages.includes(percent)
        ? discountPercentages.filter((p) => p !== percent)
        : [...discountPercentages, percent],
    )
  }

  const toggleRating = (ratingStr: string) => {
    setRatings(
      ratings.includes(ratingStr)
        ? ratings.filter((r) => r !== ratingStr)
        : [...ratings, ratingStr],
    )
  }



  return (
    <>
      <BaseBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        title='Bộ lọc'
        footer={
          <>
            <button
              onClick={() => {
                resetFilters()
                onReset()
              }}
              className='flex-1 px-4 py-3 border border-(--color-border-1) rounded-lg text-[14px] font-semibold text-(--color-text-strong) hover:bg-gray-50 transition-colors'
            >
              Thiết lập lại
            </button>
            <button
              onClick={onApply}
              className='flex-1 px-4 py-3 bg-(--color-orange-1) rounded-lg text-[14px] font-semibold text-white hover:opacity-90 transition-opacity'
            >
              Áp dụng
            </button>
          </>
        }
      >
        <div
          className='relative overflow-hidden w-full transition-[height] duration-300 ease-out flex flex-col'
          style={{ height: containerHeight === 'auto' ? 'auto' : `${containerHeight}px` }}
        >
          {/* === MAIN CONTENT === */}
          <div
            ref={mainRef}
            className={`w-full transition-transform duration-300 ease-in-out shrink-0 ${isCategoryOpen || isBrandOpen
              ? 'absolute top-0 opacity-0 -translate-x-full pointer-events-none'
              : 'relative opacity-100 translate-x-0'
              }`}
          >
            <div className='space-y-6 pb-4'>
              {/* 1. Sắp xếp theo */}
              <section aria-labelledby='sort-label'>
                <SectionTitle title='Sắp xếp theo' />
                <div className='flex flex-wrap gap-2 pt-1 font-medium'>
                  {[
                    { key: 'relevant', label: 'Liên quan' },
                    { key: 'newest', label: 'Mới nhất' },
                    { key: 'best_seller', label: 'Bán chạy' },
                  ].map((option) => (
                    <FilterChip
                      key={option.key}
                      label={option.label}
                      isActive={sortBy === option.key}
                      onClick={() => setSortBy(option.key)}
                    />
                  ))}
                </div>
              </section>

              {/* 2. Khoảng giá */}
              <PriceRangeFilter
                title='Khoảng giá'
                value={priceRange}
                onChange={setPriceRange}
                layout='horizontal'
              />

              {/* 3. Loại giảm giá - synced with desktop (API-driven) */}
              <FilterCheckboxGroup
                title='Loại giảm giá'
                options={
                  discountTypesData?.map((type) => ({
                    key: type.code,
                    label: type.label,
                    tooltip: type.description,
                    count: 69,
                  })) || []
                }
                selectedValues={discountTypes}
                onChange={(key) => toggleDiscountType(key)}
              />

              {/* 4. % giảm giá - synced with desktop (API-driven) */}
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
                onChange={(key) => toggleDiscountPercentage(key)}
              />

              {/* 5. Shop - synced with desktop */}
              <FilterCheckboxGroup
                title='Shop'
                options={[
                  { key: 'mall', label: 'Shop Mall', count: 69 },
                  { key: 'favorite', label: 'Shop Yêu thích', count: 69 },
                ]}
                selectedValues={shopTypes}
                onChange={(key) => toggleShopType(key)}
              />

              <div className='my-2 h-px bg-(--color-border-1)'></div>

              {/* 6. Danh mục - Button to open drawer */}
              <section>
                <SectionTitle title='Danh Mục' />
                <button
                  type='button'
                  onClick={() => setIsCategoryOpen(true)}
                  className='w-full py-2 px-3 rounded-[10px] border border-(--color-border-1) bg-[#F7F9FB] flex items-center justify-between text-left transition-colors hover:bg-gray-100'
                >
                  <div className='flex items-center gap-2 flex-1 min-w-0'>
                    <CategoryIcon size={18} color='#596881' className='shrink-0' />
                    <span className='text-[14px] font-medium text-gray-2 truncate'>
                      {categories.find((c) => c.id === selectedCategory)?.label || 'Tất cả'}
                    </span>
                  </div>
                  <div className='text-gray-2'>
                    <ChevronRightIcon />
                  </div>
                </button>
              </section>

              {/* 7. Thương hiệu */}
              <section>
                <SectionTitle title='Thương hiệu' />
                <button
                  type='button'
                  onClick={() => setIsBrandOpen(true)}
                  className='w-full py-2 px-3 rounded-[10px] border border-(--color-border-1) bg-[#F7F9FB] flex items-center justify-between text-left transition-colors hover:bg-gray-100'
                >
                  <div className='flex items-center gap-2 flex-1 min-w-0'>
                    <RosetteIcon size={18} color='#596881' className='shrink-0' />
                    <span className='text-[14px] font-medium text-gray-2 truncate'>
                      {selectedBrands.length > 0 ? selectedBrands.join(', ') : 'Chọn thương hiệu'}
                    </span>
                  </div>
                  <div className='text-gray-2'>
                    <ChevronRightIcon />
                  </div>
                </button>
              </section>

              <div className='my-2 h-px bg-(--color-border-1)'></div>

              {/* 8. Đánh giá - synced with desktop */}
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
                onChange={(key) => toggleRating(key)}
              />
            </div>
          </div>

          {/* === CATEGORY DRAWER === */}
          <div
            ref={categoryRef}
            className={`w-full bg-white transition-transform duration-300 ease-in-out shrink-0 ${isCategoryOpen
              ? 'relative opacity-100 translate-x-0'
              : 'absolute top-0 opacity-0 translate-x-full pointer-events-none'
              }`}
          >
            <div className='flex items-center gap-3 py-3'>
              <button type='button' onClick={() => setIsCategoryOpen(false)} className=''>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.25 14.25L6.75 9L11.25 3.75'
                    stroke='currentColor'
                    strokeWidth='1.73333'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <h2 className='text-sm font-semibold text-(--color-text-strong) uppercase'>
                Danh mục
              </h2>
            </div>

            <div className='pb-4'>
              <div className='flex items-center gap-2 border-2 border-(--color-orange-1) rounded-lg px-3 py-2'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-(--color-gray-3)'
                >
                  <path
                    d='M11.8125 11.8125L15 15'
                    stroke='currentColor'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M12.75 7.875C12.75 10.6005 10.6005 12.75 7.875 12.75C5.1495 12.75 3 10.6005 3 7.875C3 5.1495 5.1495 3 7.875 3C10.6005 3 12.75 5.1495 12.75 7.875Z'
                    stroke='currentColor'
                    strokeWidth='1.4'
                  />
                </svg>
                <input
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder='Tìm kiếm danh mục'
                  className='flex-1 text-[14px] outline-none placeholder:text-(--color-gray-3)'
                />
              </div>

              <div className='mt-4 flex flex-wrap gap-3 pb-6'>
                {categories.filter((c) =>
                  c.label.toLowerCase().includes(categorySearch.toLowerCase()),
                ).map((category) => {
                  const isActive = category.id === selectedCategory

                  return (
                    <FilterSelectButton
                      key={category.id}
                      label={category.label}
                      isActive={isActive}
                      onClick={() => setSelectedCategory(category.id)}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* === BRAND DRAWER === */}
          <div
            ref={brandRef}
            className={`w-full bg-white transition-transform duration-300 ease-in-out shrink-0 ${isBrandOpen
              ? 'relative opacity-100 translate-x-0'
              : 'absolute top-0 opacity-0 translate-x-full pointer-events-none'
              }`}
          >
            <div className='flex items-center gap-3 py-3'>
              <button
                type='button'
                onClick={() => setIsBrandOpen(false)}
                className='w-9 h-9 flex items-center justify-center rounded-full border border-(--color-border-1) bg-white text-(--color-text-strong)'
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.25 14.25L6.75 9L11.25 3.75'
                    stroke='currentColor'
                    strokeWidth='1.73333'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <h2 className='text-sm font-semibold text-(--color-text-strong) uppercase'>
                Thương hiệu
              </h2>
            </div>

            <div className='pb-4'>
              <div className='flex items-center gap-2 border-2 border-(--color-orange-1) rounded-lg px-3 py-2'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-(--color-gray-3)'
                >
                  <path
                    d='M11.8125 11.8125L15 15'
                    stroke='currentColor'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M12.75 7.875C12.75 10.6005 10.6005 12.75 7.875 12.75C5.1495 12.75 3 10.6005 3 7.875C3 5.1495 5.1495 3 7.875 3C10.6005 3 12.75 5.1495 12.75 7.875Z'
                    stroke='currentColor'
                    strokeWidth='1.4'
                  />
                </svg>
                <input
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder='Tìm kiếm thương hiệu'
                  className='flex-1 text-[14px] outline-none placeholder:text-(--color-gray-3)'
                />
              </div>

              <div className='mt-4 flex flex-wrap gap-3 pb-6'>
                {BRAND_OPTIONS.filter((b) =>
                  b.toLowerCase().includes(brandSearch.toLowerCase()),
                ).map((brand) => {
                  const isActive = selectedBrands.includes(brand)
                  return (
                    <FilterSelectButton
                      key={brand}
                      label={brand}
                      isActive={isActive}
                      onClick={() => {
                        setSelectedBrands(
                          selectedBrands.includes(brand)
                            ? selectedBrands.filter((b) => b !== brand)
                            : [...selectedBrands, brand],
                        )
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </BaseBottomSheet>

      {/* Render Discount Modal outside BaseBottomSheet to escape styling/z-index traps */}
      <DiscountExplanationModal
        isOpen={isDiscountInfoOpen}
        onClose={() => setIsDiscountInfoOpen(false)}
      />
    </>
  )
}

export default FilterBottomSheet
