import React, { ReactNode } from 'react'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const Tooltip = ({ content, children, position = 'bottom', className = '' }: TooltipProps) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-black',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-black',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-black',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-black',
  }

  return (
    <div className={`relative flex items-center group/tooltip ${className}`}>
      {children}
      <div
        className={`absolute z-100 hidden group-hover/tooltip:block px-2.5 py-1.5 text-[12px] font-medium text-white bg-black rounded shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95 duration-200 pointer-events-none ${positionClasses[position]}`}
      >
        {content}
        <div
          className={`absolute border-[5px] border-transparent pointer-events-none ${arrowClasses[position]}`}
        ></div>
      </div>
    </div>
  )
}

export default Tooltip
