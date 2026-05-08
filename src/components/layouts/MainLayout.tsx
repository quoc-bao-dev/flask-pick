import { PropsWithChildren, Suspense } from 'react'
import Header from './Header'
import ProductListHeader from '../ui/ProductListHeader'
import SaleTimeSlots from '@/features/product/components/SaleTimeSlots'
import FlashSaleDeals from '@/features/product/components/FlashSaleDeals'
import MobileFilterTriggers from '@/features/product/components/MobileFilterTriggers'
import ProductFilterModals from '@/features/product/components/ProductFilterModals'
import FilterSidebar from '@/features/product/components/FilterSidebar'
import CategoryFilter from '@/features/product/components/CategoryFilter'
import MobileSearchBar from '../ui/MobileSearchBar'

/**
 * MainLayout component
 * Responsibility: Provide the primary application shell, coordinating layout components
 * like global navigation (Header), page-specific filtering (Sidebar), and mobile triggers.
 *
 * This layout is specialized for the Flash Sale product listing experience.
 *
 * @param {PropsWithChildren} props - Layout children (typically page content)
 * @returns {JSX.Element} The rendered global layout
 */
export const MainLayout = ({ children }: PropsWithChildren) => {
  // --- Render Sections ---

  /**
   * Mobile-specific Navigation/Filter Section (Visible on < lg)
   */
  const renderMobileControls = () => (
    <div className='flex flex-col lg:hidden' aria-label='Mobile filters and deals'>
      {/* 1. Mobile Deal Selectors (Headless store access) */}
      <FlashSaleDeals variant='mobile' />

      {/* 2. Mobile Bottom Sheet Triggers */}
      <MobileFilterTriggers />
    </div>
  )

  /**
   * Desktop Sidebar Section (Visible on >= lg)
   */
  const renderSidebar = () => (
    <aside
      className='hidden lg:block w-[280px] shrink-0'
      aria-label='Product quick filters sidebar'
    >
      <div className='sticky top-[120px]'>
        {/* Powerful Desktop Sidebar Filter Container */}
        <FilterSidebar />
      </div>
    </aside>
  )

  /**
   * Main Product Listing Frame
   */
  const renderMainResults = () => (
    <main className='flex-1 min-w-0' role='main' id='main-results'>
      {/* 1. Results Metadata Header (Title, Filtered Count, etc.) */}
      <div className='mb-3 space-y-4'>
        {/* Dynamic Header Information */}
        <ProductListHeader />

        {/* Global Category Horizontal Navigation */}
        <CategoryFilter />
      </div>

      {/* 2. Dynamic Results Grid Area */}
      <section className='w-full'>{children}</section>
    </main>
  )

  return (
    <div className='container mx-auto p-3 bg-(--color-background-soft) min-h-screen'>
      {/* 1. Primary Site Navigation (Logo + Search) */}
      <Header />

      {/* Sticky Section for Time Slots and Mobile Filters */}
      <div className='sticky top-0 z-40 bg-white -mx-3 px-3 pb-2 pt-1'>
        <Suspense fallback={<div className='h-[50px]' />}>
          <MobileSearchBar />
        </Suspense>

        {/* 2. Global Event Context Slots (Shared across all product pages) */}
        <SaleTimeSlots />

        {/* 3. Responsive Filter Management Interface */}
        {renderMobileControls()}
      </div>

      {/* 4. Core Page Shell Layout */}
      <div className='md:pt-6 pb-12' id='main-content'>
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Persistent Sidebar Filter (Desktop) */}
          {renderSidebar()}

          {/* Search Results Main Column */}
          {renderMainResults()}
        </div>
      </div>

      {/* 5. Modal Layer Core (Bottom sheets, Overlays, etc.) */}
      <Suspense fallback={null}>
        <ProductFilterModals />
      </Suspense>
    </div>
  )
}

export default MainLayout
