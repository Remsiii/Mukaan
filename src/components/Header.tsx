'use client'

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogPanel,
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
import { FaCog } from 'react-icons/fa'
import { auth, type Profile, subscribeToAuthChanges } from '../lib/auth'

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

  useEffect(() => {
    // Check if user is already logged in
    auth.getProfile().then(setProfile)

    // Subscribe to auth changes
    const unsubscribe = subscribeToAuthChanges(setProfile)
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await auth.signOut()
    setProfile(null)
  }

  return (
    <header className="w-full top-0 z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Mukaan</span>
            <motion.img
              alt=""
              src="/Mukaan/images/mukaan.png"
              className="h-20 w-auto animate-scaleUpDown"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <motion.a
            href="https://geizhals.de"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl 
              bg-white/5 backdrop-blur-sm border border-gray-200/10
              text-gray-600 text-sm font-medium
              hover:bg-gray-50/10 hover:border-gray-300/20
              transition-all duration-200 ease-out
              shadow-sm hover:shadow"
          >
            <TagIcon className="h-4 w-4 opacity-60" />
            <span>Preisvergleich</span>
          </motion.a>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ touchAction: 'manipulation' }}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-2 text-sm font-semibold ${location.pathname === item.href
                    ? 'text-indigo-600'
                    : 'text-gray-900 hover:text-indigo-600'
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </PopoverGroup>
        </div>

      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Mukaan</span>
              <img
                className="h-8 w-auto"
                src="/Mukaan/images/mukaan.png"
                alt=""
              />
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
                  className="flex items-center gap-2 px-4 py-2 rounded-xl
                    bg-gray-50/80 text-gray-600 text-sm font-medium
                    hover:bg-gray-100/80 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <TagIcon className="h-4 w-4 opacity-60" />
                  Preisvergleich
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
