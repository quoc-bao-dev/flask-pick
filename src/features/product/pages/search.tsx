'use client'

import { useSearchParams } from 'next/navigation'
import ProductListing from "../components/ProductListing"

/**
 * SearchPage component
 * Responsibility: Provide the layout for search results.
 * 
 * @returns {JSX.Element} The rendered search page
 */
const SearchPage = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''

    return (
        <main className='w-full'>
            {/* kết quả tim kiem */}
            <div className="py-2">
                <h2 className='text-[16px] font-medium text-(--color-text-strong) mb-4'>
                    {query ? `Kết quả tìm kiếm cho: "${query}"` : ''}
                </h2>
                <ProductListing isFilter />
            </div>
            <div className="py-2">
                <h2 className='text-[16px] font-medium text-(--color-text-strong) mb-4'>
                    Gợi ý sản phẩm
                </h2>
                <ProductListing />
            </div>
        </main>
    )
}

export default SearchPage