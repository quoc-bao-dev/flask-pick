'use client'

import { useUiProductStore } from '@/features/product/store/uiProductStore'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { CameraIcon } from '@/components/icons/CameraIcon'
import { useSearchParams } from 'next/navigation'

/**
 * MobileSearchBar component
 * Responsibility: Provide a compact, visually distinct search input for mobile devices.
 * Features a back button and a themed search input with an orange border and camera icon.
 * Triggers the full-screen search overlay on click.
 * 
 * @returns {JSX.Element} The rendered component
 */
const MobileSearchBar = () => {
  const { setIsMobileSearchOpen } = useUiProductStore()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') || ''

  return (
    <div
      className='pt-3 pb-1 px-1 flex items-center gap-3 xl:hidden'
      aria-label='Mobile Search Section'
    >
      {/* Search Input Container */}
      <div
        onClick={() => setIsMobileSearchOpen(true)}
        className='flex-1 flex items-center gap-2 px-3 py-2 border-2 border-(--color-orange-1) rounded-xl bg-white cursor-pointer active:scale-[0.98] transition-transform'
      >
        <SearchIcon size={18} color='#8796AF' />
        <span className={`flex-1 text-[14px] line-clamp-1 ${urlQuery ? 'text-(--color-text-strong) font-medium' : 'text-(--color-gray-4)'}`}>
          {urlQuery || 'Tìm kiếm sản phẩm, shop'}
        </span>
        <div className='p-1.5 bg-(--color-primary-50) rounded-md'>
          <CameraIcon size={16} color='#F15024' />
        </div>
      </div>
    </div>
  )
}

export default MobileSearchBar
