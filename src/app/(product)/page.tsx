'use client'

import Home from '@/features/product/pages/home'
import { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  )
}

export default Page
