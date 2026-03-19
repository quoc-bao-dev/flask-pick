'use client'

import BaseBottomSheet from './BaseBottomSheet'

import { useState } from 'react'

interface TypeFilterBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  onApply: (selectedTypes: string[]) => void
  onReset: () => void
}

const TYPE_OPTIONS = [
  { key: 'cheaper', label: 'Rẻ hơn lịch sử', count: 69 },
  { key: 'stable', label: 'Giá không đổi', count: 69 },
]

const TypeFilterBottomSheet = ({
  isOpen,
  onClose,
  onApply,
  onReset,
}: TypeFilterBottomSheetProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

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
      <div className='space-y-3'>
        {TYPE_OPTIONS.map((option) => (
          <label key={option.key} className='flex items-center justify-between cursor-pointer'>
            <div className='flex items-center gap-2'>
              <span className='text-[14px] font-semibold text-(--color-text-strong)'>
                {option.label}
              </span>
              <span className='text-[14px] text-gray-3'>({option.count})</span>
            </div>
            <input
              type='checkbox'
              checked={selectedTypes.includes(option.key)}
              onChange={() => toggleType(option.key)}
              className='w-5 h-5 rounded border-(--color-border-1) accent-(--color-orange-1) focus:ring-(--color-orange-1)'
            />
          </label>
        ))}
      </div>
    </BaseBottomSheet>
  )
}

export default TypeFilterBottomSheet
