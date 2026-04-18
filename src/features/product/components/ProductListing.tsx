'use client'

import { mockProducts } from '@/core/constant/products'
import { useMemo, useEffect } from 'react'
import { useFilterProductStore } from '../store/filterProductStore'
import ProductsList from './ProductsList'
import { useSearchParams } from 'next/navigation'

/**
 * ProductListingContainer component
 * Responsibility: Manage the business logic for filtering the product list.
 * @param {boolean} isFilter - Whether to apply filters (default: true)
 * @returns {JSX.Element} The rendered component
 */
const ProductListing = ({ isFilter = false }: { isFilter?: boolean } = {}) => {
  // --- Hooks ---
  const { activeTab, activeDeal, setTotalProducts } = useFilterProductStore()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  // --- Logic: Moving state down (Filtering) ---
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts]

    // 1. Filter by Search Query
    if (isFilter && searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 2. Filter by Category (activeTab)
    if (isFilter && activeTab !== 'all') {
      // Logic for category filtering mock-up
    }

    // 3. Filter by Price Deal (activeDeal)
    if (isFilter && activeDeal) {
      const dealThreshold = parseInt(activeDeal, 10)
      if (!isNaN(dealThreshold)) {
        result = result.filter((p) => p.currentPrice >= dealThreshold)
      }
    }

    return result
  }, [activeTab, activeDeal, searchQuery, isFilter])

  // Sync the filtered count to the store for other components (like Header)
  useEffect(() => {
    if (isFilter) setTotalProducts(filteredProducts.length)
  }, [filteredProducts.length, setTotalProducts, isFilter])

  return <ProductsList products={filteredProducts} />
}

export default ProductListing
