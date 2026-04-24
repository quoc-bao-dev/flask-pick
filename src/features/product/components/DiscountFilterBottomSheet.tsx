'use client'

import Checkbox from '@/components/ui/Checkbox'

import { useDiscountTypesQuery } from '@/services/discount-type'
import { useEffect, useState } from 'react'
import BaseBottomSheet from './BaseBottomSheet'

interface DiscountFilterBottomSheetProps {
  isOpen: boolean
  initialSelected?: string[]
  onClose: () => void
  onApply: (selectedDiscounts: string[]) => void
  onReset: () => void
}

const DiscountFilterBottomSheet = ({
  isOpen,
  initialSelected = [],
  onClose,
  onApply,
  onReset,
}: DiscountFilterBottomSheetProps) => {
  // --- Hooks ---
  const { data: discountTypes } = useDiscountTypesQuery()

  // --- State ---
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>(initialSelected)

  // Sync state when opening with fresh store values
  useEffect(() => {
    if (isOpen) {
      setSelectedDiscounts(initialSelected)
    }
  }, [isOpen, initialSelected])

  const toggleDiscount = (key: string) => {
    setSelectedDiscounts((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    )
  }

  const handleReset = () => {
    setSelectedDiscounts([])
    onReset()
  }

  const handleApply = () => {
    onApply(selectedDiscounts)
    onClose()
  }

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title='% GIẢM GIÁ'
      footer={
        <>
          <button
            onClick={handleReset}
            className='flex-1 px-4 py-3 border border-(--color-border-1) rounded-lg text-[14px] font-semibold text-(--color-text-strong) hover:bg-gray-50 transition-colors'
          >
            Thiết lập lại
          </button>
          <button
            onClick={handleApply}
            className='flex-1 px-4 py-3 bg-(--color-orange-1) rounded-lg text-[14px] font-semibold text-white hover:opacity-90 transition-opacity'
          >
            Áp dụng
          </button>
        </>
      }
    >
      <div className='space-y-3'>
        {discountTypes?.map((option) => (
          <label key={option.code} className='flex items-center justify-between cursor-pointer'>
            <div className='flex items-center gap-2'>
              <span className='text-[14px] text-(--color-text-strong)'>{option.label}</span>
              <span className='text-[14px] text-gray-3'>(69)</span>
            </div>
            <Checkbox
              checked={selectedDiscounts.includes(option.code)}
              onChange={() => toggleDiscount(option.code)}
            />
          </label>
        ))}
      </div>
    </BaseBottomSheet>
  )
}

export default DiscountFilterBottomSheet
