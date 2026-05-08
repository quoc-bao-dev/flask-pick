'use client'

import ProductListing from '../components/ProductListing'
import { useFilterUrlSync } from '../utils/useFilterUrlSync'

const Home = () => {
  useFilterUrlSync()

  return (
    <main className='w-full'>
      <ProductListing />
    </main>
  )
}

export default Home
