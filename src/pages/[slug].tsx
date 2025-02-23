import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Particles } from '@/registry/magicui/particles'
import { supabase } from '../lib/supabase'

export default function DetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [callout, setCallout] = useState<any>(null)
  const [htmlContent, setHtmlContent] = useState<string | null>(null)

  useEffect(() => {
    const fetchCalloutData = async () => {
      try {
        // Lade Callout-Daten
        const { data: calloutData, error: calloutError } = await supabase
          .from('callouts')
          .select('*')
          .eq('slug', slug)
          .single()

        if (calloutError) throw calloutError

        // Lade HTML-Content
        const { data: htmlData, error: htmlError } = await supabase
          .from('calloutshtml')
          .select('html_content')
          .eq('slug', slug)
          .single()

        if (htmlError && !htmlError.message.includes('after')) {
          console.error("HTML Content error:", htmlError)
        }

        setCallout(calloutData)
        setHtmlContent(htmlData?.html_content || null)
      } catch (error) {
        console.error('Error fetching data:', error)
        navigate('/')
      }
    }

    fetchCalloutData()
  }, [slug, navigate])

  if (!callout) return null

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
  }

  return (
    <div className="mt-10 border border-gray-200/20 rounded-xl overflow-x-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <motion.div
        className="relative overflow-hidden py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Content section */}
        <motion.div
          className="relative px-4 sm:px-6 lg:px-8 mt-12"
          variants={contentVariants}
        >
          <div className="mx-auto max-w-3xl overflow-hidden">
            {/* Main Image */}
            <div className="mb-12">
              <img

                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* HTML Content Section */}
            {htmlContent && (
              <div className="mt-8 p-4 sm:p-6 bg-gray-800/50 rounded-md overflow-hidden">
                <div
                  className="prose prose-lg prose-invert mx-auto break-words"
                  style={{
                    maxWidth: '100%',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                  }}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
