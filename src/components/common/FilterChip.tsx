import React from 'react'

interface FilterChipProps {
  label: React.ReactNode
  ariaLabel?: string
  isActive: boolean
  onClick: () => void
  variant?: 'mobile' | 'desktop'
}

const FilterChip = ({ label, ariaLabel, isActive, onClick, variant = 'mobile' }: FilterChipProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[12px] md:text-[16px] font-semibold text-[#111625] transition-all whitespace-nowrap cursor-pointer ${variant === 'desktop' ? 'border-[1.5px]' : ''
        } ${isActive
          ? 'border-(--color-orange-1) bg-(--color-primary-50)'
          : 'border-(--color-border-1) hover:border-(--color-border-2)'
        }`}
      aria-pressed={isActive}
      aria-label={ariaLabel || (typeof label === 'string' ? `Chọn ${label}` : 'Lựa chọn bộ lọc')}
      title={typeof label === 'string' ? label : undefined}
    >
      {label}
    </button>
  )
}

export default FilterChip
