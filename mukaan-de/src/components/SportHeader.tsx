import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/sport' },
  { name: 'Category', href: '/sport/category' },
  { name: 'Trending News', href: '/sport/trending' },
  { name: 'Recent News', href: '/sport/recent' },
  { name: 'Clubs Ranking', href: '/sport/clubs' },
  { name: 'Sports Article', href: '/sport/articles' },
]

export default function SportHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/sport" className="flex items-center space-x-3">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold italic tracking-wide text-gray-900"
              >
                Sport News
              </motion.span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center">
            <motion.div
              initial={false}
              animate={{ width: isSearchOpen ? 'auto' : '2.5rem' }}
              className="relative flex items-center"
            >
              <motion.input
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isSearchOpen ? 1 : 0,
                  width: isSearchOpen ? '200px' : 0,
                }}
                transition={{ duration: 0.2 }}
                type="text"
                placeholder="Search"
                className="w-full rounded-full border-gray-200 bg-gray-50 pl-4 pr-10 text-sm focus:border-gray-300 focus:bg-white focus:outline-none focus:ring-0"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="absolute right-0 rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  )
}
