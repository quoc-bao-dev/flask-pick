'use client'

import SearchPage from '@/features/product/pages/search'

import { Suspense } from 'react'

const Page = () => {
    return (
        <Suspense fallback={null}>
            <SearchPage />
        </Suspense>
    )
}

export default Page