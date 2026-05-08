'use client'

import { useEffect, useMemo } from 'react'

import { useDebouncedValue } from '@/core/hooks/useDebouncedValue'
import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver'
import { useProductInfiniteQuery } from '@/services/product'

import { useFilterProductStore } from '../store/filterProductStore'
import { mapApiProductToUi } from '../utils/mapApiProductToUi'
import { useProductFilterParams } from '../utils/useProductFilterParams'
import { ProductCardSkeleton } from './ProductCard'
import ProductsList from './ProductsList'

const FILTER_DEBOUNCE_MS = 300

interface SearchResultsListingProps {
  query: string
}

/**
 * SearchResultsListing component
 * Responsibility: Fetch products from `/api/v1/products` for a given
 * search query, applying the same global filter store as the browse listing.
 */
const SearchResultsListing = ({
  query,
}: SearchResultsListingProps) => {
  const setTotalProducts = useFilterProductStore((s) => s.setTotalProducts)

  const filters = useProductFilterParams(true)

  const params = useMemo(
    () => ({ ...filters, q: query }),
    [filters, query],
  )

  const debouncedParams = useDebouncedValue(params, FILTER_DEBOUNCE_MS)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductInfiniteQuery(debouncedParams)

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  })

  const products = useMemo(() => {
    const items = data?.pages.flatMap((page) => page.data) ?? []
    return items.map(mapApiProductToUi)
  }, [data])

  useEffect(() => {
    setTotalProducts(products.length)
  }, [products.length, setTotalProducts])

  if (!query.trim()) {
    return (
      <div className='py-10 text-center text-(--color-gray-3)'>
        Nhập từ khoá để tìm kiếm
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-4'>
        {[...Array(10)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }
  if (isError) return <div className='py-10 text-center'>Không tải được dữ liệu</div>

  return (
    <>
      <ProductsList products={products} />

      {/* Loading Skeletons */}
      {isFetchingNextPage && (
        <div className='py-6 flex justify-center w-full'>
          <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-4 w-full'>
            {[...Array(5)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      )}

      {/* Infinite Scroll Sentinel - pure invisible target */}
      <div ref={loadMoreRef} className='h-4 w-full shrink-0' aria-hidden='true' />
    </>
  )
}

export default SearchResultsListing
