'use client'

import { useFilterProductStore } from '../store/filterProductStore'

/**
 * Interface for Flash Sale Deal Option
 */
interface DealOption {
  value: string
  label: string
}

/**
 * Deal options for Flash Sale
 */
const DEAL_OPTIONS: DealOption[] = [
  { value: '1000', label: 'Từ 1,000đ' },
  { value: '3000', label: 'Từ 3,000đ' },
  { value: '9000', label: 'Từ 9,000đ' },
  { value: '29000', label: 'Từ 29,000đ' },
]

/**
 * Props for the FlashSaleDeals component
 */
interface FlashSaleDealsProps {
  variant?: 'mobile' | 'desktop'
}

/**
 * FlashSaleDeals component
 * Responsibility: Display and allow selection of different price-based deals for flash sales.
 * Supports both mobile and desktop layouts through the 'variant' prop.
 * 
 * @param {string} variant - 'mobile' or 'desktop' to adjust layout and styling.
 * @returns {JSX.Element} The rendered component
 */
const FlashSaleDeals = ({ variant = 'mobile' }: FlashSaleDealsProps) => {
  // --- Hooks ---
  const { activeDeal, setActiveDeal } = useFilterProductStore()

  // --- Handlers ---
  const handleDealChange = (value: string) => {
    setActiveDeal(value)
  }

  // Common Button Rendering
  const renderButtons = () => {
    return DEAL_OPTIONS.map((option) => {
      const isActive = option.value === activeDeal
      
      return (
        <button
          key={option.value}
          type='button'
          onClick={() => handleDealChange(option.value)}
          className={`rounded-full border px-3 py-1 text-[16px] font-semibold transition-all whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-orange-1) focus:ring-offset-1 ${
            variant === 'desktop' ? 'border-[1.5px]' : ''
          } ${
            isActive
              ? 'border-(--color-orange-1) bg-(--color-primary-50) text-(--color-orange-1)'
              : 'border-(--color-border-1) text-(--color-text-strong) hover:border-(--color-border-2)'
          }`}
          aria-pressed={isActive}
          aria-label={`Chọn deal ${option.label}`}
          title={option.label}
        >
          {option.label}
        </button>
      )
    })
  }

  // --- Render Layouts ---

  // Desktop Component
  if (variant === 'desktop') {
    return (
      <div className='flex items-center gap-3' aria-label='Flash Sale Deals (Desktop)'>
        <span className='text-[16px] font-medium text-(--color-gray-2) uppercase'>DEAL</span>
        <div className='flex items-center gap-3'>
          {renderButtons()}
        </div>
      </div>
    )
  }

  // Mobile Component (matches original layout exactly)
  return (
    <nav className='pt-2 lg:hidden' aria-label='Flash Sale Deals'>
      <div className='flex items-center gap-3 text-[16px] font-semibold text-(--color-gray-2)'>
        {/* Label */}
        <span className='uppercase'>DEAL</span>

        {/* Scrollable Container */}
        <div className='flex-1 min-w-0'>
          <div className='flex w-max items-center gap-3 scrollbar-hide max-w-full overflow-x-auto pb-1'>
            {renderButtons()}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default FlashSaleDeals
