'use client'

import { useState, useRef, useEffect } from 'react'
import { _Image } from '@/core/constant/asset'
import SearchInput from './SearchInput'

/** 
 * Constants for Search Suggestions 
 */
const SUGGESTION_TAGS = ['hoodie', 'quần baggy', 'sweater', 'túi đeo chéo']

const SUGGESTION_ITEMS = [
  'teelab studio',
  'teelab official',
  'teelab girl wear',
  'teelab boy wear',
  'teelab unisex',
  'teelab accessories',
]

const MOCK_SHOPS = [
  {
    id: 1,
    name: 'Thời trang gen Z',
    handle: '@fashion69genz',
    image: _Image.product,
  },
  {
    id: 2,
    name: 'Thời trang gen alpha',
    handle: '@fashion69genalpha',
    image: _Image.product,
  },
  {
    id: 3,
    name: 'Thời trang gen beta',
    handle: '@fashion69genbeta',
    image: _Image.product,
  },
]

/**
 * DesktopSearch component
 * Responsibility: Provide a powerful search experience for desktop users, 
 * including autocomplete suggestions, trending tags, and shop lookups.
 * Reuses the SearchInput component while adding a rich dropdown overlay.
 * 
 * @returns {JSX.Element} The rendered component
 */
const DesktopSearch = () => {
  // --- 1. Refs ---
  const searchRef = useRef<HTMLDivElement>(null)

  // --- 2. States ---
  const [searchValue, setSearchValue] = useState('')
  const [showResults, setShowResults] = useState(false)

  // --- 3. Effects ---
  
  // Close search results dropdown when clicking outside the search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showResults])

  // --- 4. Handlers ---
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setShowResults(e.target.value.length > 0)
  }

  const handleClearSearch = () => {
    setSearchValue('')
    setShowResults(false)
  }

  const handleInputFocus = () => {
    if (searchValue.length > 0) {
      setShowResults(true)
    }
  }

  /**
   * Helper function to highlight matching text in suggestions.
   */
  const renderHighlightedText = (text: string, query: string) => {
    if (!query) return text

    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className='text-(--color-gray-2) font-bold'>
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div className='relative flex-1 mx-16 xl:block hidden' ref={searchRef}>
      {/* Search Input Filter Component */}
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onClear={handleClearSearch}
        showClearButton={true}
        ariaLabel='Tìm kiếm sản phẩm trên máy tính'
      />

      {/* Search Results Dropdown - Suggestions and matching shops */}
      {showResults && (
        <div 
          className='absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-[12px] border border-[#DEE4EE] bg-white shadow-xl animate-in fade-in duration-200'
          role='listbox'
          aria-label='Search results suggestions'
        >
          <div className='p-1'>
            {/* 1. Suggestions Section - Popular tags and autocomplete items */}
            <div className='p-3'>
              <h3 className='mb-3 text-[14px] font-semibold leading-[24px] tracking-tight text-(--color-text-strong)'>
                Có thể bạn muốn tìm
              </h3>
              
              {/* Trending/Popular Tags */}
              <div className='flex flex-wrap gap-2 mb-4'>
                {SUGGESTION_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type='button'
                    className='cursor-pointer rounded-[10px] bg-[#F7F9FB] px-3 py-1.5 text-[14px] font-medium leading-[20px] text-[#111625] transition-all hover:bg-gray-100 hover:text-(--color-orange-1)'
                    title={`Tìm kiếm: ${tag}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Autocomplete Result Items */}
              <div className='space-y-2'>
                {SUGGESTION_ITEMS.map((item, index) => (
                  <button
                    key={index}
                    type='button'
                    className='w-full cursor-pointer rounded px-2 py-1.5 text-left text-[14px] font-semibold leading-[20px] text-[#111625] transition-colors hover:bg-gray-50'
                    title={item}
                  >
                    {renderHighlightedText(item, searchValue)}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Divider */}
            <div className='mx-3 h-px bg-[#DEE4EE]' aria-hidden='true'></div>

            {/* 2. Shop Section - Related official shops */}
            <div className='p-3'>
              <h3 className='mb-3 text-[14px] font-semibold leading-[24px] tracking-tight text-(--color-text-strong)'>
                Cửa hàng gợi ý
              </h3>
              <div className='space-y-3'>
                {MOCK_SHOPS.map((shop) => (
                  <button
                    key={shop.id}
                    type='button'
                    className='flex gap-3 items-center w-full rounded-lg px-2 py-2 transition-all hover:bg-gray-50 cursor-pointer group'
                    title={`Truy cập shop ${shop.name}`}
                  >
                    <div className='h-10 w-10 shrink-0 overflow-hidden rounded-full border border-(--color-border-1) group-hover:border-(--color-orange-1) transition-colors'>
                      <img
                        src={shop.image}
                        alt={`${shop.name} logo`}
                        className='h-full w-full object-cover'
                        loading='lazy'
                      />
                    </div>
                    <div className='flex-1 text-left'>
                      <p className='text-[14px] font-semibold tracking-[-0.6%] text-[#111625] group-hover:text-(--color-orange-1) transition-colors'>
                        {shop.name}
                      </p>
                      <p className='text-[13px] font-medium text-(--color-gray-4)'>
                        {shop.handle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DesktopSearch
