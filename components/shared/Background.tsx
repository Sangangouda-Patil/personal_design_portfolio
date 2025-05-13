"use client"

// import { useRef } from "react"
import { motion } from "framer-motion"

interface BackgroundProps {
  children: React.ReactNode
}

const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Background
