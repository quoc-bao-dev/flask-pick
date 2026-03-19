'use client'

import FlashSaleDeals from '@/features/product/components/FlashSaleDeals'
import CategoryFilter from '@/features/product/components/CategoryFilter'
import { useFilterProductStore } from '@/features/product/store/filterProductStore'

/**
 * ProductListHeader component (Desktop only)
 * Responsibility: Provide the top-level layout for product filtering on desktop,
 * including dynamic product count display, deal filters, and category selections.
 *
 * Synchronizes with the global FilterProductStore for the real-time product count.
 *
 * @returns {JSX.Element} The rendered component
 */
const ProductListHeader = () => {
  // --- Hooks ---
  const totalProducts = useFilterProductStore((state) => state.totalProducts)

  return (
    <header className='hidden lg:block space-y-4 mb-6' aria-label='Product results header'>
      {/* 1. Header Information Section */}
      <div className='flex items-start justify-between'>
        {/* Title and Product Count */}
        <div className='flex items-center gap-4'>
          <h1 className='text-[24px] font-bold text-(--color-text-strong) tracking-tight'>
            Danh sách sản phẩm
          </h1>

          {/* Dynamic Product Count Badge */}
          <div
            className='inline-flex items-center px-[8px] py-[5px] text-[12px] font-bold border border-(--color-border-1) rounded-lg bg-white/60 shadow-sm'
            aria-label={`${totalProducts} products found`}
          >
            {totalProducts.toLocaleString('vi-VN')}
            <span className='ml-1 text-(--color-gray-2) font-medium'>sản phẩm</span>
          </div>
        </div>

        {/* 2. Desktop Deal Selection Section */}
        <div className='flex items-center gap-4'>
          {/* Reusable Deal Filters component (Variant set to desktop) */}
          <FlashSaleDeals variant='desktop' />
        </div>
      </div>
    </header>
  )
}

export default ProductListHeader
