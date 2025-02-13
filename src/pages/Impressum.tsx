import { motion } from 'framer-motion'
import { impressumData } from '../data/legal/impressumData'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  }
}

const sectionVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function Impressum() {
  const { company, contact, legal } = impressumData

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 relative inline-block">
            Impressum
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500/60 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hier finden Sie alle wichtigen Informationen zu unserem Unternehmen. Wir legen Wert auf Transparenz und freuen uns über Ihr Vertrauen.
          </p>
        </div>

        <div className="grid gap-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700/50">
          <motion.section
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="hover:bg-gray-800/30 transition-colors duration-300 rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              Unternehmensdetails
            </h2>
            <div className="space-y-2 text-gray-300 pl-11">
              <p className="text-lg font-medium">{company.name}</p>
              <p>{company.owner}</p>
              <p>{company.address.street}</p>
              <p>{company.address.zip} {company.address.city}</p>
              <p>{company.address.country}</p>
            </div>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="hover:bg-gray-800/30 transition-colors duration-300 rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Kontakt
            </h2>
            <div className="space-y-2 text-gray-300 pl-11">
              <p className="flex items-center">
                <span className="text-gray-400">Telefon:</span>
                <a href={`tel:${contact.phone}`} className="ml-2 hover:text-blue-400 transition-colors duration-300">
                  {contact.phone}
                </a>
              </p>
              <p className="flex items-center">
                <span className="text-gray-400">E-Mail:</span>
                <a href={`mailto:${contact.email}`} className="ml-2 hover:text-blue-400 transition-colors duration-300">
                  {contact.email}
                </a>
              </p>
            </div>
          </motion.section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Haftungsausschluss
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Haftung für Links</h3>
                <p className="text-sm">{legal.haftungLinks}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Liability for content</h3>
                <p className="text-sm">{legal.liabilityContent}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Urheberrecht</h3>
                <p className="text-sm">{legal.copyright}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  )
} 