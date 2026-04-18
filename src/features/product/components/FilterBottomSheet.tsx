'use client'

import { BalanceIcon } from '@/components/icons/BalanceIcon'
import { CategoryIcon } from '@/components/icons/CategoryIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon'
import { SparkleIcon } from '@/components/icons/SparkleIcon'
import { _Image } from '@/core/constant/asset'
import { formatCurrency } from '@/core/utils/format'
import { useEffect, useState, useRef } from 'react'
import RangeInput from '@/components/ui/RangeInput'
import Tooltip from '@/components/ui/Tooltip'
import FilterChip from '@/components/common/FilterChip'
import FilterSelectButton from '@/components/common/FilterSelectButton'
import BaseBottomSheet from './BaseBottomSheet'
import DiscountExplanationModal from './DiscountExplanationModal'
import Checkbox from '@/components/ui/Checkbox'
import { RosetteIcon } from '@/components/icons/RosetteIcon'
import { useFilterProductStore } from '../store/filterProductStore'

interface FilterBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  onReset: () => void
}

const CATEGORY_OPTIONS = [
  { id: 'all', label: 'Tất cả', icon: _Image.all },
  { id: 'balo', label: 'Balo & Túi ví nam', icon: _Image.balo },
  { id: 'pet', label: 'Chăm sóc thú cưng', icon: _Image.snack },
  { id: 'women-shoes', label: 'Giày dép nữ', icon: _Image.shose },
  { id: 'grocery', label: 'Bách hóa online', icon: _Image.food },
  { id: 'men-shoes', label: 'Giày dép nam', icon: _Image['shose-2'] },
  { id: 'home-care', label: 'Giặt giũ và chăm sóc nhà cửa', icon: _Image.wash },
  { id: 'tools', label: 'Dụng cụ và thiết bị tiện ích', icon: _Image.tool },
  { id: 'watch', label: 'Đồng hồ', icon: _Image.watch },
]

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

const FilterBottomSheet = ({ isOpen, onClose, onApply, onReset }: FilterBottomSheetProps) => {
  const {
    sortBy,
    setSortBy,
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

  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [brandSearch, setBrandSearch] = useState('')
  const [isDiscountInfoOpen, setIsDiscountInfoOpen] = useState(false)

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

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

  const parseInputNumber = (value: string) => {
    const numeric = Number(value.replace(/[^\d]/g, '') || '0')
    return numeric
  }

  const formatPrice = (value: number) => formatCurrency(value)

  const handleMinInputChange = (value: string) => {
    const nextMin = clamp(parseInputNumber(value), 0, priceRange[1])
    setPriceRange([nextMin, priceRange[1]])
  }

  const handleMaxInputChange = (value: string) => {
    const nextMax = clamp(parseInputNumber(value), priceRange[0], 10000000)
    setPriceRange([priceRange[0], nextMax])
  }

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
      <div className='px-3 flex items-center bg-[#F7F9FB] border-r border-(--color-border-1) text-(--color-gray-2) text-[14px] font-medium pointer-events-none'>
        ₫
      </div>
      <input
        type='text'
        inputMode='numeric'
        value={formatCurrency(value)}
        onChange={(e) => onChange(e.target.value)}
        className='flex-1 w-full min-w-0 px-3 py-2 text-[14px] font-medium text-(--color-text-strong) outline-none'
        placeholder={placeholder}
      />
    </div>
  )

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
            className={`w-full transition-transform duration-300 ease-in-out shrink-0 ${
              isCategoryOpen || isBrandOpen
                ? 'absolute top-0 opacity-0 -translate-x-full pointer-events-none'
                : 'relative opacity-100 translate-x-0'
            }`}
          >
            <div className='space-y-6 pb-4'>
              {/* Sắp xếp theo */}
              <section aria-labelledby='sort-label'>
                <SectionTitle title='Sắp xếp theo' />
                <div className='flex flex-wrap gap-2 pt-1 font-medium'>
                  {[
                    { key: 'relevant', label: 'Liên quan' },
                    { key: 'newest', label: 'Mới nhất' },
                    { key: 'bestselling', label: 'Bán chạy' },
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

              {/* Loại giảm giá */}
              <section>
                <div className='flex justify-between'>
                  <SectionTitle title='Loại giảm giá' />

                  <button
                    type='button'
                    onClick={() => setIsDiscountInfoOpen(true)}
                    className='p-1 -mr-1 -mt-1 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80 focus:outline-none'
                    aria-label='Xem thông tin loại giảm giá'
                  >
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 9H12.01M11 12H12V16H13M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12Z'
                        stroke='#596881'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>

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
                        onChange={() => toggleDiscountType(option.key)}
                      />
                    </label>
                  ))}
                </div>
              </section>

              {/* % giảm giá */}
              <section>
                <SectionTitle title='% GIẢM GIÁ' />
                <div className='space-y-3'>
                  {[
                    { key: 'over50', label: 'Giảm sốc (Trên 50%)', count: 69 },
                    { key: '30-50', label: 'Giảm sâu (30% - 50%)', count: 69 },
                    { key: '10-30', label: 'Giảm vừa (10% - 30%)', count: 69 },
                    { key: 'under10', label: 'Giảm ít (Dưới 10%)', count: 69 },
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
                        onChange={() => toggleDiscountPercentage(option.key)}
                      />
                    </label>
                  ))}
                </div>
              </section>

              {/* Khoảng giá */}
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

                  <div className='flex items-center'>
                    <div className='flex-1 min-w-0'>
                      <PriceDisplayInput
                        value={priceRange[0]}
                        placeholder='Tối thiểu'
                        onChange={(val) => {
                          const numeric = Number(val.replace(/[^\d]/g, ''))
                          setPriceRange([Math.min(numeric, priceRange[1]), priceRange[1]])
                        }}
                      />
                    </div>
                    <div className='w-5 shrink-0 border-t-2 border-dashed border-(--color-border-1)'></div>
                    <div className='flex-1 min-w-0'>
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
                </div>
              </section>

              <div className='my-2 h-px bg-(--color-border-1)'></div>

              {/* Shop */}
              <section>
                <SectionTitle title='Shop' />
                <div className='space-y-3 font-medium'>
                  {[
                    { key: 'mall', label: 'Shop Mall', count: 69 },
                    { key: 'favorite', label: 'Shop Yêu thích', count: 69 },
                    { key: 'favorite-plus', label: 'Shop Yêu thích +', count: 69 },
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
                        onChange={() => toggleShopType(option.key)}
                      />
                    </label>
                  ))}
                </div>
              </section>

              <div className='my-2 h-px bg-(--color-border-1)'></div>

              {/* === danh mục === */}
              <section>
                <SectionTitle title='Danh Mục' />
                <button
                  type='button'
                  onClick={() => setIsCategoryOpen(true)}
                  className='w-full py-2 px-3 rounded-[10px] bg-[#F7F9FB] flex items-center justify-between text-left transition-colors hover:bg-gray-100'
                >
                  <div className='flex items-center gap-2 flex-1'>
                    <CategoryIcon className='text-gray-2' />
                    <span className='text-[14px] font-medium text-gray-2'>
                      {CATEGORY_OPTIONS.find((c) => c.id === selectedCategory)?.label ||
                        'Chọn danh mục'}
                    </span>
                  </div>
                  <div className='text-gray-2'>
                    <ChevronRightIcon />
                  </div>
                </button>
              </section>

              {/* === brand === */}
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

              {/* Đánh giá */}
              <section>
                <SectionTitle title='Đánh giá' />
                <div className='space-y-3 font-medium'>
                  {[
                    { key: '5.0', value: 5, label: '5.0', count: 69 },
                    { key: '4.0+', value: 4, label: '4.0', count: 69 },
                    { key: '3.0+', value: 3, label: '3.0', count: 69 },
                    { key: '2.0+', value: 2, label: '2.0', count: 69 },
                    { key: '1.0+', value: 1, label: '1.0', count: 69 },
                  ].map((option) => (
                    <label
                      key={option.key}
                      className='flex items-center justify-between cursor-pointer group'
                    >
                      <div className='flex items-center gap-2'>
                        <div className='flex text-[#FFB800]'>
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              className='mr-0.5'
                            >
                              <path
                                d='M7 0L9.163 4.383L14 5.086L10.5 8.497L11.326 13.313L7 11.037L2.674 13.313L3.5 8.497L0 5.086L4.837 4.383L7 0Z'
                                fill={i < option.value ? 'currentColor' : '#E5E7EB'}
                              />
                            </svg>
                          ))}
                        </div>
                        {option.value < 5 && (
                          <span className='text-[14px] text-(--color-text-strong) group-hover:text-(--color-orange-1) transition-colors'>
                            trở lên
                          </span>
                        )}
                        <span className='text-[13px] text-(--color-gray-2)'>({option.count})</span>
                      </div>
                      <Checkbox
                        checked={ratings.includes(option.key)}
                        onChange={() => toggleRating(option.key)}
                      />
                    </label>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* === CATEGORY DRAWER === */}
          <div
            ref={categoryRef}
            className={`w-full bg-white transition-transform duration-300 ease-in-out shrink-0 ${
              isCategoryOpen
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
                {CATEGORY_OPTIONS.filter((c) =>
                  c.label.toLowerCase().includes(categorySearch.toLowerCase()),
                ).map((category) => {
                  const isActive = category.id === selectedCategory

                  return (
                    <FilterSelectButton
                      key={category.id}
                      icon={category.icon}
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
            className={`w-full bg-white transition-transform duration-300 ease-in-out shrink-0 ${
              isBrandOpen
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
