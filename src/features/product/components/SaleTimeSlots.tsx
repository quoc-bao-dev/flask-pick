'use client'

import { useEffect, useRef } from 'react'
import { useFlashSaleSessionsQuery } from '@/services/flash-sale'
import { useFilterProductStore } from '../store/filterProductStore'

/**
 * Interface for Sale Time Slot
 */
interface TimeSlot {
  key: string
  title: string
  subtitle?: string
  productCount: number
}

/**
 * SaleTimeSlots component - Displays available time slots for flash sales
 *
 * @returns {JSX.Element} The rendered component
 */
const SaleTimeSlots = () => {
  // --- Hooks ---
  const { activeTab, setActiveTab, setTotalProducts } = useFilterProductStore()
  const { data: sessionResponse, isLoading } = useFlashSaleSessionsQuery({ limit: 10 })
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasScrolledRef = useRef(false)

  // --- Derived State ---
  const totalProductCount = sessionResponse?.totalProductCount ?? 0

  const timeSlots: TimeSlot[] = [
    { key: 'all', title: 'Tất cả', productCount: totalProductCount },
    ...(sessionResponse?.data?.map((session) => ({
      key: session.promotionId,
      title: session.name,
      subtitle: session.statusText,
      productCount: session.productCount,
    })) || []),
  ]

  // Sync productCount to global store when active tab changes
  useEffect(() => {
    const activeSlot = timeSlots.find((s) => s.key === activeTab)
    if (activeSlot) {
      setTotalProducts(activeSlot.productCount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, sessionResponse])

  // Scroll active tab into view on first load
  useEffect(() => {
    if (timeSlots.length > 1 && activeTab !== 'all' && !hasScrolledRef.current) {
      const container = scrollRef.current
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
  }, [timeSlots, activeTab])

  // --- Handlers ---
  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  const renderTabButton = (tab: TimeSlot) => {
    const isActive = tab.key === activeTab

    return (
      <button
        type='button'
        onClick={() => handleTabChange(tab.key)}
        className={`relative text-center cursor-pointer h-full w-full flex flex-col items-center justify-center xl:gap-2 whitespace-nowrap pb-2 xl:pb-4 transition-colors focus:outline-none ${
          isActive ? 'text-(--color-orange-1)' : 'text-(--color-gray-2)'
        }`}
        aria-pressed={isActive}
        aria-label={`Chọn khung giờ ${tab.title}${tab.subtitle ? ` - ${tab.subtitle}` : ''}`}
        title={tab.title}
      >
        {/* Time Title */}
        <span className='text-[16px] xl:text-2xl font-medium leading-5'>{tab.title}</span>

        {/* Status Subtitle */}
        {tab.subtitle && (
          <span
            className={`text-[12px] xl:text-base leading-4 whitespace-nowrap ${
              isActive ? 'text-(--color-orange-1)' : 'text-(--color-gray-2)'
            }`}
          >
            {tab.subtitle}
          </span>
        )}

        {/* Active Indicator */}
        {isActive && (
          <div
            className='absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-(--color-orange-1) animate-in fade-in slide-in-from-bottom-1'
            aria-hidden='true'
          />
        )}
      </button>
    )
  }

  if (isLoading) {
    return (
      <div className='flex w-full overflow-x-auto scrollbar-custom border-b border-(--color-border-1) py-4'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='flex-1 min-w-[100px] xl:min-w-[160px] h-12 bg-gray-100 animate-pulse rounded-lg mx-1'
          />
        ))}
      </div>
    )
  }

  return (
    <nav className='pt-2' aria-label='Flash Sale Time Slots'>
      <div className='relative flex border-b border-(--color-border-1)'>
        {/* Fixed 'Tất cả' Tab */}
        <div className='w-[20%] shrink-0 flex xl:pt-4'>
          {renderTabButton(timeSlots[0])}
        </div>

        {/* Scrollable Container */}
        <div ref={scrollRef} className='flex-1 min-w-0 flex items-stretch h-full xl:pt-4 overflow-x-auto scrollbar-custom'>
          {timeSlots.slice(1).map((tab) => (
            <div
              className='relative flex-1 min-w-[120px] xl:min-w-[160px]'
              key={tab.key}
            >
              {renderTabButton(tab)}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default SaleTimeSlots

