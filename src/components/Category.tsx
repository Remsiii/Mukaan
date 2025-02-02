import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSection from './HeroSection'
import { callouts } from '../data/callouts'
import { SearchBar } from './SearchBar'



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

// Suchkollektionen aus den callouts erstellen
const searchCollections = callouts.map(callout => ({
  title: callout.name,
  description: callout.description,
  image: callout.imageSrc,
  badge: callout.pageContent.title,
  link: `/${callout.slug}`
}))

export default function Category() {
  return (
    <div className="">
      <HeroSection />

      {/* Zentrale Suchsektion */}
      <div className="relative z-10 -mt-32 mb-16"> {/* Höher positioniert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl px-4"
        >
          <div className="backdrop-blur-xl bg-white/10 p-4 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold text-white text-center mb-4">
              Durchsuche alle Angebote und Tipps
            </h2>
            <SearchBar collections={searchCollections} />
          </div>
        </motion.div>
      </div>

      {/* Categories Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Collections</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"
          >
            {callouts.map((callout) => (
              <motion.div
                key={callout.name}
                className="group relative"
                variants={itemVariants}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-2/1 lg:aspect-square">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500 dark:text-white ">
                  <Link to={`/${callout.slug}`}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{callout.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </div>
  )
}