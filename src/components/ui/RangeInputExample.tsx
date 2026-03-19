'use client'

import { useState } from 'react'
import RangeInput from './RangeInput'

const RangeInputExample = () => {
  const [value, setValue] = useState<[number, number]>([20, 80])

  return (
    <div className='p-10 max-w-md'>
      <h1 className='text-2xl font-bold mb-6'>Range Input Example</h1>
      <RangeInput
        min={0}
        max={100}
        value={value}
        onChange={setValue}
      />
      <div className='mt-4 text-gray-600'>
        Selected: {value[0]} - {value[1]}
      </div>
    </div>
  )
}

export default RangeInputExample
