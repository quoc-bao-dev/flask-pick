import Link from 'next/link'
import { FlashPickIcon } from '../icons/FlashPickIcon'

/**
 * Logo component
 * Responsibility: Provide the main branding for the application.
 * Features a custom SVG icon and the "Flash Pick" brand name.
 * 
 * @returns {JSX.Element} The rendered component
 */
const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="Flash Pick Home"
    >
      <FlashPickIcon className="size-[21px] xl:size-[32px]" />

      <span className="text-center text-base font-semibold leading-none tracking-normal capitalize xl:text-2xl">
        Flash Pick
      </span>
    </Link>
  )
}

export default Logo
