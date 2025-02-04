import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function Datenschutz() {
  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Datenschutzerklärung</h1>
        
        <div className="bg-gray-800 rounded-lg p-8 space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Grundlegendes
            </h2>
            <p className="leading-relaxed">
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Ihre Daten werden vertraulich 
              und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung behandelt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p className="leading-relaxed">
              Wir erheben personenbezogene Daten nur, wenn Sie uns diese im Rahmen einer Anfrage 
              oder Registrierung freiwillig mitteilen. Die Verarbeitung erfolgt auf Grundlage von 
              Art. 6 (1) lit. a DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Nutzung und Weitergabe personenbezogener Daten
            </h2>
            <p className="leading-relaxed">
              Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfragen und zur Abwicklung 
              von Verträgen genutzt. Eine Weitergabe an Dritte erfolgt nicht ohne Ihre ausdrückliche Einwilligung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Ihre Rechte
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Recht auf Auskunft</li>
              <li>Recht auf Berichtigung</li>
              <li>Recht auf Löschung</li>
              <li>Recht auf Einschränkung der Verarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
              <li>Widerspruchsrecht</li>
            </ul>
          </section>
        </div>
      </div>
    </motion.div>
  )
} 