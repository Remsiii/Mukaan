'use client'

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import {
  Dialog,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
  GiftIcon,
  DevicePhoneMobileIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import { auth, type Profile, subscribeToAuthChanges } from '../lib/auth'
import { ScrollProgress } from '../registry/magicui/scroll-progress'
import { AnimatedGradientTextDemo } from './ui/Geizhals'

const navigation = [
  { name: 'PC', href: '/pc', icon: ComputerDesktopIcon },
  { name: 'Apps', href: '/apps', icon: DevicePhoneMobileIcon },
  { name: 'Tipps', href: '/tipps', icon: LightBulbIcon },
  { name: 'Angebote', href: '/angebote', icon: GiftIcon },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Zustand für den Sichtbarkeitsstatus via useScroll
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    auth.getProfile().then(setProfile)
    const unsubscribe = subscribeToAuthChanges(setProfile)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    return scrollY.onChange((latest) => {
      latest > 100 ? setIsScrolled(true) : setIsScrolled(false)
    })
  }, [scrollY])

  const handleLogout = async () => {
    await auth.signOut()
    setProfile(null)
  }

  return (
    <>
      <ScrollProgress className="top-[0px]" />
      <header className="fixed w-full top-0 z-50 transition-transform duration-300 translate-y-0">

        <nav
          aria-label="Global"
          className="flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          {/* Logo links */}
          <div className="flex flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Mukaan</span>
              <motion.img
                alt="Mukaan Logo"
                src="/Mukaan/images/mukaan.png"
                className="h-20 w-auto animate-scaleUpDown"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </div>

          {/* Desktop Navigation zentriert */}
          <div className="hidden lg:flex flex-1 justify-center">
            <AnimatedGradientTextDemo />
            <PopoverGroup className="flex gap-x-12">
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ touchAction: 'manipulation' }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center text-sm font-semibold ${location.pathname === item.href
                      ? 'text-indigo-600'
                      : 'text-gray-900 hover:text-indigo-600'
                      }`}
                  >
                    <item.icon className="h-5 w-5 mr-1" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </PopoverGroup>
          </div>

        </nav>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Mukaan</span>
                <img className="h-8 w-auto" src="/Mukaan/images/mukaan.png" alt="Logo" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 ${location.pathname === item.href
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-900 hover:bg-gray-50'
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <a
                    href="https://geizhals.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50/80 text-gray-600 text-sm font-medium hover:bg-gray-100/80 transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <TagIcon className="h-4 w-4 opacity-60" />
                    Preisvergleich
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>

  )
}
