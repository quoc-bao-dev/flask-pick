'use client'

import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { RosetteIcon } from '@/components/icons/RosetteIcon'
import SearchableFilterDropdown from '@/components/common/SearchableFilterDropdown'
import { useEffect, useRef, useState } from 'react'

interface BrandFilterProps {
  title: string
  selectedBrand: string[]
  onSelect: (brand: string[]) => void
  brands: string[]
}

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className='text-[14px] leading-[28px] tracking-normal text-(--color-gray-2) mb-3 uppercase'>
    {title}
  </h3>
)

export const BrandFilter = ({ title, selectedBrand, onSelect, brands }: BrandFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleToggle = (brand: string) => {
    const isSelected = selectedBrand.includes(brand)
    if (isSelected) {
      onSelect(selectedBrand.filter((b) => b !== brand))
    } else {
      onSelect([...selectedBrand, brand])
    }
  }

  return (
    <section className='relative' ref={dropdownRef}>
      <SectionTitle title={title} />
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full mt-2 py-2 px-3 rounded-[10px] border flex gap-2 items-center justify-between transition-all group ${isOpen
          ? 'border-(--color-orange-1) bg-white shadow-sm'
          : 'border-(--color-border-1) bg-white hover:bg-gray-50'
          }`}
        title='Chọn thương hiệu'
      >
        <div className='flex items-center gap-2 flex-1 min-w-0'>
          <RosetteIcon
            size={18}
            color={isOpen ? '#f15024' : '#596881'}
            className=' transition-colors'
          />
          <p className='text-[14px] font-medium text-(--color-gray-2) truncate text-left'>
            {selectedBrand.length > 0 ? selectedBrand.join(', ') : 'Chọn thương hiệu'}
          </p>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-(--color-orange-1)' : 'text-(--color-gray-2)'
            }`}
        />
      </button>

      {isOpen && (
        <SearchableFilterDropdown
          items={brands}
          selectedItems={selectedBrand}
          onToggle={handleToggle}
          placeholder='Tìm thương hiệu...'
          className='absolute top-full left-0 right-0 mt-2 z-50'
        />
      )}
    </section>
  )
}

