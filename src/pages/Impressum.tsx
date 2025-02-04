import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function Impressum() {
  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Impressum</h1>
        
        <div className="bg-gray-800 rounded-lg p-8 space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="space-y-2">
              <p>Max Mustermann</p>
              <p>Musterstraße 1</p>
              <p>12345 Musterstadt</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Kontakt
            </h2>
            <div className="space-y-2">
              <p>Telefon: +49 123 456789</p>
              <p>E-Mail: info@musterfirma.de</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Vertreten durch
            </h2>
            <p>Max Mustermann (Geschäftsführer)</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Registereintrag
            </h2>
            <div className="space-y-2">
              <p>Eintragung im Handelsregister</p>
              <p>Registergericht: Musterstadt</p>
              <p>Registernummer: HRB 12345</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  )
} 