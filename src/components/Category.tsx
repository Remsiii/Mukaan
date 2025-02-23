import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFilter } from '../context/FilterContext'
import HeroSection from './HeroSection'
import { BlurFade } from "@/registry/magicui/blur-fade";
import FluidTabs from './animata/fluid-tabs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Particles } from '@/registry/magicui/particles'
import { supabase } from '../lib/supabase'

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

const CardSkeleton = () => (
  <div className="group relative animate-pulse">
    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-700">
      <div className="h-full w-full" />
    </div>
    <div className="mt-6 h-4 w-3/4 rounded bg-gray-700" />
    <div className="mt-2 h-4 w-1/2 rounded bg-gray-700" />
  </div>
);

export default function Category() {
  const [currentPage, setCurrentPage] = useState(1);
  const { activeFilter } = useFilter();
  const [dbCallouts, setDbCallouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // useEffect: Lade Callouts aus der Tabelle 'callouts' und dann für jedes separat den HTML-Inhalt aus 'calloutshtml'
  useEffect(() => {
    const fetchCalloutsFromDB = async () => {
      setIsLoading(true); // Start loading
      // Hole alle Callouts mit created_at
      const query = activeFilter === 'all'
        ? supabase.from('callouts').select('*, created_at')
        : supabase.from('callouts').select('*, created_at').eq('category', activeFilter);

      const { data, error } = await query;
      if (error) {
        console.error("Fehler beim Laden der Callouts:", error);
        return;
      }

      // Sortiere nach created_at, neueste zuerst
      const sortedCallouts = data
        .filter(callout => callout.created_at)
        .sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

      setDbCallouts(sortedCallouts);
      setIsLoading(false); // End loading
    };
    fetchCalloutsFromDB();
  }, [activeFilter]);

  // Berechne Pagination basierend auf den geladenen dbCallouts:
  const totalPages = Math.ceil(dbCallouts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCallouts = dbCallouts.slice(startIndex, endIndex);

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
          <div className="relative backdrop-blur-xl bg-gradient-to-b  to-grey/10 rounded-2xl p-8 pb-16 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100/20 ">

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl font-bold tracking-tight text-gray-200 dark:text-white text-center mb-8"
            >
              Aktuelle Beiträge
            </motion.h2>
            <Particles
              className="absolute inset-0 z-0"
              quantity={100}
              ease={80}
              color={"#ffffff"}
              refresh
            />
            <FluidTabs />
            <BlurFade>

              <motion.div
                className="mt-8 space-y-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {isLoading ? (
                  // Show skeleton cards while loading
                  Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                    <CardSkeleton key={`skeleton-${index}`} />
                  ))
                ) : (
                  // Show actual content when loaded
                  currentCallouts.map((callout) => (
                    <motion.div
                      key={callout.name}
                      className="group relative"
                      variants={itemVariants}
                    >
                      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 dark:bg-gray-800">
                        <img
                          src={getImageSrc(callout.image_src)}
                          alt={callout.image_alt}
                          className="h-full w-full object-cover object-center"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = 'Mukaan/images/placeholder.svg';
                          }}
                          loading="lazy"
                        />
                      </div>
                      <h3 className="mt-6 text-sm text-purple-400 hover:text-purple-300">
                        <Link to={`/${callout.slug}`}>
                          <span className="absolute inset-0" />
                          {callout.name}
                        </Link>
                      </h3>
                      <p className="text-base font-semibold text-gray-200">
                        {callout.description}
                      </p>
                    </motion.div>
                  ))
                )}
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
    </div>
  )
}