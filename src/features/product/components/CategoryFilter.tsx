'use client'

import { _Image } from '@/core/constant/asset'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useFilterProductStore } from '../store/filterProductStore'
import { useCategoryInfiniteQuery } from '@/services/category'
import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver'

/**
 * Interface for Category Option
 */
interface CategoryOption {
  id: string
  label: string
  icon: string
}

/**
 * CategoryFilter component
 * Responsibility: Display a scrollable list of product categories with icons.
 * Allows users to filter products by category.
 *
 * @returns {JSX.Element} The rendered component
 */
const CategoryFilter = () => {
  // --- Hooks ---
  const { categoryIds, setCategoryIds } = useFilterProductStore()
  const activeCategoryId = categoryIds[0] ?? 'all'
  const [isAtEnd, setIsAtEnd] = useState(false)
  const categoryScrollRef = useRef<HTMLDivElement>(null)

  const {
    data: categoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCategoryInfiniteQuery({
    limit: 50,
  })

  const categories = useMemo<CategoryOption[]>(() => {
    const apiCategories =
      categoryData?.pages
        .flatMap((page) => page.data)
        .map((cat) => ({
          id: cat.categoryId,
          label: cat.displayName,
          icon: _Image.all, // API does not provide an icon, using a fallback
        })) || []

    return [{ id: 'all', label: 'Tất cả', icon: _Image.all }, ...apiCategories]
  }, [categoryData?.pages])

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
    freeze: isFetchingNextPage,
  })

  const hasScrolledRef = useRef(false)

  // --- Effects ---

  // Scroll active category into view on first load
  useEffect(() => {
    if (categories.length > 1 && activeCategoryId !== 'all' && !hasScrolledRef.current) {
      const container = categoryScrollRef.current
      if (container) {
        const timer = setTimeout(() => {
          const activeEl = container.querySelector('[aria-pressed="true"]') as HTMLElement
          if (activeEl) {
            activeEl.scrollIntoView({
              behavior: 'auto',
              inline: 'center',
              block: 'nearest',
            })
            hasScrolledRef.current = true
          }
        }, 100)
        return () => clearTimeout(timer)
      }
    }
  }, [categories, activeCategoryId])

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
  }, [categories]) // Re-run effect if categories change

  // --- Handlers ---

  const handleCategorySelect = (categoryId: string) => {
    setCategoryIds(categoryId === 'all' ? [] : [categoryId])
  }

  const handleScrollRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      })
    }
  }

  const renderCategoryButton = (category: CategoryOption) => {
    const isActive = category.id === activeCategoryId

    return (
      <button
        key={category.id}
        type='button'
        onClick={() => handleCategorySelect(category.id)}
        className={`relative flex items-center gap-2 rounded-full px-3 py-2 border-[1.5px] transition-all whitespace-nowrap cursor-pointer focus:outline-none ${isActive
          ? 'border-orange-1 bg-white shadow-sm'
          : 'border-border-1 bg-white hover:border-border-2'
          }`}
        aria-pressed={isActive}
        title={category.label}
      >
        <span className='text-[13px] font-medium text-(--color-text-strong)'>
          {category.label}
        </span>

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
  }

  return (
    <nav className='hidden lg:flex relative items-center gap-3' aria-label='Product Categories'>
      {/* Fixed 'Tất cả' Tab */}
      <div className='shrink-0 pb-2 pt-2 z-10 bg-white'>
        {categories.length > 0 && renderCategoryButton(categories[0])}
      </div>
      {/* Scrollable Category List */}
      <div
        ref={categoryScrollRef}
        className='flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 pt-2 flex-1 outline-none'
      >
        {categories.slice(1).map((category) => renderCategoryButton(category))}
        {/* Padding for scroll clearance and infinite scroll target */}
        <div ref={loadMoreRef} className='w-[4px] h-[32px] shrink-0'></div>
      </div>

      {/* Right Gradient Overlay */}
      {!isAtEnd && categories.length > 0 && (
        <div
          className='absolute right-0 top-0 bottom-0 w-20 pointer-events-none bg-gradient-to-r from-transparent to-white z-10'
          aria-hidden='true'
        ></div>
      )}

      {/* Scroll Right Button */}
      {!isAtEnd && categories.length > 0 && (
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
