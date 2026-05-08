import React from 'react'
import { SearchIcon } from '../icons/SearchIcon'
import { HighlightedText } from './HighlightedText'

interface SearchSuggestionItemProps {
  item: string
  query: string
  onClick: (item: string) => void
  showIcon?: boolean
  className?: string
  textClassName?: string
}

/**
 * SearchSuggestionItem component
 * Responsibility: Renders a search suggestion item with an icon and highlighted text.
 * This component is shared between Desktop and Mobile search suggestions.
 */
export const SearchSuggestionItem: React.FC<SearchSuggestionItemProps> = ({
  item,
  query,
  onClick,
  showIcon = true,
  className = '',
  textClassName = '',
}) => {
  return (
    <button
      type='button'
      onClick={() => onClick(item)}
      className={`w-full flex items-center gap-3 text-left transition-colors ${className}`}
      title={item}
    >
      {showIcon && (
        <div className='shrink-0'>
          <SearchIcon size={16} color='#8796AF' />
        </div>
      )}
      <span className={`flex-1 text-[14px] text-gray-2 line-clamp-2 leading-tight ${textClassName}`}>
        <HighlightedText text={item} query={query} />
      </span>
    </button>
  )
}
