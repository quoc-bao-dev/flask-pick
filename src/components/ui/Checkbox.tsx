'use client'

interface CheckboxProps {
  checked?: boolean
  onChange?: () => void
  className?: string
  disabled?: boolean
}

/**
 * Checkbox component
 * Responsibility: Provide a custom-styled checkbox matching the Figma design.
 * 
 * @param {CheckboxProps} props - Component props
 * @returns {JSX.Element} The rendered component
 */
const Checkbox = ({
  checked = false,
  onChange,
  className = '',
  disabled = false,
}: CheckboxProps) => {
  return (
    <div 
      onClick={() => !disabled && onChange?.()}
      className={`size-[20px] rounded-[4px] border-2 flex items-center justify-center transition-all cursor-pointer ${
        checked 
          ? 'bg-(--color-orange-1) border-(--color-orange-1)' 
          : 'border-(--color-gray-1) bg-white'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {checked && (
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M2.5 6L5 8.5L9.5 3.5" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}

export default Checkbox
