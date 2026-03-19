'use client'

import SearchInput from './SearchInput'

/**
 * MobileSearchBar component
 * Responsibility: Provide a compact, visually distinct search input for mobile devices.
 * Features a camera icon for visual search and matches the flash sale orange theme.
 * Reuses the common SearchInput component for consistency.
 * 
 * @returns {JSX.Element} The rendered component
 */
const MobileSearchBar = () => {
  return (
    <div className='pt-2 xl:hidden' aria-label='Mobile Search Section'>
      <SearchInput 
        placeholder='Tìm kiếm sản phẩm, shop'
        ariaLabel='Tìm kiếm sản phẩm di động'
      />
    </div>
  )
}

export default MobileSearchBar
