import React from 'react'

interface FilterSelectButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
  icon?: string
}

const FilterSelectButton = ({ label, isActive, onClick, icon }: FilterSelectButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`relative flex items-center gap-2 rounded-full px-3 py-2 border-[1.5px] transition-all cursor-pointer focus:outline-none ${
        isActive
          ? 'border-(--color-orange-1) bg-white shadow-sm'
          : 'border-(--color-border-1) bg-white hover:border-(--color-border-1)'
      }`}
      aria-pressed={isActive}
      title={label}
    >
      {/* Optional Icon */}
      {icon && (
        <span className='h-5 w-5 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden shrink-0'>
          <img src={icon} alt='' className='h-5 w-5 object-contain' loading='lazy' />
        </span>
      )}

      {/* Label */}
      <span className='text-[13px] font-medium text-(--color-text-strong) text-left line-clamp-1 flex-1'>
        {label}
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
}

export default FilterSelectButton
