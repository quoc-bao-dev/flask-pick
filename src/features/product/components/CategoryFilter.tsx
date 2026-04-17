'use client'

import { _Image } from '@/core/constant/asset'
import { useState, useEffect, useRef } from 'react'
import { useFilterProductStore } from '../store/filterProductStore'

/**
 * Interface for Category Option
 */
interface CategoryOption {
  id: string
  label: string
  icon: string
}

/**
 * Category options for filtering
 */
const CATEGORY_OPTIONS: CategoryOption[] = [
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

/**
 * CategoryFilter component
 * Responsibility: Display a scrollable list of product categories with icons.
 * Allows users to filter products by category.
 *
 * @returns {JSX.Element} The rendered component
 */
const CategoryFilter = () => {
  // --- Hooks ---
  const { activeTab, setActiveTab } = useFilterProductStore()
  const [isAtEnd, setIsAtEnd] = useState(false)
  const categoryScrollRef = useRef<HTMLDivElement>(null)

  // --- Effects ---

  // Handlers for scroll position
  useEffect(() => {
    const checkScrollEnd = () => {
      if (categoryScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1
        setIsAtEnd(isAtEnd)
      }
    }

    const scrollElement = categoryScrollRef.current
    if (scrollElement) {
      checkScrollEnd()
      scrollElement.addEventListener('scroll', checkScrollEnd)
      window.addEventListener('resize', checkScrollEnd)
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScrollEnd)
      }
      window.removeEventListener('resize', checkScrollEnd)
    }
  }, [])

  // --- Handlers ---

  const handleCategorySelect = (categoryId: string) => {
    setActiveTab(categoryId as any)
  }

  const handleScrollRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className='relative flex items-center' aria-label='Product Categories'>
      {/* Scrollable Category List */}
      <div
        ref={categoryScrollRef}
        className='flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 pt-2 flex-1 outline-none'
      >
        {CATEGORY_OPTIONS.map((category) => {
          const isActive = category.id === activeTab

          return (
            <button
              key={category.id}
              type='button'
              onClick={() => handleCategorySelect(category.id)}
              className={`relative flex items-center gap-2 rounded-full px-3 py-2 border-[1.5px] transition-all whitespace-nowrap cursor-pointer focus:outline-none ${
                isActive
                  ? 'border-orange-1 bg-white shadow-sm'
                  : 'border-border-1 bg-white hover:border-border-2'
              }`}
              aria-pressed={isActive}
              title={category.label}
            >
              {/* Category Icon */}
              <span className='h-5 w-5 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden shrink-0'>
                <img src={category.icon} alt='' className='h-5 w-5 object-contain' loading='lazy' />
              </span>

              {/* Category Label */}
              <span className='text-[13px] font-medium text-(--color-text-strong)'>
                {category.label}
              </span>

              {/* Active Selection Indicator */}
              {isActive && (
                <span className='absolute -top-1 -right-1'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 19 19'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <rect width='18' height='18' rx='9' fill='#F15024' />
                    <path
                      d='M5.5 9L8 11.5L13 6.5'
                      stroke='white'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
              )}
            </button>
          )
        })}
        {/* Padding for scroll clearance */}
        <div className='w-[4px] h-[32px] shrink-0'></div>
      </div>

      {/* Right Gradient Overlay */}
      {!isAtEnd && (
        <div
          className='absolute right-0 top-0 bottom-0 w-20 pointer-events-none bg-gradient-to-r from-transparent to-white z-10'
          aria-hidden='true'
        ></div>
      )}

      {/* Scroll Right Button */}
      {!isAtEnd && (
        <button
          type='button'
          onClick={handleScrollRight}
          className='absolute right-0 top-1/2 -translate-y-1/2 shrink-0 w-8 h-8 rounded-full border border-(--color-border-1) bg-white flex items-center justify-center hover:bg-gray-50 transition-colors z-20 shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-orange-1)'
          aria-label='Xem thêm danh mục'
          title='Xem thêm'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              d='M6 4L10 8L6 12'
              stroke='#111625'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      )}
    </nav>
  )
}

export default CategoryFilter
