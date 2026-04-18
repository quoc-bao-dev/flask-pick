'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { CameraIcon } from '@/components/icons/CameraIcon'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import { StarSmallIcon } from '@/components/icons/StarSmallIcon'
import { useFilterProductStore } from '../store/filterProductStore'
import { mockProducts } from '@/core/constant/products'
import { formatCurrency } from '@/core/utils/format'
import Image from 'next/image'

/**
 * MobileSearchOverlay component
 * Responsibility: Provide a full-screen search interface for mobile devices.
 * Based on Figma design: https://www.figma.com/design/dd96wTQBmpmT6EwEg8UqMj/Flash-Pick---Shopee-Flash-sale?node-id=723-13612
 * 
 * @returns {JSX.Element} The rendered component
 */
const MobileSearchOverlay = () => {
  const router = useRouter()
  const { isMobileSearchOpen, setIsMobileSearchOpen } = useFilterProductStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [recentSearches, setRecentSearches] = useState([
    'Tai nghe',
    'Loa bluetooth',
    'Dây sạc type C',
    'tuần lộc nhồi bông',
    'trái châu noel',
    'bao lì xì',
  ])

  // Block body scroll when overlay is open
  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileSearchOpen])

  if (!isMobileSearchOpen) return null

  const handleSearch = (query: string) => {
    if (!query.trim()) return
    setIsMobileSearchOpen(false)
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  const handleClearRecent = () => {
    setRecentSearches([])
  }

  const handleClose = () => {
    setIsMobileSearchOpen(false)
  }

  return (
    <div className='fixed inset-0 z-[100] bg-white flex flex-col'>
      {/* Header with Back Button and Search Input */}
      <header className='flex items-center gap-3 px-4 py-3'>
        <button
          onClick={handleClose}
          className='p-1 -ml-1 text-(--color-gray-2)'
          aria-label='Quay lại'
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className='flex-1 flex items-center gap-2 px-3 py-2 border-2 border-(--color-orange-1) rounded-xl bg-white'>
          <button onClick={() => handleSearch(searchTerm)}>
            <SearchIcon size={18} color='#8796AF' />
          </button>
          <input
            autoFocus
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchTerm)
              }
            }}
            placeholder='Tìm kiếm sản phẩm, shop'
            className='flex-1 bg-transparent text-[14px] text-(--color-text-strong) outline-none placeholder:text-(--color-gray-4)'
          />
          <div className='flex items-center gap-2'>
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className='p-1'>
                <CloseIcon size={14} color='#8796AF' />
              </button>
            )}
            <div className='p-1.5 bg-(--color-primary-50) rounded-md'>
              <CameraIcon size={16} color='#F15024' />
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
        {/* Recent Searches Section */}
        {recentSearches.length > 0 && (
          <section>
            <div className='flex items-center justify-between mb-3'>
              <h2 className='text-[14px] font-semibold text-(--color-text-strong) tracking-tight'>
                Tìm kiếm gần đây
              </h2>
              <button
                onClick={handleClearRecent}
                className='text-(--color-gray-3) hover:text-red-500 transition-colors'
              >
                <TrashIcon size={20} />
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className='px-3 py-1.5 bg-(--color-surface-50) rounded-[10px] text-[12px] text-(--color-text-strong) hover:bg-gray-200/80 transition-colors'
                >
                  {term}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Product Suggestions Section */}
        <section>
          <h2 className='text-[14px] font-semibold text-(--color-text-strong) mb-3 tracking-tight'>
            Gợi ý sản phẩm
          </h2>
          <div className='space-y-3'>
            {mockProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                onClick={() => handleSearch(product.title)}
                className='flex gap-3 p-3 border border-(--color-border-1) rounded-xl bg-white active:bg-gray-50 transition-colors cursor-pointer'
              >
                <div className='relative size-[80px] shrink-0 rounded-md overflow-hidden bg-gray-100'>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='flex-1 flex flex-col justify-between min-w-0'>
                  <h3 className='text-[13px] text-(--color-text-strong) line-clamp-2 leading-tight'>
                    {product.title}
                  </h3>
                  <div className='flex items-end justify-between mt-1'>
                    <div>
                      <div className='flex items-center gap-2 mb-0.5'>
                        <span className='text-[12px] text-(--color-gray-4) line-through'>
                          {formatCurrency(product.originalPrice)}đ
                        </span>
                        <span className='px-1 py-0.5 bg-[#FBE6C4] rounded-[4px] text-[10px] font-medium text-[#DF1C41]'>
                          -{product.discountPercent}%
                        </span>
                      </div>
                      <div className='text-[16px] font-medium text-(--color-orange-1)'>
                        {formatCurrency(product.currentPrice)} <span className='text-[12px] font-medium underline -ml-1'>đ</span>
                      </div>
                    </div>
                    <div className='flex items-center gap-0.5 text-[#FFB800]'>
                      <StarSmallIcon size={14} />
                      <span className='text-[12px] font-medium text-(--color-gray-2)'>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default MobileSearchOverlay
