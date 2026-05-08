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

/**
 * ProductListingContainer component
 * Responsibility: Fetch products from API and pass them to the presentational list.
 * @param isFilter If true (default) the global filter store drives the query.
 *                 Pass false for unfiltered listings (e.g. "Gợi ý sản phẩm").
 */
const ProductListing = ({ isFilter = true }: { isFilter?: boolean } = {}) => {
  const setTotalProducts = useFilterProductStore((s) => s.setTotalProducts)

  const filters = useProductFilterParams(isFilter)
  const debouncedFilters = useDebouncedValue(filters, FILTER_DEBOUNCE_MS)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductInfiniteQuery(debouncedFilters)

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
    freeze: isFetchingNextPage,
  })

  const products = useMemo(() => {
    const items = data?.pages.flatMap((page) => page.data) ?? []
    return items.map(mapApiProductToUi)
  }, [data])

  useEffect(() => {
    if (isFilter) setTotalProducts(products.length)
  }, [products.length, setTotalProducts, isFilter])

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

export default ProductListing
