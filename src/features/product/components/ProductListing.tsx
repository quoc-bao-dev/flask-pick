'use client'

import { mockProducts } from '@/core/constant/products'
import { useMemo, useEffect } from 'react'
import { useFilterProductStore } from '../store/filterProductStore'
import ProductsList from './ProductsList'

/**
 * ProductListingContainer component
 * Responsibility: Manage the business logic for filtering the product list.
 *
 * @returns {JSX.Element} The rendered component
 */
const ProductListing = () => {
  // --- Hooks ---
  const { activeTab, activeDeal, setTotalProducts } = useFilterProductStore()

  // --- Logic: Moving state down (Filtering) ---
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts]

    // 1. Filter by Category (activeTab)
    if (activeTab !== 'all') {
      // Logic for category filtering mock-up
    }

    // 2. Filter by Price Deal (activeDeal)
    if (activeDeal) {
      const dealThreshold = parseInt(activeDeal, 10)
      if (!isNaN(dealThreshold)) {
        result = result.filter((p) => p.currentPrice >= dealThreshold)
      }
    }

    return result
  }, [activeTab, activeDeal])

  // Sync the filtered count to the store for other components (like Header)
  useEffect(() => {
    setTotalProducts(filteredProducts.length)
  }, [filteredProducts.length, setTotalProducts])

  return <ProductsList products={filteredProducts} />
}

export default ProductListing
