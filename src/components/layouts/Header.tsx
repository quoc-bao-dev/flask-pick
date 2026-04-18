'use client'

import { _Image } from '@/core/constant/asset'
import Logo from '../ui/Logo'
import DesktopSearch from '../ui/DesktopSearch'
import MobileSearchBar from '../ui/MobileSearchBar'
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
  // --- Render Sections ---

  /**
   * Social Links Section
   */
  const renderSocialLinks = () => {
    const SOCIAL_PLATFORMS = [
      { icon: _Image.threads, name: 'Threads', url: '#' },
      { icon: _Image.telegram, name: 'Telegram', url: '#' },
      { icon: _Image.facebook, name: 'Facebook', url: '#' },
      { icon: _Image.zalo, name: 'Zalo', url: '#' },
    ]

    return (
      <nav className='flex items-center gap-2' aria-label='Social links'>
        {SOCIAL_PLATFORMS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex size-[40px] items-center justify-center rounded-[10px] border border-(--color-gray-1) bg-white/50 transition-all hover:bg-(--color-primary-50) hover:border-(--color-orange-1) focus:outline-none focus:ring-2 focus:ring-(--color-orange-1)'
            aria-label={`Theo dõi chúng tôi trên ${social.name}`}
            title={`Theo dõi ${social.name}`}
          >
            <img
              src={social.icon}
              alt={`${social.name} icon`}
              className='size-[18px] object-contain'
              loading='lazy'
            />
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
        <DesktopSearch />

        {/* Social Communities Navigation */}
        {renderSocialLinks()}
      </header>
    </div>
  )
}

export default Header
