'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useRef, useEffect, useMemo } from 'react'
import { _Image } from '@/core/constant/asset'
import { useDebouncedValue } from '@/core/hooks/useDebouncedValue'
import { useSessionUuid } from '@/core/hooks/useSessionUuid'
import { useSearchSuggestionsQuery } from '@/services/search'
import SearchInput from './SearchInput'
import {
  MOCK_SHOPS,
  SearchSuggestionsContent,
  SUGGESTION_TAGS,
} from './SearchSuggestionsContent'

const SEARCH_DEBOUNCE_MS = 300
const SUGGESTION_LIMIT = 8

/**
 * DesktopSearch component
 * Responsibility: Desktop search box with API-backed suggestion dropdown.
 */
const DesktopSearch = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') || ''
  const searchRef = useRef<HTMLDivElement>(null)

  const [searchValue, setSearchValue] = useState(urlQuery)
  const [showResults, setShowResults] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fp_recent_searches')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse recent searches', e)
      }
    }
  }, [])

  // Sync input with URL search param
  useEffect(() => {
    setSearchValue(urlQuery)
  }, [urlQuery])

  const debouncedQuery = useDebouncedValue(searchValue.trim(), SEARCH_DEBOUNCE_MS)
  const sessionUuid = useSessionUuid()

  const { data: suggestions, isFetching } = useSearchSuggestionsQuery({
    q: debouncedQuery,
    limit: SUGGESTION_LIMIT,
    sessionUuid,
  })

  // Reset active index when query or suggestions change
  useEffect(() => {
    setActiveIndex(-1)
  }, [debouncedQuery, suggestions])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
        setActiveIndex(-1)
      }
    }
    if (showResults) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showResults])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setShowResults(true)
  }

  const handleClearSearch = () => {
    setSearchValue('')
    setShowResults(false)
    setActiveIndex(-1)
  }

  const handleInputFocus = () => {
    setShowResults(true)
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) return

    const trimmed = query.trim()
    const updated = [trimmed, ...recentSearches.filter((t) => t !== trimmed)].slice(0, 10)
    setRecentSearches(updated)
    localStorage.setItem('fp_recent_searches', JSON.stringify(updated))

    setShowResults(false)
    setActiveIndex(-1)
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const handleClearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem('fp_recent_searches')
  }

  const focusableItems = useMemo(() => {
    const all: string[] = []
    const isQuerying = debouncedQuery.length > 0

    if (!isQuerying) {
      recentSearches.forEach((term) => all.push(term))
      SUGGESTION_TAGS.forEach((tag) => all.push(tag))
    }

    if (suggestions?.data) {
      suggestions.data.keywords.forEach((k) => all.push(k))
      suggestions.data.categories.forEach((c) => all.push(c.displayName))
      suggestions.data.products.forEach((p) => all.push(p.name))
    }

    MOCK_SHOPS.forEach((s) => all.push(s.name))
    return all
  }, [debouncedQuery, suggestions, recentSearches])

  const hasContent = useMemo(() => {
    const isQuerying = searchValue.trim().length > 0
    if (isQuerying) return true
    return recentSearches.length > 0
  }, [searchValue, recentSearches])

  return (
    <div className='relative flex-1 mx-16 xl:block hidden' ref={searchRef}>
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onClear={handleClearSearch}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((prev) => (prev + 1) % focusableItems.length)
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((prev) => (prev - 1 + focusableItems.length) % focusableItems.length)
          } else if (e.key === 'Enter') {
            if (activeIndex >= 0) {
              handleSearch(focusableItems[activeIndex])
            } else {
              handleSearch(searchValue)
            }
          } else if (e.key === 'Escape') {
            setShowResults(false)
          }
        }}
        onSearch={() => handleSearch(searchValue)}
        showClearButton={true}
        ariaLabel='Tìm kiếm sản phẩm trên máy tính'
      />

      {showResults && hasContent && (
        <div
          className='absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-[12px] border border-[#DEE4EE] bg-white shadow-xl animate-in fade-in duration-200 max-h-[80vh] overflow-y-auto scrollbar-custom'
          role='listbox'
          aria-label='Search results suggestions'
        >
          <SearchSuggestionsContent
            suggestions={suggestions?.data}
            query={debouncedQuery}
            isFetching={isFetching}
            onSearch={handleSearch}
            activeIndex={activeIndex}
            showTags={false}
            recentSearches={recentSearches}
            onClearRecent={handleClearRecent}
          />
        </div>
      )}
    </div>
  )
}

export default DesktopSearch
