"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [startReveal, setStartReveal] = useState(false)

  useEffect(() => {
    // Logo pulses for 3 seconds
    const startRevealTransition = setTimeout(() => {
      setStartReveal(true)
    }, 3000)

    // Complete loading after reveal animation finishes
    const complete = setTimeout(() => {
      setIsVisible(false)
      onLoadingComplete()
    }, 5200) // 3s + 2.2s for the slower reveal animation

    return () => {
      clearTimeout(startRevealTransition)
      clearTimeout(complete)
    }
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Main black background with logo */}
          <motion.div
            className="absolute inset-0 bg-black flex items-center justify-center"
            animate={{
              opacity: startReveal ? 0 : 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.7,
            }}
          >
            <motion.div
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
              animate={{
                opacity: startReveal ? 0 : [1, 0.2, 1, 0.2, 1],
              }}
              transition={{
                duration: 3,
                times: [0, 0.3, 0.5, 0.7, 1],
                ease: "easeInOut",
              }}
            >
              <Image src="/icons/logo.webp" alt="Logo" fill className="object-contain" priority />
            </motion.div>
          </motion.div>

          {/* Reveal layer that slides up */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-75"
            initial={{ y: "100%" }}
            animate={{ y: startReveal ? "-100%" : "0%" }}
            transition={{
              duration: 2.2,
              ease: [0.645, 0.045, 0.355, 1.0],
              delay: startReveal ? 0 : 0.2,
            }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
