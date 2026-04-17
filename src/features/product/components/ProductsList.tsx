'use client'

import ScrollToTop from '@/components/ui/ScrollToTop'
import ProductCard from './ProductCard'
import { Product } from '../types'
import NoData from '@/components/ui/NoData'

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
      <NoData
        title='Không tìm thấy sản phẩm phù hợp'
        content='Hiện tại không có Deal nào khớp với tất cả tiêu chí lọc bạn chọn. Hãy thử bỏ bớt điều kiện lọc để xem nhiều kết quả hơn nhé!'
      />
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
