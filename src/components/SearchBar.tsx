import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { X } from "lucide-react";

interface SearchResult {
  title: string;
  description: string;
  image: string;
  badge: string;
  link: string;
}

interface SearchBarProps {
  collections: SearchResult[];
}

export function SearchBar({ collections }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredCollections = collections.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeSearch = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 cursor-pointer" />
        <input
          type="text"
          placeholder="Suche nach Angeboten, Apps und mehr..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearching(true);
          }}
          onFocus={() => setIsSearching(true)}
          className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-800 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>

      <AnimatePresence>
        {isSearching && searchQuery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 mt-2 bg-gray-900/95 border border-gray-800 rounded-2xl shadow-xl overflow-hidden z-50 relative"
          >
            {/* X-Button oben rechts */}
            <button
              type="button"
              onClick={closeSearch}
              className="absolute top-2 right-2 h-6 w-6 text-gray-400 cursor-pointer z-10"
            >
              <X size={24} />
            </button>
            {filteredCollections.length > 0 ? (
              <div className="max-h-96 overflow-y-auto pt-10">
                {filteredCollections.map((result, index) => (
                  <motion.a
                    key={result.title}
                    href={result.link}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate">
                        {result.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">
                Keine Ergebnisse gefunden
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Den Hintergrund-Blur-Overlay entfernen, damit die Card nicht betroffen ist */}
      {/*
      {isSearching && searchQuery.length > 0 && ( 
        <div
          className="fixed inset-0 bg-black/20  backdrop-blur-sm z-40 "
          onClick={closeSearch}
        /> 
      )} */}
    </div>
  );
}