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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCalloutData = async () => {
      if (!slug) return;
      setIsLoading(true);
      setError(null);

      try {
        // Lade Callout-Daten
        const { data: calloutData, error: calloutError } = await supabase
          .from('callouts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (calloutError) {
          console.error('Error fetching callout:', calloutError);
          setError('Fehler beim Laden der Callout-Daten');
          navigate('/');
          return;
        }

        setCallout(calloutData);

        // Lade HTML-Content - angepasst an die Speichermethode in EditCalloutDetailPage
        const { data: htmlData, error: htmlError } = await supabase
          .from('calloutshtml')
          .select('html_content')
          .eq('slug', slug)
          .maybeSingle();  // Verwende maybeSingle statt single, da es optional sein könnte

        console.log('Raw HTML data:', htmlData); // Debug log

        if (htmlError) {
          console.error("HTML Content error:", htmlError);
          setError('Fehler beim Laden des HTML-Inhalts');
          return;
        }

        if (htmlData) {
          console.log('Setting HTML content:', htmlData.html_content);
          setHtmlContent(htmlData.html_content);
        } else {
          console.log('No HTML content found for slug:', slug);
          setHtmlContent(null);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Ein unerwarteter Fehler ist aufgetreten');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalloutData();
  }, [slug, navigate]);

  if (isLoading) return <div className="text-center mt-10">Laden...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!callout) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
  }

  return (
    <div className="mt-4 border border-gray-200/20 rounded-xl overflow-x-hidden"> {/* Reduced mt-10 to mt-4 */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <motion.div
        className="relative overflow-hidden py-8" /* Reduced py-16 to py-8 */
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative px-4 sm:px-6 lg:px-8 mt-4" /* Reduced mt-12 to mt-4 */
          variants={contentVariants}
        >
          <div className="mx-auto max-w-3xl overflow-hidden">
            {htmlContent ? (
              <div className="mt-4 p-4 sm:p-6 bg-gray-800/50 rounded-md overflow-hidden"> {/* Reduced mt-8 to mt-4 */}
                <div
                  className="prose prose-lg prose-invert mx-auto [&_p:empty]:mb-4 [&_p:empty]:block [&_p:empty]:h-4 [&_br]:block [&_br]:content-[''] [&_br]:mb-4"
                  style={{
                    maxWidth: '100%',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: htmlContent
                  }}
                />
              </div>
            ) : (
              <div className="text-center mt-4 text-gray-400"> {/* Reduced mt-8 to mt-4 */}
                Kein Inhalt verfügbar
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
