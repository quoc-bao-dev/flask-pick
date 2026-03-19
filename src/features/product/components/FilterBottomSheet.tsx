'use client'

import { BalanceIcon } from '@/components/icons/BalanceIcon'
import { CategoryIcon } from '@/components/icons/CategoryIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon'
import { SparkleIcon } from '@/components/icons/SparkleIcon'
import { _Image } from '@/core/constant/asset'
import { formatCurrency } from '@/core/utils/format'
import { useEffect, useState } from 'react'
import RangeInput from '@/components/ui/RangeInput'
import { CloseIcon } from '@/components/icons/CloseIcon'


interface FilterBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  onReset: () => void
}

const CATEGORY_OPTIONS = [
  { id: 'all', label: 'Tất cả', icon: _Image.tool },
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
  const [sortBy, setSortBy] = useState('relevant')
  const [discountTypes, setDiscountTypes] = useState<string[]>([])
  const [discountPercentages, setDiscountPercentages] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([69000, 8869000])
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [brandSearch, setBrandSearch] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('Samsung')

  const toggleDiscountType = (type: string) => {
    setDiscountTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    )
  }

  const toggleDiscountPercentage = (percent: string) => {
    setDiscountPercentages((prev) =>
      prev.includes(percent) ? prev.filter((p) => p !== percent) : [...prev, percent],
    )
  }

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

  const parseInputNumber = (value: string) => {
    const numeric = Number(value.replace(/[^\d]/g, '') || '0')
    return numeric
  }

  const formatPrice = (value: number) => formatCurrency(value)


  const handleMinInputChange = (value: string) => {
    setPriceRange(([_, max]) => {
      const nextMin = clamp(parseInputNumber(value), 0, max)
      return [nextMin, max]
    })
  }

  const handleMaxInputChange = (value: string) => {
    setPriceRange(([min, _]) => {
      const nextMax = clamp(parseInputNumber(value), min, 10000000)
      return [min, nextMax]
    })
  }

  // lock background scroll when sheet is open
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 bg-black/50 z-40 animate-in fade-in' onClick={onClose} />

      {/* Bottom Sheet */}
      <div className='fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-center'>
          <div className='py-1 w-[100px] bg-gray-1 rounded-full h-px mt-4'></div>
        </div>
        {/* Header */}
        <div className='sticky top-0 bg-white border-b border-(--color-border-1) px-4 py-4 flex items-center justify-between z-10'>
          <h2 className='text-[20px] font-bold text-(--color-text-strong)'>Bộ lọc</h2>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors'
            aria-label='Close'
            title='Đóng'
          >
            <CloseIcon size={24} />
          </button>

        </div>

        {/* Content */}
        <div className='relative px-4 py-4 space-y-6 overflow-x-hidden max-w-full'>
          {/* Sắp xếp theo */}
          <div>
            <h3 className='text-[14px] font-semibold text-(--color-text-strong) mb-3 uppercase'>
              SẮP XẾP THEO
            </h3>
            <div className='flex flex-wrap gap-2'>
              {[
                { key: 'relevant', label: 'Liên quan' },
                { key: 'newest', label: 'Mới nhất' },
                { key: 'bestselling', label: 'Bán chạy' },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setSortBy(option.key)}
                  className={`px-4 py-2 rounded-full text-[14px] font-semibold transition-colors ${
                    sortBy === option.key
                      ? 'bg-[var(--color-orange-1)] text-white'
                      : 'bg-white border border-(--color-border-1) text-(--color-text-strong)'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loại giảm giá */}
          <div>
            <h3 className='text-[14px] font-semibold text-(--color-text-strong) mb-3 uppercase'>
              LOẠI GIẢM GIÁ
            </h3>
            <div className='space-y-3'>
              {[
                {
                  key: 'cheaper',
                  label: 'Rẻ hơn lịch sử',
                  count: 69,
                  icon: <SparkleIcon className='h-4 w-4 text-white' />,
                },
                {
                  key: 'stable',
                  label: 'Giá không đổi',
                  count: 69,
                  icon: <BalanceIcon className='h-4 w-4 text-white' />,
                },
              ].map((option) => (
                <label
                  key={option.key}
                  className='flex items-center justify-between cursor-pointer'
                >
                  <div className='flex items-center gap-2'>
                    {option.icon}
                    <span className='text-[14px] text-(--color-text-strong)'>
                      {option.label}
                    </span>
                    <span className='text-[14px] text-gray-3'>({option.count})</span>
                  </div>
                  <input
                    type='checkbox'
                    checked={discountTypes.includes(option.key)}
                    onChange={() => toggleDiscountType(option.key)}
                    className='w-5 h-5 rounded border-(--color-border-1) accent-[var(--color-orange-1)] focus:ring-[var(--color-orange-1)]'
                  />
                </label>
              ))}
            </div>
          </div>

          {/* % giảm giá */}
          <div>
            <h3 className='text-[14px] font-semibold text-(--color-text-strong) mb-3 uppercase'>
              % GIẢM GIÁ
            </h3>
            <div className='space-y-3'>
              {[
                { key: 'over50', label: 'Giảm sốc (Trên 50%)', count: 69 },
                {
                  key: '30-50',
                  label: 'Giảm sâu (30% - 50%)',
                  count: 69,
                },
                {
                  key: '10-30',
                  label: 'Giảm vừa (10% - 30%)',
                  count: 69,
                },
                { key: 'under10', label: 'Giảm ít (Dưới 10%)', count: 69 },
              ].map((option) => (
                <label
                  key={option.key}
                  className='flex items-center justify-between cursor-pointer'
                >
                  <div className='flex items-center gap-2'>
                    <span className='text-[14px] text-(--color-text-strong)'>
                      {option.label}
                    </span>
                    <span className='text-[14px] text-gray-3'>({option.count})</span>
                  </div>
                  <input
                    type='checkbox'
                    checked={discountPercentages.includes(option.key)}
                    onChange={() => toggleDiscountPercentage(option.key)}
                    className='w-5 h-5 rounded border-(--color-border-1) accent-(--color-orange-1) focus:ring-(--color-orange-1)'
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Khoảng giá */}
          <div>
            <h3 className='text-[14px] font-semibold text-(--color-text-strong) mb-3 uppercase'>
              KHOẢNG GIÁ
            </h3>
            <div className='space-y-4'>
              {/* Slider */}
              <RangeInput
                min={0}
                max={10000000}
                step={1000}
                value={priceRange}
                onChange={setPriceRange}
              />

              {/* Input fields */}
              <div className='flex gap-3'>
                <div className='flex-1'>
                  <label className='text-[12px] text-gray-3 mb-1 block'>Từ</label>
                  <input
                    type='text'
                    inputMode='numeric'
                    value={formatPrice(priceRange[0])}
                    onChange={(e) => handleMinInputChange(e.target.value)}
                    className='w-full px-3 py-2 border border-(--color-border-1) rounded-lg text-[14px] focus:outline-none focus:border-[var(--color-orange-1)]'
                    placeholder='₫'
                  />
                </div>
                <div className='flex-1'>
                  <label className='text-[12px] text-gray-3 mb-1 block'>Đến</label>
                  <input
                    type='text'
                    inputMode='numeric'
                    value={formatPrice(priceRange[1])}
                    onChange={(e) => handleMaxInputChange(e.target.value)}
                    className='w-full px-3 py-2 border border-(--color-border-1) rounded-lg text-[14px] focus:outline-none focus:border-(--color-orange-1)'
                    placeholder='₫'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* === danh mục === */}
          <div className='my-2 h-px bg-gray-1'></div>
          <div className='pt-2'>
            <h2 className='text-sm text-gray-2 uppercase'>Danh Mục</h2>
            <button
              type='button'
              onClick={() => setIsCategoryOpen(true)}
              className='w-full mt-2 py-2 px-3 rounded-lg bg-gray-1 text-gray-2 flex gap-2 items-center justify-between text-left'
            >
              <div className='flex gap-2 items-center'>
                <CategoryIcon />
                <p className=' text-sm '>
                  {CATEGORY_OPTIONS.find((c) => c.id === selectedCategory)?.label ||
                    'Chọn danh mục'}
                </p>
              </div>

              <div className=''>
                <ChevronRightIcon />
              </div>
            </button>
          </div>

          {/* Category Drawer */}
          <div className=''>
            <div
              className={`absolute inset-0 bg-white z-20 transition-transform duration-300 px-1 py-2 overflow-y-auto ${
                isCategoryOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className='flex items-center gap-3 px-3 py-3'>
                <button
                  type='button'
                  onClick={() => setIsCategoryOpen(false)}
                  className='w-9 h-9 flex items-center justify-center rounded-full border border-(--color-border-1) bg-white text-gray-600'
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
                  Danh mục
                </h2>
              </div>

              <div className='px-3'>
                <div className='flex items-center gap-2 border-2 border-[var(--color-orange-1)] rounded-lg px-3 py-2'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='text-gray-400'
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
                    className='flex-1 text-[14px] outline-none placeholder:text-gray-3'
                  />
                </div>

                <div className='mt-4 grid grid-cols-2 gap-3'>
                  {CATEGORY_OPTIONS.filter((c) =>
                    c.label.toLowerCase().includes(categorySearch.toLowerCase()),
                  ).map((category) => {
                    const isActive = category.id === selectedCategory
                    return (
                      <button
                        key={category.id}
                        type='button'
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 rounded-full px-3 py-2 border transition-colors ${
                          isActive
                            ? 'border-(--color-orange-1) bg-white shadow-sm'
                            : 'border-(--color-border-1) bg-white'
                        }`}
                      >
                        <span className='h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden'>
                          <img
                            src={category.icon}
                            alt={category.label}
                            className='h-6 w-6 object-contain'
                          />
                        </span>
                        <span className='text-[13px] text-(--color-text-strong) text-left'>
                          {category.label}
                        </span>
                        {isActive && (
                          <span className='ml-auto h-5 w-5 rounded-full bg-(--color-orange-1) text-white flex items-center justify-center text-[12px]'>
                            ✓
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* === brand === */}
          <div className='pt-2'>
            <h2 className='text-sm text-gray-2 uppercase'>thương hiệu</h2>
            <button
              type='button'
              onClick={() => setIsBrandOpen(true)}
              className='w-full mt-2 py-2 px-3 rounded-lg bg-gray-1 text-gray-2 flex gap-2 items-center justify-between text-left'
            >
              <div className='flex gap-2 items-center'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.74986 5.39986C3.74986 4.96225 3.9237 4.54257 4.23313 4.23313C4.54257 3.9237 4.96225 3.74986 5.39986 3.74986H6.14986C6.58553 3.74961 7.00342 3.57706 7.31236 3.26986L7.83736 2.74486C7.99069 2.59066 8.173 2.46829 8.37379 2.38479C8.57458 2.30129 8.7899 2.2583 9.00736 2.2583C9.22482 2.2583 9.44013 2.30129 9.64093 2.38479C9.84172 2.46829 10.024 2.59066 10.1774 2.74486L10.7024 3.26986C11.0114 3.57736 11.4299 3.74986 11.8649 3.74986H12.6149C13.0525 3.74986 13.4721 3.9237 13.7816 4.23313C14.091 4.54257 14.2649 4.96225 14.2649 5.39986V6.14986C14.2649 6.58486 14.4374 7.00336 14.7449 7.31236L15.2699 7.83736C15.4241 7.99069 15.5464 8.173 15.6299 8.37379C15.7134 8.57458 15.7564 8.7899 15.7564 9.00736C15.7564 9.22482 15.7134 9.44013 15.6299 9.64093C15.5464 9.84172 15.4241 10.024 15.2699 10.1774L14.7449 10.7024C14.4377 11.0113 14.2651 11.4292 14.2649 11.8649V12.6149C14.2649 13.0525 14.091 13.4721 13.7816 13.7816C13.4721 14.091 13.0525 14.2649 12.6149 14.2649H11.8649C11.4292 14.2651 11.0113 14.4377 10.7024 14.7449L10.1774 15.2699C10.024 15.4241 9.84172 15.5464 9.64093 15.6299C9.44013 15.7134 9.22482 15.7564 9.00736 15.7564C8.7899 15.7564 8.57458 15.7134 8.37379 15.6299C8.173 15.5464 7.99069 15.4241 7.83736 15.2699L7.31236 14.7449C7.00342 14.4377 6.58553 14.2651 6.14986 14.2649H5.39986C4.96225 14.2649 4.54257 14.091 4.23313 13.7816C3.9237 13.4721 3.74986 13.0525 3.74986 12.6149V11.8649C3.74961 11.4292 3.57706 11.0113 3.26986 10.7024L2.74486 10.1774C2.59066 10.024 2.46829 9.84172 2.38479 9.64093C2.30129 9.44013 2.2583 9.22482 2.2583 9.00736C2.2583 8.7899 2.30129 8.57458 2.38479 8.37379C2.46829 8.173 2.59066 7.99069 2.74486 7.83736L3.26986 7.31236C3.57706 7.00342 3.74961 6.58553 3.74986 6.14986V5.39986Z'
                    stroke='#596881'
                    strokeWidth='1.73333'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className=' text-sm '>{selectedBrand || 'Chọn thương hiệu'}</p>
              </div>

              <div className=''>
                <ChevronRightIcon />
              </div>
            </button>
          </div>

          {/* Brand Drawer */}
          <div
            className={`absolute inset-0 bg-white z-30 transition-transform duration-300 px-1 py-2 overflow-y-auto ${
              isBrandOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className='flex items-center gap-3 px-3 py-3'>
              <button
                type='button'
                onClick={() => setIsBrandOpen(false)}
                className='w-9 h-9 flex items-center justify-center rounded-full border border-(--color-border-1) bg-white text-gray-600'
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

            <div className='px-3'>
              <div className='flex items-center gap-2 border-2 border-(--color-orange-1) rounded-lg px-3 py-2'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-gray-400'
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
                  className='flex-1 text-[14px] outline-none placeholder:text-gray-3'
                />
              </div>

              <div className='mt-4 grid grid-cols-3 gap-3'>
                {BRAND_OPTIONS.filter((b) =>
                  b.toLowerCase().includes(brandSearch.toLowerCase()),
                ).map((brand) => {
                  const isActive = brand === selectedBrand
                  return (
                    <button
                      key={brand}
                      type='button'
                      onClick={() => setSelectedBrand(brand)}
                      className={`relative rounded-full px-3 py-2 border text-[13px] transition-colors ${
                        isActive
                          ? 'border-(--color-orange-1) text-(--color-text-strong) bg-white'
                          : 'border-(--color-border-1) text-(--color-text-strong) bg-white'
                      }`}
                    >
                      {brand}
                      {isActive && (
                        <span className='absolute -top-2 -right-2 h-5 w-5 rounded-full bg-(--color-orange-1) text-white flex items-center justify-center text-[12px]'>
                          ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='sticky bottom-0 bg-white border-t border-(--color-border-1) px-4 py-4 flex gap-3'>
          <button
            onClick={onReset}
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
        </div>
      </div>
    </>
  )
}

export default FilterBottomSheet
