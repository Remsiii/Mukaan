import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { callouts, Callout } from '../data/callouts'

export default function DetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [callout, setCallout] = useState<Callout | null>(null)

  useEffect(() => {
    const foundCallout = callouts.find(c => c.slug === slug)
    if (!foundCallout) {
      navigate('/')
      return
    }
    setCallout(foundCallout)
  }, [slug, navigate])

  if (!callout) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <motion.div
        className="relative overflow-hidden py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero section */}
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {callout.pageContent.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {callout.pageContent.subtitle}
            </p>
          </div>
        </div>

        {/* Content section */}
        <motion.div
          className="relative px-6 lg:px-8 mt-12"
          variants={contentVariants}
        >
          <div className="mx-auto max-w-3xl">
            {/* Main Image */}
            {callout.pageContent.imagePath && (
              <div className="mb-12">
                <img
                  src={callout.pageContent.imagePath}
                  alt={callout.pageContent.imageAlt}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Content Blocks */}
            <div className="prose prose-lg prose-indigo mx-auto dark:prose-invert">
              {callout.pageContent.content.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p key={index} className="text-gray-600 dark:text-gray-300">
                        {block.text}
                      </p>
                    )
                  case 'heading':
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                        {block.text}
                      </h2>
                    )
                  case 'list':
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                        {block.items?.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    )
                  default:
                    return null
                }
              })}
            </div>

            {/* Call to Action Button */}
            {callout.pageContent.button && (
              <div className="mt-12 text-center">
                <a
                  href={callout.pageContent.button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors duration-200"
                >
                  {callout.pageContent.button.text}
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
