'use client'

import Radio from '@/components/ui/Radio'

interface RadioOption {
  key: string
  label: string
}

interface FilterRadioGroupProps {
  title: string
  name: string
  options: RadioOption[]
  selectedValue: string
  onChange: (key: string) => void
}

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className='text-[14px] leading-[28px] tracking-normal text-(--color-gray-2) mb-3 uppercase'>
    {title}
  </h3>
)

export const FilterRadioGroup = ({
  title,
  name,
  options,
  selectedValue,
  onChange,
}: FilterRadioGroupProps) => {
  return (
    <section aria-labelledby={`${name}-label`}>
      <SectionTitle title={title} />
      <div className='space-y-3 font-medium'>
        {options.map((option) => (
          <label
            key={option.key}
            className='flex justify-between items-center cursor-pointer group'
          >
            <span className='text-[14px] text-[#111625] group-hover:text-(--color-orange-1) transition-colors'>
              {option.label}
            </span>
            <Radio
              name={name}
              value={option.key}
              checked={selectedValue === option.key}
              onChange={() => onChange(option.key)}
            />
          </label>
        ))}
      </div>
    </section>
  )
}
