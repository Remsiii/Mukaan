import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { 
  ArrowTopRightOnSquareIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline'

const tips = [
  {
    title: "Produktivität steigern",
    description: "Wie du mit den richtigen Tools und Methoden mehr aus deinem Tag herausholst.",
    category: "Produktivität",
    image: "/images/productivity.jpg",
    link: "/tipps/produktivitaet"
  },
  {
    title: "Apps clever nutzen",
    description: "Die besten Tricks für deine täglichen Apps, die kaum jemand kennt.",
    category: "Apps",
    image: "/images/apps.jpg",
    link: "/tipps/apps"
  },
  // ... weitere Tips
]

export default function TipsPage() {
  usePageTitle('Tipps & Tricks')
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section mit Parallax */}
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 pt-14 lg:pt-20 pb-20 lg:pb-32 px-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-8"
              >
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm text-purple-400 ring-1 ring-purple-400/30 hover:ring-purple-400/50 transition-all duration-300">
                  <SparklesIcon className="h-4 w-4" />
                  <span>Entdecke neue Möglichkeiten</span>
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              >
                Tipps & Tricks
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
              >
                Entdecke wertvolle Insights und praktische Tipps, die dir helfen, 
                das Beste aus deiner Technologie herauszuholen.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-blue-500/20 backdrop-blur-3xl" />
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* Tips Grid */}
      <div className="relative z-10 px-6 pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {tips.map((tip, index) => (
              <TipCard key={tip.title} tip={tip} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function TipCard({ tip, index }: { tip: typeof tips[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      <motion.a
        href={tip.link}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="block overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700/50 transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={tip.image}
            alt={tip.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400 backdrop-blur-sm">
              {tip.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {tip.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
            {tip.description}
          </p>
          <div className="flex items-center text-sm text-purple-400 font-medium">
            <span>Mehr erfahren</span>
            <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.a>
    </motion.div>
  )
} 