import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Flash Pick - Shopee Flash Sale & Deal Hời Mỗi Ngày',
    template: '%s | Flash Pick'
  },
  description: 'Khám phá Flash Pick - Nơi tổng hợp các deal hời, Flash Sale Shopee hấp dẫn nhất mỗi ngày. Mua sắm thông minh, tiết kiệm tối đa cùng Flash Pick.',
  keywords: ['flash sale', 'shopee deals', 'mua sắm online', 'giảm giá', 'deal hời', 'flash pick'],
  authors: [{ name: 'Flash Pick Team' }],
  creator: 'Flash Pick',
  publisher: 'Flash Pick',
  alternates: {
    canonical: 'https://flashpick.vn',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Flash Pick - Shopee Flash Sale & Deal Hời Mỗi Ngày',
    description: 'Săn deal hời mỗi ngày cùng Flash Pick. Tổng hợp Flash Sale Shopee mới nhất.',
    url: 'https://flash-pick.vn',
    siteName: 'Flash Pick',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Flash Pick - Shopee Flash Sale & Deal Hời Mỗi Ngày',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flash Pick - Shopee Flash Sale & Deal Hời Mỗi Ngày',
    description: 'Săn deal hời mỗi ngày cùng Flash Pick. Tổng hợp Flash Sale Shopee mới nhất.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Flash Pick - Shopee Flash Sale & Deal Hời Mỗi Ngày',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vi'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
