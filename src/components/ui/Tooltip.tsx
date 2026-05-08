'use client'

import React, { ReactNode, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const Tooltip = ({ content, children, position = 'bottom', className = '' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ top: -9999, left: -9999 }) // Start off-screen

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      
      let top = 0
      let left = 0

      switch (position) {
        case 'top':
          top = rect.top - tooltipRect.height - 8
          left = rect.left + rect.width / 2 - tooltipRect.width / 2
          break
        case 'bottom':
          top = rect.bottom + 8
          left = rect.left + rect.width / 2 - tooltipRect.width / 2
          break
        case 'left':
          top = rect.top + rect.height / 2 - tooltipRect.height / 2
          left = rect.left - tooltipRect.width - 8
          break
        case 'right':
          top = rect.top + rect.height / 2 - tooltipRect.height / 2
          left = rect.right + 8
          break
      }

      setCoords({ top, left })
    }
  }, [isVisible, position])

  // Hide on scroll to prevent detached tooltip
  useEffect(() => {
    if (isVisible) {
      const handleScroll = () => setIsVisible(false)
      window.addEventListener('scroll', handleScroll, true) // capture phase for any scroll
      return () => window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isVisible])

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-black',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-black',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-black',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-black',
  }

  return (
    <>
      <div 
        ref={triggerRef}
        className={`relative inline-flex items-center ${className}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && typeof document !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          style={{ top: coords.top, left: coords.left }}
          className={`fixed z-[9999] px-2.5 py-1.5 text-[12px] font-medium text-white bg-black rounded shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95 duration-200 pointer-events-none`}
        >
          {content}
          <div
            className={`absolute border-[5px] border-transparent pointer-events-none ${arrowClasses[position]}`}
          ></div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Tooltip

