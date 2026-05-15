'use client'

import { useMemo } from 'react'

import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver'
import { useProductInfiniteQuery } from '@/services/product'

import { mapApiProductToUi } from '../utils/mapApiProductToUi'
import { ProductCardSkeleton } from './ProductCard'
import ProductsList from './ProductsList'

interface SearchResultsListingProps {
  query: string
}

/**
 * SearchResultsListing component
 * Responsibility: Fetch products from `/api/v1/products` for a given
 * search query. Only passes the `q` parameter — no filter store params.
 */
const SearchResultsListing = ({
  query,
}: SearchResultsListingProps) => {

  const params = useMemo(() => ({ q: query }), [query])

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductInfiniteQuery(params)

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
    freeze: isFetchingNextPage,
  })

  const products = useMemo(() => {
    const items = data?.pages.flatMap((page) => page.data) ?? []
    return items.map(mapApiProductToUi)
  }, [data])

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
