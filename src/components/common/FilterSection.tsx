
/**
 * SectionTitle component
 * Responsibility: Provide a consistent, themed heading for filter sections.
 */
export const SectionTitle = ({ title, className = '' }: { title: string; className?: string }) => (
  <h3 className={`text-[14px] leading-[28px] tracking-normal text-(--color-gray-2) mb-3 uppercase ${className}`}>
    {title}
  </h3>
);

/**
 * PriceDisplayInput component
 * Responsibility: Provide a styled numeric input for price values with a currency suffix/prefix.
 * Fixed to ensure focus is maintained and formatting is smooth.
 */
export const PriceDisplayInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: number;
  onChange: (val: string) => void;
  placeholder: string;
}) => {
  const displayValue = value === 0 ? '' : value.toLocaleString('vi-VN');

  return (
    <div className='relative flex border border-(--color-border-1) rounded-[10px] bg-white transition-shadow focus-within:shadow-sm overflow-hidden'>
      <div className='px-3 flex items-center bg-[#F7F9FB] border-r border-(--color-border-1) text-(--color-gray-2) text-[14px] font-medium pointer-events-none select-none'>
        ₫
      </div>
      <input
        type='text'
        inputMode='numeric'
        value={displayValue}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/[^\d]/g, '');
          onChange(rawValue);
        }}
        className='flex-1 w-full min-w-0 px-3 py-2 text-[14px] font-medium text-(--color-text-strong) outline-none'
        placeholder={placeholder}
      />
    </div>
  );
};
