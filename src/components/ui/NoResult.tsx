'use client'
import { _Image } from '@/core/constant/asset'

interface NoDataProps {
  title?: string
  content?: string
}

const NoResult = ({
  title = 'Không tìm thấy kết quả cho “Lorem ipsum”',
  content = 'Rất tiếc, hệ thống không tìm thấy sản phẩm nào khớp với từ khóa này. Hãy thử kiểm tra lỗi chính tả hoặc chỉnh sửa từ khóa tìm kiếm.',
}: NoDataProps) => {
  return (
    <div className='flex flex-col items-center justify-center py-12 px-4'>
      {/* Illustration placeholder - có thể thay bằng hình ảnh thực tế sau */}
      <div className='mb-6 w-48 h-48 flex items-center justify-center'>
        {/* Placeholder cho illustration - sẽ được thay thế bằng SVG hoặc image */}
        <img
          src={_Image['no-result']}
          alt='No Data'
          width={250}
          height={250}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Title */}
      <h3 className='text-[16px] font-medium leading-4 text-center text-gray-2 mb-3'>{title}</h3>

      {/* Content */}
      <p className='text-[14px] font-normal leading-6 text-center text-[var(--color-gray-2)] max-w-md'>
        {content}
      </p>
    </div>
  )
}

export default NoResult
