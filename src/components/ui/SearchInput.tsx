'use client'

import { SearchIcon } from '../icons/SearchIcon'
import { CameraIcon } from '../icons/CameraIcon'
import { CloseIcon } from '../icons/CloseIcon'

/**
 * Props for the SearchInput component
 */
interface SearchInputProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onClear?: () => void
  placeholder?: string
  className?: string
  showClearButton?: boolean
  ariaLabel?: string
}

/**
 * SearchInput component
 * Responsibility: Provide a standardized search input field with icons and clear functionality.
 * This component is shared between Desktop and Mobile search implementations.
 * 
 * @param {SearchInputProps} props - Component props
 * @returns {JSX.Element} The rendered component
 */
const SearchInput = ({
  value = '',
  onChange,
  onFocus,
  onClear,
  placeholder = 'Tìm kiếm sản phẩm, shop',
  className = '',
  showClearButton = false,
  ariaLabel = 'Tìm kiếm sản phẩm',
}: SearchInputProps) => {
  return (
    <div 
      className={`flex items-center gap-2 rounded-[12px] border-2 border-(--color-orange-1) bg-white px-3 py-2 shadow-sm transition-shadow focus-within:shadow-md ${className}`}
    >
      {/* 1. Search Icon */}
      <SearchIcon 
        size={18} 
        color='#8796AF' 
        aria-hidden='true' 
      />

      {/* 2. Main Input Field */}
      <input
        type='text'
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className='w-full bg-transparent text-(--color-text-strong) font-medium outline-none placeholder:text-(--color-gray-4) focus:placeholder:opacity-70'
        aria-label={ariaLabel}
      />

      {/* 3. Action Buttons Section */}
      <div className='flex items-center gap-2'>
        {/* Dynamic Clear Button */}
        {showClearButton && value && (
          <button
            type='button'
            onClick={onClear}
            className='flex items-center justify-center p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors'
            aria-label='Xóa nội dung tìm kiếm'
            title='Xóa nội dung tìm kiếm'
          >
            <CloseIcon color='#111625' size={14} />
          </button>
        )}

        {/* Visual Search (Camera) Button */}
        <button
          type='button'
          className='flex h-6 w-8 cursor-pointer items-center justify-center rounded-md bg-(--color-primary-50) hover:bg-(--color-primary-50)/80 transition-colors focus:outline-none focus:ring-2 focus:ring-(--color-orange-1)'
          aria-label='Tìm kiếm bằng hình ảnh'
          title='Tìm kiếm bằng hình ảnh'
        >
          <CameraIcon size={16} color='#F15024' aria-hidden='true' />
        </button>
      </div>
    </div>
  )
}

export default SearchInput
