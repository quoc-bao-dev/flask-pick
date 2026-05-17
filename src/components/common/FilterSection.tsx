/**
 * SectionTitle component
 * Responsibility: Provide a consistent, themed heading for filter sections.
 */
export const SectionTitle = ({ title, className = '' }: { title: string; className?: string }) => (
  <h3
    className={`text-[14px] leading-[28px] tracking-normal text-(--color-gray-2) mb-3 uppercase ${className}`}
  >
    {title}
  </h3>
)

/**
 * PriceDisplayInput component
 * Responsibility: Provide a styled numeric input for price values with a currency suffix/prefix.
 * Fixed to ensure focus is maintained and formatting is smooth.
 */
export const PriceDisplayInput = ({
  value,
  onChange,
  placeholder,
  step = 1,
}: {
  value: number
  onChange: (val: string) => void
  placeholder: string
  step?: number
}) => {
  const displayValue = value.toLocaleString('vi-VN')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      onChange((value + step).toString())
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newValue = Math.max(0, value - step)
      onChange(newValue.toString())
    }
  }

  return (
    <div className='relative flex border border-(--color-border-1) rounded-[10px] bg-white transition-shadow focus-within:shadow-sm overflow-hidden group'>
      <div className='px-3 flex items-center bg-[#F7F9FB] border-r border-(--color-border-1) text-(--color-gray-2) text-[14px] font-medium pointer-events-none select-none'>
        ₫
      </div>
      <input
        type='text'
        inputMode='numeric'
        value={displayValue}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/[^\d]/g, '')
          onChange(rawValue)
        }}
        onKeyDown={handleKeyDown}
        className='flex-1 w-full min-w-0 px-3 py-2 text-[14px] font-medium text-(--color-text-strong) outline-none'
        placeholder={placeholder}
      />
      {/* Up/Down buttons - only show on hover or focus to keep it clean */}
      <div className='absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity'>
        <button
          type='button'
          onClick={() => onChange((value + step).toString())}
          className='p-0.5 hover:bg-gray-100 rounded text-(--color-gray-3) transition-colors'
          aria-label='Tăng giá'
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => onChange(Math.max(0, value - step).toString())}
          className='p-0.5 hover:bg-gray-100 rounded text-(--color-gray-3) transition-colors'
          aria-label='Giảm giá'
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
