'use client'

import ProductListing from '../components/ProductListing'

/**
 * Flash Sale Home Page component
 * Responsibility: High-level layout of the flash sale page.
 * Orchestrates pure components (TimeSlots, Deals) and containerized logic (ProductListing, FilterModals).
 *
 * @returns {JSX.Element} The rendered page
 */
const Home = () => {
  return (
    <main className='w-full'>
      <ProductListing />
    </main>
  )
}

export default Home
