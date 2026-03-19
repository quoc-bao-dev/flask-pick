import MainLayout from '@/components/layouts/MainLayout'
import { PropsWithChildren } from 'react'

const ProductLayout = ({ children }: PropsWithChildren) => {
  return <MainLayout>{children}</MainLayout>
}

export default ProductLayout
