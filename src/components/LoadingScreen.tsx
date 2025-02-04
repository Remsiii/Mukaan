import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start with initial progress animation
    const initialTimer = setTimeout(() => {
      setProgress(80) // Move to 80% quickly
    }, 500)

    // Minimum loading time of 2 seconds
    const timer = setTimeout(() => {
      setProgress(100) // Complete the progress
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(onLoadingComplete, 800) // Wait for exit animation to complete
      }, 200) // Small delay after progress reaches 100%
    }, 900)

    return () => {
      clearTimeout(timer)
      clearTimeout(initialTimer)
    }
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="relative z-10"
            >
              <img
                src="images/mukaan.png"
                alt="Mukaan Logo"
                className="h-24 w-24 object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="h-full w-full rounded-full bg-indigo-500/20 blur-xl" />
            </motion.div>

            <div className="absolute -bottom-8 left-1/2 h-0.5 w-24 -translate-x-1/2 overflow-hidden bg-gray-200">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: progress === 100 ? 0.3 : 1.5,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-0 h-full bg-indigo-600"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
