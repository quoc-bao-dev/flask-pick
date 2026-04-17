import { useEffect, useState } from 'react'

interface DiscountExplanationModalProps {
  isOpen: boolean
  onClose: () => void
}

const DiscountExplanationModal = ({ isOpen, onClose }: DiscountExplanationModalProps) => {
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
      const timer = setTimeout(() => setIsMounted(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return
    // Prevent double-locking if a parent bottom sheet already locked it,
    // but just to be safe:
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  if (!isMounted && !isOpen) return null

  return (
    <div className='fixed inset-0 z-60 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out backdrop-blur-[2px] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative z-10 w-[264px] bg-white rounded-xl flex flex-col transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
        }`}
        style={{
          padding: '20px 16px',
          gap: '8px',
        }}
        role='dialog'
        aria-modal='true'
        aria-labelledby='discount-modal-title'
      >
        <h2 id='discount-modal-title' className='text-[16px] font-medium text-[#111625] w-full'>
          Loại giảm giá
        </h2>

        <div className='flex flex-col' style={{ gap: '4px' }}>
          <p className='text-[14px] text-[#111625] font-medium leading-[21px]'>
            • Rẻ hơn lịch sử:{' '}
            <span className='font-normal text-(--color-gray-2)'>
              Giá thấp hơn mức trung bình 30 ngày qua (Deal hời)
            </span>
          </p>
          <p className='text-[14px] text-[#111625] font-medium leading-[21px] mt-1'>
            • Giá không đổi:{' '}
            <span className='font-normal text-(--color-gray-2)'>
              Giá bằng hoặc cao hơn mức trung bình (Deal ảo/Chưa giảm)
            </span>
          </p>
        </div>

        <div className='flex justify-end mt-2'>
          <button
            type='button'
            onClick={onClose}
            className='text-[14px] font-medium text-[#F15024] px-2 py-1 -mr-2 outline-none active:opacity-80 transition-opacity'
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  )
}

export default DiscountExplanationModal
