import { SearchSuggestionsData } from '@/services/search'
import { SearchSuggestionItem } from './SearchSuggestionItem'
import { HighlightedText } from './HighlightedText'
import { _Image } from '@/core/constant/asset'
import { TrashIcon } from '@/components/icons/TrashIcon'

interface SearchSuggestionsContentProps {
  suggestions?: SearchSuggestionsData
  query: string
  isFetching: boolean
  onSearch: (query: string) => void
  showTags?: boolean
  suggestionTags?: string[]
  showShops?: boolean
  activeIndex?: number
  recentSearches?: string[]
  onClearRecent?: () => void
}

export const SUGGESTION_TAGS = ['hoodie', 'quần baggy', 'sweater', 'túi đeo chéo']

export const MOCK_SHOPS = [
  { id: 1, name: 'Thời trang gen Z', handle: '@fashion69genz', image: _Image.product },
  { id: 2, name: 'Thời trang gen alpha', handle: '@fashion69genalpha', image: _Image.product },
  { id: 3, name: 'Thời trang gen beta', handle: '@fashion69genbeta', image: _Image.product },
]

export const SearchSuggestionsContent = ({
  suggestions,
  query,
  isFetching,
  onSearch,
  showTags = true,
  suggestionTags = ['hoodie', 'quần baggy', 'sweater', 'túi đeo chéo'],
  activeIndex = -1,
  recentSearches,
  onClearRecent,
}: SearchSuggestionsContentProps) => {
  const items = suggestions?.keywords ?? []
  const categories = suggestions?.categories ?? []
  const products = suggestions?.products ?? []

  const isQuerying = query.length > 0
  const showLoading = isQuerying && isFetching && items.length === 0

  let currentIndex = 0

  return (
    <div className='p-1'>
      <div className='p-3'>
        {/* Recent Searches Section */}
        {recentSearches && recentSearches.length > 0 && !isQuerying && (
          <section className='mb-4'>
            <div className='flex items-center justify-between mb-3'>
              <h2 className='text-[14px] font-semibold text-(--color-text-strong) tracking-tight'>
                Tìm kiếm gần đây
              </h2>
              {onClearRecent && (
                <button
                  type='button'
                  onClick={onClearRecent}
                  className='text-(--color-gray-3) hover:text-red-500 transition-colors'
                >
                  <TrashIcon size={20} />
                </button>
              )}
            </div>
            <div className='flex flex-wrap gap-2'>
              {recentSearches.slice(0, 10).map((term) => {
                const isActive = currentIndex === activeIndex
                currentIndex++
                return (
                  <button
                    key={term}
                    type='button'
                    onClick={() => onSearch(term)}
                    className={`px-3 py-1.5 bg-(--color-surface-50) rounded-[10px] text-left text-[12px] text-(--color-text-strong) transition-colors cursor-pointer ${isActive ? 'bg-gray-200/80 text-(--color-orange-1)' : 'hover:bg-gray-200/80'
                      }`}
                  >
                    {term}
                  </button>
                )
              })}
            </div>
          </section>
        )}
        {showTags && !isQuerying && (
          <>
            <h3 className='mb-3 text-[14px] font-semibold leading-[24px] tracking-tight text-(--color-text-strong)'>
              Có thể bạn muốn tìm
            </h3>
            <div className='flex flex-wrap gap-2 mb-4'>
              {suggestionTags.map((tag) => {
                const isActive = currentIndex === activeIndex
                currentIndex++
                return (
                  <button
                    key={tag}
                    type='button'
                    onClick={() => onSearch(tag)}
                    className={`cursor-pointer rounded-[10px] px-3 py-1.5 text-[14px] font-medium leading-[20px] transition-all hover:bg-gray-100 hover:text-(--color-orange-1) ${isActive ? 'bg-gray-100 text-(--color-orange-1)' : 'bg-[#F7F9FB] text-[#111625]'
                      }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {isQuerying && (
          <h2 className='text-[14px] font-semibold text-(--color-text-strong) mb-3 tracking-tight'>
            Gợi ý tìm kiếm
          </h2>
        )}

        <div className='space-y-2'>
          {showLoading && (
            <div className='px-2 py-1.5 text-[14px] text-(--color-gray-3)'>Đang tìm...</div>
          )}
          {!showLoading && isQuerying && items.length === 0 && categories.length === 0 && products.length === 0 && (
            <div className='px-2 py-1.5 text-[14px] text-(--color-gray-3)'>
              Không có gợi ý phù hợp
            </div>
          )}
          {items.map((item, index: number) => {
            const isActive = currentIndex === activeIndex
            currentIndex++
            return (
              <SearchSuggestionItem
                key={`${item}-${index}`}
                item={item}
                query={query}
                onClick={onSearch}
                className={`rounded px-2 py-1.5 hover:bg-gray-50 transition-colors ${isActive ? 'bg-gray-100' : ''
                  }`}
                textClassName='font-semibold leading-[20px] text-[#111625]'
                showIcon={true}
              />
            )
          })}
        </div>
      </div>

      {products.length > 0 && (
        <>
          <div className='mx-3 h-px bg-[#DEE4EE]' aria-hidden='true'></div>
          <div className='p-3'>
            <h3 className='mb-3 text-[14px] font-semibold leading-[24px] tracking-tight text-(--color-text-strong)'>
              Sản phẩm gợi ý
            </h3>
            <div className='space-y-3'>
              {products.map((product) => {
                const isActive = currentIndex === activeIndex
                currentIndex++
                return (
                  <button
                    key={product.itemId}
                    type='button'
                    onClick={() => onSearch(product.name)}
                    className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-lg transition-colors cursor-pointer group ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className='w-12 h-12 rounded bg-gray-100 overflow-hidden shrink-0 border border-(--color-border-1)'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span
                      className={`text-[14px] font-medium line-clamp-2 text-left transition-colors ${isActive ? 'text-(--color-orange-1)' : 'text-[#111625] group-hover:text-(--color-orange-1)'
                        }`}
                    >
                      <HighlightedText text={product.name} query={query} />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
      {/* 
      {showShops && (
        <>
          <div className='mx-3 h-px bg-[#DEE4EE]' aria-hidden='true'></div>
          <div className='p-3'>
            <h3 className='mb-3 text-[14px] font-semibold leading-[24px] tracking-tight text-(--color-text-strong)'>
              Cửa hàng gợi ý
            </h3>
            <div className='space-y-3'>
              {MOCK_SHOPS.map((shop) => {
                const isActive = currentIndex === activeIndex
                currentIndex++
                return (
                  <button
                    key={shop.id}
                    type='button'
                    className={`flex gap-3 items-center w-full rounded-lg px-2 py-2 transition-all cursor-pointer group ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                  >
                    <div
                      className={`h-10 w-10 shrink-0 overflow-hidden rounded-full border transition-colors ${isActive ? 'border-(--color-orange-1)' : 'border-(--color-border-1) group-hover:border-(--color-orange-1)'
                        }`}
                    >
                      <img
                        src={shop.image}
                        alt={`${shop.name} logo`}
                        className='h-full w-full object-cover'
                        loading='lazy'
                      />
                    </div>
                    <div className='flex-1 text-left'>
                      <p
                        className={`text-[14px] font-semibold tracking-[-0.6%] transition-colors ${isActive ? 'text-(--color-orange-1)' : 'text-[#111625] group-hover:text-(--color-orange-1)'
                          }`}
                      >
                        {shop.name}
                      </p>
                      <p className='text-[13px] font-medium text-(--color-gray-4)'>
                        {shop.handle}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )} */}
    </div>
  )
}
