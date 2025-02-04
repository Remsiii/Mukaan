import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { 
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/outline'

const angebote = [
  {
    title: "Premium PC-Beratung",
    description: "Individuelle Beratung für deinen perfekten Gaming- oder Arbeits-PC.",
    price: "49,99 €",
    originalPrice: "79,99 €",
    savings: "38%",
    image: "Mukaan/images/offers/pc-beratung.jpg",
    features: [
      "Persönliche 1:1 Beratung",
      "Maßgeschneiderte Konfiguration",
      "Preisvergleich inklusive",
      "30 Tage Support"
    ],
    badge: "Bestseller",
    link: "/angebote/pc-beratung"
  },
  {
    title: "App-Optimierung",
    description: "Maximiere die Leistung deiner wichtigsten Apps und Workflows.",
    price: "29,99 €",
    originalPrice: "49,99 €",
    savings: "40%",
    image: "Mukaan/images/offers/app-optimierung.jpg",
    features: [
      "Performance-Analyse",
      "Workflow-Optimierung",
      "Automatisierungs-Setup",
      "14 Tage Support"
    ],
    badge: "Beliebt",
    link: "/angebote/app-optimierung"
  }
]

export default function AngebotePage() {
  usePageTitle('Exklusive Angebote')
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
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
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm text-blue-400 ring-1 ring-blue-400/30 hover:ring-blue-400/50 transition-all duration-300">
                  <SparklesIcon className="h-4 w-4" />
                  <span>Limitierte Angebote</span>
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
              >
                Exklusive Deals, die du nicht verpassen willst
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
              >
                Entdecke unsere sorgfältig ausgewählten Premium-Angebote für maximale 
                Performance und Produktivität.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-emerald-500/20 backdrop-blur-3xl" />
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
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-600/30 to-emerald-600/30 rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* Angebote Grid */}
      <div className="relative z-10 px-6 pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {angebote.map((angebot, index) => (
              <AngebotCard key={angebot.title} angebot={angebot} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trust Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 px-6 pb-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-8 lg:p-12">
            <div className="flex items-center justify-center gap-4 text-gray-300 text-sm">
              <ShieldCheckIcon className="h-5 w-5 text-emerald-400" />
              <span>100% Zufriedenheitsgarantie</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">30 Tage Geld-zurück-Garantie</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Persönlicher Support</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function AngebotCard({ angebot, index }: { angebot: typeof angebote[0], index: number }) {
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
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700/50 transition-all duration-300"
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={angebot.image}
            alt={angebot.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
          {angebot.badge && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 backdrop-blur-sm ring-1 ring-blue-400/30">
                {angebot.badge}
              </span>
            </div>
          )}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{angebot.price}</span>
              <span className="text-sm text-gray-400 line-through">{angebot.originalPrice}</span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 backdrop-blur-sm">
                -{angebot.savings}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {angebot.title}
          </h3>
          <p className="text-gray-400 mb-4">
            {angebot.description}
          </p>
          <ul className="space-y-2 mb-6">
            {angebot.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                <CheckIcon className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <motion.a
            href={angebot.link}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 group/link"
          >
            <span>Jetzt sichern</span>
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
} 