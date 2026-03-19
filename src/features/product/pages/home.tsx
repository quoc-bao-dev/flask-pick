'use client'

import FlashSaleDeals from '../components/FlashSaleDeals'
import MobileFilterTriggers from '../components/MobileFilterTriggers'
import SaleTimeSlots from '../components/SaleTimeSlots'
import ProductListing from '../components/ProductListing'
import ProductFilterModals from '../components/ProductFilterModals'

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
