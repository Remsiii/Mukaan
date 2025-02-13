import { motion } from 'framer-motion'
import { datenschutzData } from '../data/legal/datenschutzData'

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

export default function Datenschutz() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-6 px-3 sm:py-16 sm:px-6 lg:px-8 mt-10"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 relative inline-block break-words">
            Datenschutzerklärung
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500/60 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
          </h1>
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto px-2 leading-relaxed break-words">
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten und Ihrer Rechte gemäß der DSGVO
          </p>
        </div>

        <div className="grid gap-4 sm:gap-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-8 shadow-xl border border-gray-700/50 overflow-hidden">
          {datenschutzData.sections.map((section, index) => (
            <motion.section
              key={index}
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="hover:bg-gray-800/30 transition-colors duration-300 rounded-lg p-3 sm:p-6 break-words"
            >
              <h2 className="text-lg sm:text-2xl font-semibold text-white mb-2 sm:mb-4 flex items-start sm:items-center">
                <span className="w-6 sm:w-8 h-6 sm:h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1 sm:mt-0">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                {section.title}
              </h2>
              <div className="space-y-2 sm:space-y-4 pl-8 sm:pl-11">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.subsections?.map((subsection, sIndex) => (
                  <div key={sIndex} className="mt-4 sm:mt-6 bg-gray-800/30 rounded-lg p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-start">
                      <span className="w-5 sm:w-6 h-5 sm:h-6 rounded-md bg-blue-500/10 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      {subsection.title}
                    </h3>
                    {subsection.content.map((paragraph, ssIndex) => (
                      <p key={ssIndex} className="text-sm sm:text-base text-gray-300 leading-relaxed ml-7 sm:ml-8 mb-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </motion.div>
  )
}