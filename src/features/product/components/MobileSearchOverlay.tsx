'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { CameraIcon } from '@/components/icons/CameraIcon'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { useUiProductStore } from '../store/uiProductStore'
import { useDebouncedValue } from '@/core/hooks/useDebouncedValue'
import { useSessionUuid } from '@/core/hooks/useSessionUuid'
import { useSearchSuggestionsQuery } from '@/services/search'
import { SearchSuggestionsContent } from '@/components/ui/SearchSuggestionsContent'

const SEARCH_DEBOUNCE_MS = 300
const SUGGESTION_LIMIT = 8
const RECENT_SEARCHES_KEY = 'fp_recent_searches'
const MAX_RECENT_SEARCHES = 10

/**
 * MobileSearchOverlay component
 * Responsibility: Provide a full-screen search interface for mobile devices.
 * Based on Figma design: https://www.figma.com/design/dd96wTQBmpmT6EwEg8UqMj/Flash-Pick---Shopee-Flash-sale?node-id=723-13612
 * 
 * @returns {JSX.Element} The rendered component
 */
const MobileSearchOverlay = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') || ''
  const { isMobileSearchOpen, setIsMobileSearchOpen } = useUiProductStore()
  const [searchTerm, setSearchTerm] = useState(urlQuery)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, 10))
        }
      } catch (e) {
        console.error('Failed to parse recent searches', e)
      }
    }
  }, [])

  // Sync input with URL search param
  useEffect(() => {
    setSearchTerm(urlQuery)
  }, [urlQuery])

  const debouncedQuery = useDebouncedValue(searchTerm.trim(), SEARCH_DEBOUNCE_MS)
  const sessionUuid = useSessionUuid()

  const { data: suggestions, isFetching } = useSearchSuggestionsQuery(
    { q: debouncedQuery, limit: SUGGESTION_LIMIT, sessionUuid },
    { enabled: isMobileSearchOpen },
  )

  const suggestionItems = suggestions?.data.keywords ?? []
  const categorySuggestions = suggestions?.data.categories ?? []
  const productSuggestions = suggestions?.data.products ?? []

  const isQuerying = debouncedQuery.length > 0

  // Block body scroll when overlay is open
  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileSearchOpen])

  if (!isMobileSearchOpen) return null

  const handleSearch = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return

    // Update recent searches
    const updated = [trimmed, ...recentSearches.filter((t) => t !== trimmed)].slice(
      0,
      MAX_RECENT_SEARCHES,
    )
    setRecentSearches(updated)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))

    setIsMobileSearchOpen(false)
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const handleClearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  }

  const handleClose = () => {
    setIsMobileSearchOpen(false)
  }

  return (
    <div className='fixed inset-0 z-100 bg-white flex flex-col'>
      {/* Header with Back Button and Search Input */}
      <header className='flex items-center gap-3 px-4 py-3'>
        <button
          onClick={handleClose}
          className='p-1 -ml-1 text-(--color-gray-2)'
          aria-label='Quay lại'
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className='flex-1 flex items-center gap-2 px-3 py-2 border-2 border-(--color-orange-1) rounded-xl bg-white'>
          <button onClick={() => handleSearch(searchTerm)}>
            <SearchIcon size={18} color='#8796AF' />
          </button>
          <input
            autoFocus
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchTerm)
              }
            }}
            placeholder='Tìm kiếm sản phẩm, shop'
            className='flex-1 bg-transparent text-[14px] text-(--color-text-strong) outline-none placeholder:text-(--color-gray-4)'
          />
          <div className='flex items-center gap-2'>
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className='p-1'>
                <CloseIcon size={14} color='#8796AF' />
              </button>
            )}
            <div className='p-1.5 bg-(--color-primary-50) rounded-md'>
              <CameraIcon size={16} color='#F15024' />
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-10'>
        {/* Unified Suggestions Section */}
        <SearchSuggestionsContent
          suggestions={suggestions?.data}
          query={debouncedQuery}
          isFetching={isFetching}
          onSearch={handleSearch}
          showTags={false}
          recentSearches={recentSearches}
          onClearRecent={handleClearRecent}
        />
      </div>
    </div>
  )
}

export default MobileSearchOverlay
