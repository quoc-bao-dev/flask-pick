'use client'

import { useSearchParams } from 'next/navigation'
import ProductListing from '../components/ProductListing'
import SearchResultsListing from '../components/SearchResultsListing'
import { useFilterUrlSync } from '../utils/useFilterUrlSync'

const SearchPage = () => {
    useFilterUrlSync()

    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''

    return (
        <main className='w-full'>
            <div className="py-2">
                <h2 className='text-[16px] font-medium text-(--color-text-strong) mb-4'>
                    {query ? `Kết quả tìm kiếm cho: "${query}"` : ''}
                </h2>
                <SearchResultsListing query={query} />
            </div>
            <div className="py-2">
                <h2 className='text-[16px] font-medium text-(--color-text-strong) mb-4'>
                    Gợi ý sản phẩm
                </h2>
                <ProductListing isFilter={false} />
            </div>
        </main>
    )
}

export default SearchPage
