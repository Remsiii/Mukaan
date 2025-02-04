import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/solid'

const socialLinks = [
  { name: 'instagram', href: '#', icon: 'instagram.svg' },
  { name: 'youTube', href: '#', icon: 'youtube.svg' },
  { name: 'tikTok', href: '#', icon: 'tiktok.svg' },
  { name: 'whatsApp', href: '#', icon: 'whatsapp.svg' },
  { name: 'discord', href: '#', icon: 'discord.svg' },
  { name: 'telegram', href: '#', icon: 'telegram.svg' },
]

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const donationVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const sparkleVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  }
}

export default function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  return (
    <motion.footer
      ref={footerRef}
      variants={footerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className=""
    >
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        {/* Donation Section */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex justify-center"
        >
          <motion.div
            variants={donationVariants}
            initial="initial"
            animate="animate"
            className="relative rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => window.open('http://paypal.me/mukaande', '_blank')}
          >
            <div className="relative rounded-2xl bg-gray-900 px-8 py-6 hover:bg-gray-800/80 transition-colors">
              <div className="flex items-center gap-4">
                <motion.div
                  variants={sparkleVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute -left-3 -top-3"
                >
                  <SparklesIcon className="h-6 w-6 text-yellow-400" />
                </motion.div>
                <HeartIcon className="h-8 w-8 text-red-500" />
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">
                    Spendensupport
                  </p>
                  <p className="text-sm text-gray-300">
                    Unterstütze mich mit einer kleinen Spende
                  </p>
                </div>
                <motion.div
                  variants={sparkleVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute -right-3 -bottom-3"
                >
                  <SparklesIcon className="h-6 w-6 text-yellow-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex justify-center space-x-10"
        >
          <a href="/Mukaan/impressum" className="text-gray-400 hover:text-gray-200 transition-colors">
            <span className="sr-only">Impressum</span>
            Impressum
          </a>
          <a href="/Mukaan/datenschutz" className="text-gray-400 hover:text-gray-200 transition-colors">
            <span className="sr-only">Datenschutz</span>
            Datenschutz
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex justify-center space-x-4"
        >
          <span className="text-gray-400 text-center sm:text-left">Finde mich auf Social Media:</span>
          {socialLinks.map((item) => (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <span className="sr-only">{item.name}</span>
              <img
                src={`/Mukaan/social/${item.icon}`}
                alt={item.name}
                className="h-6 w-6 brightness-0 invert opacity-75 hover:opacity-100 transition-all"
              />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 border-t border-gray-800 pt-8"
        >
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Mukaan. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
