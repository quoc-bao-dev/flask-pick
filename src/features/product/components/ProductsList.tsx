'use client'

import ScrollToTop from '@/components/ui/ScrollToTop'
import ProductCard from './ProductCard'
import { Product } from '../types'

/**
 * Props for the ProductsList component
 */
interface ProductsListProps {
  products: Product[]
}

/**
 * ProductsList component
 * Responsibility: Receive a list of products and display them in a responsive grid.
 * 
 * @param {Product[]} products - The list of products to display
 * @returns {JSX.Element} The rendered component
 */
const ProductsList = ({ products }: ProductsListProps) => {
  // --- Render Helpers ---

  if (!products || products.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 text-gray-500'>
        <p className='text-lg font-medium'>Không tìm thấy sản phẩm nào</p>
      </div>
    )
  }

  return (
    <div className='relative w-full'>
      {/* Product Grid */}
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Floating Utilities */}
      <ScrollToTop />
    </div>
  )
}

export default ProductsList
