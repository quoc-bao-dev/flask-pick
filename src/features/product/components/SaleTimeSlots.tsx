'use client'

import { useFlashSaleSessionsQuery } from '@/services/flash-sale'
import { useFilterProductStore } from '../store/filterProductStore'

/**
 * Interface for Sale Time Slot
 */
interface TimeSlot {
  key: string
  title: string
  subtitle?: string
}

/**
 * SaleTimeSlots component - Displays available time slots for flash sales
 *
 * @returns {JSX.Element} The rendered component
 */
const SaleTimeSlots = () => {
  // --- Hooks ---
  const { activeTab, setActiveTab } = useFilterProductStore()
  const { data: sessionResponse, isLoading } = useFlashSaleSessionsQuery({ limit: 10 })

  // --- Derived State ---
  const timeSlots: TimeSlot[] = [
    { key: 'all', title: 'Tất cả' },
    ...(sessionResponse?.data?.map((session) => ({
      key: session.promotionId,
      title: session.name,
      subtitle: session.isCurrentlyActive ? 'Đang diễn ra' : 'Sắp diễn ra',
    })) || []),
  ]

  // --- Handlers ---
  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  if (isLoading) {
    return (
      <div className='flex items-center gap-6 overflow-x-auto scrollbar-hide xl:pt-4 h-[60px] xl:h-[100px]'>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className='min-w-[80px] xl:min-w-[280px] h-12 bg-gray-100 animate-pulse rounded-lg' />
        ))}
      </div>
    )
  }

  return (
    <nav className='pt-2' aria-label='Flash Sale Time Slots'>
      <div className='relative border-b border-(--color-border-1)'>
        {/* Scrollable Container */}
        <div className='flex min-w-full items-stretch gap-6 h-full overflow-x-auto scrollbar-hide xl:pt-4'>
          {timeSlots.map((tab) => {
            const isActive = tab.key === activeTab

            return (
              <div className='relative' key={tab.key}>
                <button
                  type='button'
                  onClick={() => handleTabChange(tab.key)}
                  className={`relative text-center cursor-pointer h-full flex flex-col items-center justify-center xl:gap-2 whitespace-nowrap pb-2 xl:pb-4 xl:min-w-[280px] transition-colors focus:outline-none ${
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
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default SaleTimeSlots
