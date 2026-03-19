'use client'

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
 * Mock data for Flash Sale time slots
 */
const TIME_SLOTS: TimeSlot[] = [
  { key: 'all', title: 'Tất cả' },
  { key: '19', title: '19:00', subtitle: 'Đang diễn ra' },
  { key: '21', title: '21:00', subtitle: 'Sắp diễn ra' },
  { key: '00', title: '00:00', subtitle: 'Ngày mai' },
  { key: '02', title: '02:00', subtitle: 'Ngày kia' },
]

/**
 * SaleTimeSlots component - Displays available time slots for flash sales
 * 
 * @returns {JSX.Element} The rendered component
 */
const SaleTimeSlots = () => {
  // --- Hooks ---
  const { activeTab, setActiveTab } = useFilterProductStore()

  // --- Handlers ---
  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  return (
    <nav className='pt-2' aria-label='Flash Sale Time Slots'>
      <div className='relative border-b border-(--color-border-1)'>
        {/* Scrollable Container */}
        <div className='flex min-w-full items-stretch gap-6 h-full overflow-x-auto scrollbar-hide xl:pt-4'>
          {TIME_SLOTS.map((tab) => {
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
                  <span className='text-[16px] xl:text-2xl font-semibold leading-5'>
                    {tab.title}
                  </span>

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
                      className='absolute bottom-0 left-0 right-0 h-[4px] rounded-t-full bg-(--color-orange-1) animate-in fade-in slide-in-from-bottom-1' 
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
