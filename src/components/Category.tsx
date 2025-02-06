import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import { SearchBar } from './SearchBar'
import { supabase } from '../lib/supabase'

type Callout = {
  id: string;
  name: string;
  description: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
  pageContent: {
    subtitle: string;
    imagePath: string;
    imageAlt: string;
    content: any[];
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Category() {
  const [callouts, setCallouts] = useState<Callout[]>([]);
  const [searchCollections, setSearchCollections] = useState<any[]>([]);

  useEffect(() => {
    const fetchCallouts = async () => {
      const { data, error } = await supabase
        .from('callouts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching callouts:', error);
        return;
      }

      // Map database columns to frontend model
      const mappedCallouts = data.map(callout => ({
        id: callout.id,
        name: callout.name,
        description: callout.description,
        slug: callout.slug,
        imageSrc: callout.image_src,
        imageAlt: callout.image_alt,
        pageContent: callout.page_content
      }));

      setCallouts(mappedCallouts);

      // Update search collections
      const newSearchCollections = mappedCallouts.map(callout => ({
        title: callout.name,
        description: callout.description,
        image: callout.imageSrc,
        badge: callout.name,
        link: `/${callout.slug}`
      }));
      setSearchCollections(newSearchCollections);
    };

    fetchCallouts();
  }, []);

  return (
    <div className="">
      <HeroSection />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="mb-8">
            <SearchBar collections={searchCollections} />
          </div>

          <motion.div
            className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {callouts.map((callout) => (
              <motion.div key={callout.name} className="group relative" variants={itemVariants}>
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 dark:bg-gray-800">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <Link to={`/${callout.slug}`}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {callout.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}