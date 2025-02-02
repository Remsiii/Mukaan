import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { callouts } from '../data/callouts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const callout = callouts.find((c) => c.slug === slug)

  useEffect(() => {
    if (!callout) {
      navigate('/')
    }
  }, [callout, navigate])

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
    <div className="bg-white">
      <motion.div
        className="relative overflow-hidden py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero section */}
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {callout.pageContent.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {callout.pageContent.subtitle}
            </p>
          </div>
        </div>

        {/* Main image */}
        <div className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-xl bg-gray-900 px-6 py-20 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                <img
                  className="mt-10 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none"
                  src={callout.pageContent.imagePath}
                  alt={callout.pageContent.imageAlt}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <motion.div
          className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8"
          variants={contentVariants}
        >
          <div className="mx-auto max-w-2xl lg:mx-0">
            {callout.pageContent.content.map((block, index) => {
              switch (block.type) {
                case 'heading':
                  return (
                    <h2 key={index} className="text-2xl font-bold tracking-tight text-gray-900">
                      {block.text}
                    </h2>
                  )
                case 'paragraph':
                  return (
                    <p key={index} className="mt-6 text-lg leading-8 text-gray-600">
                      {block.text}
                    </p>
                  )
                case 'list':
                  return (
                    <div key={index} className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900">{block.text}</h3>
                      <ul className="mt-4 list-disc pl-6 text-base text-gray-600">
                        {block.items?.map((item, itemIndex) => (
                          <li key={itemIndex} className="mt-2">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )
                case 'image':
                  return (
                    <div key={index} className="mt-6">
                      <img
                        src={block.imagePath}
                        alt={block.imageAlt}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  )
                default:
                  return null
              }
            })}
          </div>

          {/* CTA Button */}
          {callout.pageContent.button && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={callout.pageContent.button.link}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {callout.pageContent.button.text}
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
