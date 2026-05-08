'use client'

import { useState, useEffect } from 'react'
import { BalanceIcon } from '@/components/icons/BalanceIcon'
import { FlashIcon } from '@/components/icons/FlashIcon'
import { SparkleIcon } from '@/components/icons/SparkleIcon'
import { StarSmallIcon } from '@/components/icons/StarSmallIcon'
import { formatCurrency } from '@/core/utils/format'
import { formatCountdown } from '@/core/utils/date'
import { Product } from '../types'

/**
 * ProductCountdown component - Isolated for optimization
 */
const ProductCountdown = ({ endTime }: { endTime: string }) => {
  const [timeLeft, setTimeLeft] = useState(() => formatCountdown(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatCountdown(endTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return <p className='text-[#DF1C41]'>{timeLeft}</p>
}

/**
 * Props for the ProductCard component
 */
interface ProductCardProps {
  product: Product
}

/**
 * ProductCard component
 * Responsibility: Display detailed information about a single product in the grid.
 *
 * @param {Product} product - The product data to display
 * @returns {JSX.Element} The rendered component
 */
const ProductCard = ({ product }: ProductCardProps) => {
  // --- Render Helpers ---

  const renderTopLabel = (type: 'mall' | 'favorite') => {
    if (type === 'mall') {
      return (
        <div className='absolute left-0 top-0 z-10 rounded-tl-[4px] rounded-br-[4px] bg-[#e21942] px-[6px] py-[2px] text-[12px] font-medium text-white'>
          Mall
        </div>
      )
    }

    return (
      <div className='absolute left-0 top-0 z-10 rounded-tl-[4px] rounded-br-[4px] bg-[#f8c16b] px-[6px] py-[2px] text-[12px] font-medium text-[#111625]'>
        Yêu thích
      </div>
    )
  }

  const renderBottomLabel = (type: 'cheaper' | 'stable') => {
    if (type === 'cheaper') {
      return (
        <div
          className='absolute left-0 bottom-0 z-10 flex items-center gap-1 rounded-tr-[4px] rounded-bl-[4px] bg-(--color-orange-1) px-[6px] py-[2px] text-[12px] font-medium text-white'
          style={{
            border: '1px solid',
            borderImageSource:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)',
          }}
        >
          <SparkleIcon className='h-3 w-3 text-white' />
          <p>Rẻ hơn lịch sử</p>
        </div>
      )
    }

    return (
      <div
        className='absolute left-0 bottom-0 z-10 flex items-center gap-1 rounded-tr-[4px] rounded-bl-[4px] bg-[#0e1624] px-[6px] py-[2px] text-[12px] font-medium text-white'
        style={{
          border: '1px solid',
          borderImageSource:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <BalanceIcon className='h-4 w-4' />
        Giá không đổi
      </div>
    )
  }

  const renderActionButton = (type: 'sale' | 'notify' | 'disable') => {
    if (type === 'sale') {
      return (
        <div className='mt-auto pt-3'>
          <div className='flex items-center gap-2' aria-hidden='true'>
            <div className='relative h-2 flex-1 rounded-full bg-[#FFE6CC]'>
              <div
                className='absolute left-0 top-0 h-full rounded-full'
                style={{
                  width: `${(product.sold / product.total) * 100}%`,
                  background:
                    'linear-gradient(303.52deg, #FF9800 4.88%, #F15024 13.95%, #FF8500 54.25%, #FFA726 95.56%, #F15024 105.63%)',
                }}
              >
                <div className='absolute right-0 top-1/2 flex translate-x-1/2 -translate-y-1/2 items-center justify-center'>
                  <FlashIcon />
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-between items-center text-[12px] md:text-sm mt-3'>
            <p className='text-[#596881]'>
              {product.sold}/{product.total} đã bán
            </p>
            {product.flashSaleEnd ? (
              <ProductCountdown endTime={product.flashSaleEnd} />
            ) : (
              <p className='text-[#DF1C41]'>{product.timeRemaining}</p>
            )}
          </div>
        </div>
      )
    }

    if (type === 'disable') {
      return (
        <div className='mt-auto pt-3'>
          <button
            type='button'
            disabled
            className='cursor-not-allowed border border-[#DEE4EE] text-(--color-gray-4) bg-[#F7F9FB] rounded-lg md:px-4 py-2 text-sm w-full font-medium transition-colors duration-200 focus:outline-none'
            aria-label={`Hết phiên sale: ${product.title}`}
          >
            {product.buttonText}
          </button>
        </div>
      )
    }

    return (
      <div className='mt-auto pt-3'>
        <button
          type='button'
          className=' truncate cursor-pointer border border-(--color-orange-1) text-(--color-orange-1) rounded-lg  md:px-4 py-2 text-sm w-full font-medium hover:bg-(--color-orange-1) hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-(--color-orange-1) focus:ring-offset-1'
          aria-label={`Nhắc tôi săn sale: ${product.title}`}
        >
          {product.buttonText}
        </button>
      </div>
    )
  }

  return (
    <article className='flex h-full flex-col gap-3 rounded-xl border border-(--color-border-1) bg-white p-3 transition-all hover:shadow-md'>
      {/* Product Image Wrapper */}
      <div className='relative w-full overflow-hidden rounded-[4px] aspect-square'>
        {product.topLabel && renderTopLabel(product.topLabel)}
        <img
          src={product.image}
          alt={product.title}
          className='h-full w-full object-cover transition-transform hover:scale-105'
          loading='lazy'
          title={product.title}
        />
        {product.bottomLabel && renderBottomLabel(product.bottomLabel)}
      </div>

      {/* Product Information */}
      <div className='flex flex-col flex-1'>
        <h3 className='text-[14px] leading-[150%] text-(--color-text-strong) line-clamp-2 min-h-[40px]'>
          {product.title}
        </h3>

        {/* Pricing */}
        <div className='flex items-center gap-2 mt-2'>
          <span className='text-sm text-(--color-gray-3) line-through'>
            {formatCurrency(product.originalPrice)}
          </span>
          <div className='rounded-md bg-[#FBE6C4] px-2 py-1 text-xs font-semibold text-[#DF1C41]'>
            -{product.discountPercent}%
          </div>
        </div>

        {/* Rating and Current Price */}
        <div className='flex items-center justify-between mt-1'>
          <span className='text-[16px] md:text-[24px] font-medium text-(--color-orange-1)'>
            {formatCurrency(product.currentPrice)}
          </span>
          <div className='flex items-center gap-1 text-(--color-gray-3)'>
            <StarSmallIcon />
            <span className='text-sm'>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {renderActionButton(product.type)}
      </div>
    </article>
  )
}

/**
 * ProductCardSkeleton component
 * Responsibility: Provide a loading placeholder that mirrors the ProductCard layout.
 *
 * @returns {JSX.Element} The rendered skeleton component
 */
export const ProductCardSkeleton = () => {
  return (
    <div className='flex h-full flex-col gap-3 rounded-xl border border-(--color-border-1) bg-white p-3' aria-hidden="true">
      {/* Image Skeleton */}
      <div className='relative w-full aspect-square overflow-hidden rounded-[4px] bg-gray-100 animate-pulse' />

      {/* Info Skeleton */}
      <div className='flex flex-col flex-1 space-y-3'>
        {/* Title */}
        <div className='space-y-2'>
          <div className='h-4 w-full bg-gray-100 animate-pulse rounded' />
          <div className='h-4 w-2/3 bg-gray-100 animate-pulse rounded' />
        </div>

        {/* Pricing */}
        <div className='flex items-center gap-2 mt-2'>
          <div className='h-4 w-16 bg-gray-100 animate-pulse rounded' />
          <div className='h-6 w-12 bg-gray-100 animate-pulse rounded-md' />
        </div>

        {/* Rating and Price */}
        <div className='flex items-center justify-between mt-1'>
          <div className='h-8 w-24 bg-gray-100 animate-pulse rounded' />
          <div className='h-4 w-10 bg-gray-100 animate-pulse rounded' />
        </div>

        {/* Action Area */}
        <div className='mt-auto pt-3 space-y-3'>
          <div className='h-2 w-full bg-gray-100 animate-pulse rounded-full' />
          <div className='flex justify-between items-center mt-3'>
            <div className='h-4 w-20 bg-gray-100 animate-pulse rounded' />
            <div className='h-4 w-16 bg-gray-100 animate-pulse rounded' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
