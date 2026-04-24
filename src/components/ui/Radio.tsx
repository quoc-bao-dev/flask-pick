'use client'

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // You can add more props here if needed in the future
}

/**
 * Radio component
 * Responsibility: Provide a custom-styled radio button matching the Figma design.
 * 
 * @param {RadioProps} props - Component props
 * @returns {JSX.Element} The rendered component
 */
const Radio = ({ className = '', ...props }: RadioProps) => {
  return (
    <input
      type='radio'
      className={`w-5 h-5 border-2 border-[#DEE4EE] rounded-full appearance-none cursor-pointer bg-white checked:border-(--color-orange-1) relative checked:after:content-[""] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-(--color-orange-1) checked:after:rounded-full transition-all ${className}`}
      {...props}
    />
  )
}

export default Radio
