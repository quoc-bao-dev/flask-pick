'use client'

import { useState } from 'react'
import { SearchIcon } from '../icons/SearchIcon'

import Checkbox from '../ui/Checkbox'

interface SearchableFilterDropdownProps {
  items: string[]
  selectedItems: string[]
  onToggle: (item: string) => void
  placeholder?: string
  className?: string
}

/**
 * SearchableFilterDropdown component
 * Responsibility: Provide a searchable list of items with multiple selection capability.
 * Based on Figma design: https://www.figma.com/design/dd96wTQBmpmT6EwEg8UqMj/Flash-Pick---Shopee-Flash-sale?node-id=1129-7932
 *
 * @param {SearchableFilterDropdownProps} props - Component props
 * @returns {JSX.Element} The rendered component
 */
const SearchableFilterDropdown = ({
  items,
  selectedItems,
  onToggle,
  placeholder = 'Tìm kiếm thương hiệu',
  className = '',
}: SearchableFilterDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div
      className={`bg-white border border-(--color-gray-1) flex flex-col gap-3 items-start overflow-hidden p-3 rounded-[12px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full max-w-[280px] animate-in fade-in zoom-in-95 duration-200 ${className}`}
    >
      {/* Search Input Area */}
      <div className='flex items-center gap-2 border border-(--color-gray-1) bg-white px-2.5 py-1.5 rounded-[8px] w-full group focus-within:border-(--color-orange-1) transition-colors'>
        <SearchIcon size={14} color='#8796af' />
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className='flex-1 bg-transparent text-[12px] text-(--color-text-strong) outline-none placeholder:text-(--color-gray-4)'
        />
      </div>

      {/* Items List */}
      <div className='flex flex-col w-full max-h-[260px] overflow-y-auto scrollbar-custom pr-1'>
        <div className='flex flex-col gap-4 w-full'>
          {filteredItems.map((item) => {
            const isSelected = selectedItems.includes(item)
            return (
              <button
                key={item}
                type='button'
                onClick={() => onToggle(item)}
                className='flex items-center justify-between w-full group cursor-pointer text-left'
              >
                <span className='text-[14px] font-medium text-(--color-foreground) group-hover:text-(--color-orange-1) transition-colors'>
                  {item}
                </span>

                <Checkbox checked={isSelected} onChange={() => onToggle(item)} />
              </button>
            )
          })}

          {filteredItems.length === 0 && (
            <div className='py-4 text-center text-[12px] text-(--color-gray-4)'>
              Không tìm thấy kết quả
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchableFilterDropdown
