import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFilter } from '../context/FilterContext'
import HeroSection from './HeroSection'
import { BlurFade } from "@/registry/magicui/blur-fade";
import { callouts } from '../data/callouts'
import FluidTabs from './animata/fluid-tabs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 12;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const getImageSrc = (imageSrc: string) => {
  if (!imageSrc || imageSrc.startsWith('placeholder') || imageSrc.includes('undefined')) {
    return 'images/placeholder.svg';  // Angepasster Pfad
  }
  return imageSrc;
};

export default function Category() {
  const [currentPage, setCurrentPage] = useState(1);
  const { activeFilter } = useFilter();

  // Filter callouts based on active filter
  const filteredCallouts = activeFilter === 'all'
    ? callouts
    : callouts.filter(callout => callout.category === activeFilter);

  // Calculate pagination based on filtered items
  const totalPages = Math.ceil(filteredCallouts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCallouts = filteredCallouts.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="">
      <HeroSection />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-24">
          <FluidTabs />
          <BlurFade>
            <motion.div
              className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {currentCallouts.map((callout) => (
                <motion.div
                  key={callout.name}
                  className="group relative"
                  variants={itemVariants}
                >
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 dark:bg-gray-800">
                    <img
                      src={getImageSrc(callout.imageSrc)}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = 'images/placeholder.svg';
                      }}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    <Link to={`/${callout.slug}`}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {callout.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Page indicator and Pagination Controls */}
            {totalPages > 1 && (
              <>
                {/* Page counter */}
                <div className="mt-8 text-center text-sm text-gray-400">
                  Seite {currentPage} von {totalPages}
                </div>

                {/* Pagination controls */}
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-800 px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="flex gap-1">
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors
                          ${currentPage === number
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-400 hover:bg-gray-800'}`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-800 px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </BlurFade>
        </div>
      </div>
    </div>
  )
}