'use client'

import Checkbox from '@/components/ui/Checkbox'
import Tooltip from '@/components/ui/Tooltip'
import { ReactNode } from 'react'

export interface FilterOption {
  key: string
  label: string
  count?: number
  tooltip?: string
  icon?: ReactNode
}

interface FilterCheckboxGroupProps {
  title: string
  options: FilterOption[]
  selectedValues: string[]
  onChange: (key: string) => void
}

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className='text-[14px] leading-[28px] tracking-normal text-(--color-gray-2) mb-3 uppercase'>
    {title}
  </h3>
)

export const FilterCheckboxGroup = ({
  title,
  options,
  selectedValues,
  onChange,
}: FilterCheckboxGroupProps) => {
  return (
    <section>
      <SectionTitle title={title} />
      <div className='space-y-3'>
        {options.map((option) => (
          <label
            key={option.key}
            className='flex items-center justify-between cursor-pointer group'
          >
            <div className='flex items-center gap-2'>
              {option.icon}
              {option.tooltip ? (
                <Tooltip content={option.tooltip}>
                  <span className='text-[14px] font-medium text-(--color-text-strong) underline decoration-wavy decoration-[#8796AF]/50 decoration-1 underline-offset-4 group-hover:text-(--color-orange-1) transition-colors'>
                    {option.label}
                  </span>
                </Tooltip>
              ) : (
                <span className='text-[14px] font-medium text-(--color-text-strong) group-hover:text-(--color-orange-1) transition-colors'>
                  {option.label}
                </span>
              )}
            </div>
            <Checkbox
              checked={selectedValues.includes(option.key)}
              onChange={() => onChange(option.key)}
            />
          </label>
        ))}
      </div>
    </section>
  )
}
