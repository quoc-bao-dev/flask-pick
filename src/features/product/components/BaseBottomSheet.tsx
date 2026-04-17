'use client'

import { useEffect, useState, ReactNode } from 'react'
import { CloseIcon } from '@/components/icons/CloseIcon'

interface BaseBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

const BaseBottomSheet = ({ isOpen, onClose, title, children, footer }: BaseBottomSheetProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Handle mount/unmount for animations
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => setIsMounted(false), 300) // Match duration-300
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // lock background scroll when sheet is open
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  if (!isMounted && !isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-[2px]  ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg flex flex-col max-h-[90vh] transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='flex items-center justify-center'>
          <div className='h-[5px] w-[36px] bg-[#0A0D1433] rounded-full mt-4'></div>
        </div>
        {/* Header */}
        <div className='sticky top-0 bg-white  px-4 py-4 flex items-center justify-between z-10'>
          <h2 className='text-[16px] font-medium text-[#111625]'>{title}</h2>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors'
            aria-label='Close'
            title='Đóng'
          >
            <CloseIcon size={24} />
          </button>
        </div>
        <div className='w-full px-4'>
          <div className='h-px bg-(--color-border-1) '></div>
        </div>

        {/* Content */}
        <div className='relative flex-1 px-4 py-4 space-y-6 overflow-y-auto overflow-x-hidden max-w-full custom-scrollbar'>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className='sticky bottom-0 bg-white border-t border-(--color-border-1) px-4 py-4 flex gap-3'>
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

export default BaseBottomSheet
