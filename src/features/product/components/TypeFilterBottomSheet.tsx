'use client'

import Checkbox from '@/components/ui/Checkbox'
import Tooltip from '@/components/ui/Tooltip'
import { useDiscountTypesQuery } from '@/services/discount-type'
import { useEffect, useState } from 'react'
import BaseBottomSheet from './BaseBottomSheet'

interface TypeFilterBottomSheetProps {
  isOpen: boolean
  initialSelected?: string[]
  onClose: () => void
  onApply: (selectedTypes: string[]) => void
  onReset: () => void
}

/**
 * TypeFilterBottomSheet component (LOẠI GIẢM GIÁ)
 */
const TypeFilterBottomSheet = ({
  isOpen,
  initialSelected = [],
  onClose,
  onApply,
  onReset,
}: TypeFilterBottomSheetProps) => {
  // --- Hooks ---
  const { data: discountTypes } = useDiscountTypesQuery()

  // --- State ---
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialSelected)

  // Sync state when opening with fresh store values
  useEffect(() => {
    if (isOpen) {
      setSelectedTypes(initialSelected)
    }
  }, [isOpen, initialSelected])

  const toggleType = (key: string) => {
    setSelectedTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    )
  }

  const handleReset = () => {
    setSelectedTypes([])
    onReset()
  }

  const handleApply = () => {
    onApply(selectedTypes)
    onClose()
  }

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title='LOẠI GIẢM GIÁ'
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
      <div className='space-y-4 pt-2 pb-4'>
        {discountTypes?.map((option) => (
          <label
            key={option.code}
            className='flex items-center justify-between cursor-pointer group'
          >
            <div className='flex items-center gap-2'>
              <Tooltip content={option.description}>
                <span className='text-[15px] font-medium text-(--color-text-strong) underline decoration-wavy decoration-[#8796AF]/50 decoration-1 underline-offset-4 group-hover:text-(--color-orange-1) transition-colors'>
                  {option.label}
                </span>
              </Tooltip>
            </div>
            <Checkbox
              checked={selectedTypes.includes(option.code)}
              onChange={() => toggleType(option.code)}
            />
          </label>
        ))}
      </div>
    </BaseBottomSheet>
  )
}

export default TypeFilterBottomSheet
