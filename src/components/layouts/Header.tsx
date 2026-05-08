'use client'

import { Suspense } from 'react'
import { _Image } from '@/core/constant/asset'
import Logo from '../ui/Logo'
import DesktopSearch from '../ui/DesktopSearch'
import MobileSearchBar from '../ui/MobileSearchBar'
import { useSocialContentQuery } from '@/services/common'
import Link from 'next/link'

/**
 * Global Header component
 * Responsibility: Provide the main navigation shell for the application.
 * Contains branding (Logo), search functionality (DesktopSearch),
 * and community/social links.
 *
 * @returns {JSX.Element} The rendered header
 */
const Header = () => {
  const { data: socialData } = useSocialContentQuery()

  // --- Render Sections ---

  /**
   * Social Links Section
   */
  const renderSocialLinks = () => {
    const SOCIAL_PLATFORMS =
      socialData?.data.map((social) => ({
        icon: _Image[social.code as keyof typeof _Image] as string,
        name: social.platform,
        url: social.href,
        label: social.label,
      })) || []

    return (
      <nav className='flex items-center gap-2' aria-label='Social links'>
        {SOCIAL_PLATFORMS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex size-[40px] items-center justify-center rounded-[10px] border border-(--color-gray-1) bg-white/50 transition-all hover:bg-(--color-primary-50) hover:border-(--color-orange-1) focus:outline-none focus:ring-2 focus:ring-(--color-orange-1)'
            aria-label={social.label}
            title={social.label}
          >
            {social.icon && (
              <img
                src={social.icon}
                alt={`${social.name} icon`}
                className='size-[18px] object-contain'
                loading='lazy'
              />
            )}
          </a>
        ))}
      </nav>
    )
  }

  return (
    <div>
      <header className='flex items-center justify-between py-2'>
        {/* Brand Branding (Logo) */}
        <Link href='/'>
          <Logo aria-label='Flask Pick Home' />
        </Link>

        {/* Main Desktop Search Container (Hidden on small screens) */}
        <Suspense fallback={<div className='flex-1 mx-16' />}>
          <DesktopSearch />
        </Suspense>

        {/* Social Communities Navigation */}
        {renderSocialLinks()}
      </header>
    </div>
  )
}

export default Header
