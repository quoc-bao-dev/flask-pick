'use client'

import Checkbox from '@/components/ui/Checkbox'
import BaseBottomSheet from './BaseBottomSheet'

import { useState } from 'react'

interface DiscountFilterBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  onApply: (selectedDiscounts: string[]) => void
  onReset: () => void
}

const DISCOUNT_OPTIONS = [
  { key: 'over50', label: 'Giảm sốc (Trên 50%)', count: 69 },
  {
    key: '30-50',
    label: 'Giảm sâu (30% - 50%)',
    count: 69,
  },
  {
    key: '10-30',
    label: 'Giảm vừa (10% - 30%)',
    count: 69,
  },
  { key: 'under10', label: 'Giảm ít (Dưới 10%)', count: 69 },
]

const DiscountFilterBottomSheet = ({
  isOpen,
  onClose,
  onApply,
  onReset,
}: DiscountFilterBottomSheetProps) => {
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([])

  const toggleDiscountPercentage = (key: string) => {
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
        {DISCOUNT_OPTIONS.map((option) => (
          <label key={option.key} className='flex items-center justify-between cursor-pointer'>
            <div className='flex items-center gap-2'>
              <span className='text-[14px] text-(--color-text-strong)'>{option.label}</span>
              <span className='text-[14px] text-gray-3'>({option.count})</span>
            </div>
            <Checkbox
              checked={selectedDiscounts.includes(option.key)}
              onChange={() => toggleDiscountPercentage(option.key)}
            />
          </label>
        ))}
      </div>
    </BaseBottomSheet>
  )
}

export default DiscountFilterBottomSheet
