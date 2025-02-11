'use client'

import { motion } from 'framer-motion'
import FluidTabs from './animata/fluid-tabs'
import HoverInteraction from './animata/hover-interaction'
import CaseStudyCard from './card/case-study-card'
import { ProductCard } from './ProductCard'


const products = [
  {
    imageUrl: "images/steam.png?height=300&width=400",
    title: "Spiele immer günstiger bekommen",
  },
  {
    imageUrl: "images/steamphoto.png?height=300&width=400",
    title: "Smartwatch mit Herzfrequenzmesser, GPS und über 50 Sportmodi für Fitnessbegeisterte",
  },
  {
    imageUrl: "placeholder.svg?height=300&width=400",
    title: "True Wireless Ohrhörer mit aktiver Geräuschunterdrückung und anpassbaren Touch-Bedienelementen",
  },
  {
    imageUrl: "/placeholder.svg?height=300&width=400",
    title: "4K Ultra HD Smart TV mit HDR, Dolby Atmos und integriertem Sprachassistenten für immersives Entertainment",
  },
]


export default function HeroSection() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <FluidTabs />


      <CaseStudyCard
        image="images/steam.png"
        link="https://github.com/codse/animata"
        type="simple-image"
        title="Animata"
      />


      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Unsere Produkte</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>


      <div className="mx-auto max-w-2xl py-2 sm:py-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden sm:mb-8 sm:flex sm:justify-center"
        >
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-gray-800 hover:ring-gray-700">
            Mukaan.de{' '}
            <a href="https://www.instagram.com/mukaan.de/" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-400">
              <span className="absolute inset-0" aria-hidden="true" />
              Folge uns auf Instagram <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
