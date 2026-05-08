'use client'

import React, { ReactNode, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const Tooltip = ({ content, children, position = 'bottom', className = '' }: TooltipProps) => {
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  const calcPosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const tt = tooltipRef.current.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = rect.top - tt.height - 8
        left = rect.left + rect.width / 2 - tt.width / 2
        break
      case 'bottom':
        top = rect.bottom + 8
        left = rect.left + rect.width / 2 - tt.width / 2
        break
      case 'left':
        top = rect.top + rect.height / 2 - tt.height / 2
        left = rect.left - tt.width - 8
        break
      case 'right':
        top = rect.top + rect.height / 2 - tt.height / 2
        left = rect.right + 8
        break
    }

    setCoords({ top, left })
  }, [position])

  const [isVisible, setIsVisible] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
    setCoords(null) // reset so tooltip mounts invisible first
    // Wait two frames: one to mount, one to measure
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        calcPosition()
      })
    })
  }, [calcPosition])

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setIsVisible(false)
    setCoords(null)
  }, [])

  // Hide on scroll
  React.useEffect(() => {
    if (isVisible) {
      const onScroll = () => { setIsVisible(false); setCoords(null) }
      window.addEventListener('scroll', onScroll, true)
      return () => window.removeEventListener('scroll', onScroll, true)
    }
  }, [isVisible])

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-black',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-black',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-black',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-black',
  }

  // Phase 1: coords === null → mounted but invisible (for measuring)
  // Phase 2: coords !== null → visible with slide-up animation
  const isPositioned = coords !== null

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative inline-flex items-center ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {isVisible && typeof document !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: isPositioned ? coords.top : -9999,
            left: isPositioned ? coords.left : -9999,
            opacity: isPositioned ? 1 : 0,
            transform: isPositioned ? 'translateY(0)' : 'translateY(6px)',
            transition: isPositioned ? 'opacity 150ms ease-out, transform 150ms ease-out' : 'none',
            pointerEvents: 'none',
          }}
          className='z-[9999] px-2.5 py-1.5 text-[12px] font-medium text-white bg-black rounded shadow-lg max-w-[200px] whitespace-normal break-words'
        >
          {content}
          <div
            className={`absolute border-[5px] border-transparent pointer-events-none ${arrowClasses[position]}`}
          />
        </div>,
        document.body
      )}
    </>
  )
}

export default Tooltip
