import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type Callout = {
  id: string
  name: string
  description: string
  slug: string
  image_src: string
  image_alt: string
  page_content: {
    title: string
    subtitle: string
    imagePath: string
    imageAlt: string
    content: Array<{
      type: string
      text: string
      items?: string[]
    }>
    button?: {
      text: string
      link: string
    }
  } | null
}

export default function DetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [callout, setCallout] = useState<Callout | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCallout = async () => {
      try {
        const { data, error } = await supabase
          .from('callouts')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error) {
          console.error('Error fetching callout:', error)
          navigate('/')
          return
        }

        if (!data) {
          navigate('/')
          return
        }

        setCallout(data)
      } catch (error) {
        console.error('Error:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchCallout()
  }, [slug, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!callout || !callout.page_content) {
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
              {callout.page_content.title || callout.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {callout.page_content.subtitle || callout.description}
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
            {callout.page_content.imagePath && (
              <div className="mb-12">
                <img
                  src={callout.page_content.imagePath}
                  alt={callout.page_content.imageAlt || ''}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Content Blocks */}
            <div className="prose prose-lg prose-indigo mx-auto dark:prose-invert">
              {callout.page_content.content.map((block, index) => {
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
            {callout.page_content.button && (
              <div className="mt-12 text-center">
                <a
                  href={callout.page_content.button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors duration-200"
                >
                  {callout.page_content.button.text}
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
