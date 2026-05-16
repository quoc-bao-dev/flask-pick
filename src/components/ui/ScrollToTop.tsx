'use client'

import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-6 right-4 lg:right-6 z-50 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110'
      aria-label='Scroll to top'
    >
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.63662 11.5L11 11.5L11 21.5L13 21.5L13 11.5L16.3634 11.5C16.7984 11.5 17.0259 10.9828 16.732 10.6621L12.3686 5.90209C12.1704 5.6859 11.8296 5.6859 11.6314 5.90209L7.26805 10.6621C6.97407 10.9828 7.20157 11.5 7.63662 11.5ZM2.5 4.5L2.5 2.5L21.5 2.5L21.5 4.5L2.5 4.5Z'
          fill='#F15024'
        />
      </svg>
    </button>
  )
}

export default ScrollToTop
