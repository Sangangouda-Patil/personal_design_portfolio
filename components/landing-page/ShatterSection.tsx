"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import ShinyText from "../shared/ShinyText"

const ShatterSection = () => {
  // State to track if text has been revealed (once revealed, stays visible)
  const [isWondersRevealed, setIsWondersRevealed] = useState(false)
  const [isDesignerRevealed, setIsDesignerRevealed] = useState(false)

  // Function to reveal text permanently
  const revealWonders = () => {
    if (!isWondersRevealed) {
      setIsWondersRevealed(true)
    }
  }

  const revealDesigner = () => {
    if (!isDesignerRevealed) {
      setIsDesignerRevealed(true)
    }
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-4 text-center"
          >
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold font-times italic text-gray-400">
              <span className="text-white">
                <ShinyText text="All" speed={3} className="font-bold" />
              </span>{" "}
              <span className="relative inline-block cursor-pointer" onMouseEnter={revealWonders}>
                <span className="invisible">the wonders</span>
                <span
                  className={`absolute left-0 top-0 transition-all duration-500 text-[#FFD700] text-shadow-glow-gold ${
                    isWondersRevealed ? "opacity-100" : "opacity-0"
                  }`}
                >
                  the wonders
                </span>
              </span>{" "}
              <span className="text-white">
                <ShinyText text="we see," speed={3} className="font-bold" />
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold font-times italic text-gray-400">
              <span className="text-white">
                <ShinyText text="crafted by God, the" speed={3} className="font-bold" />
              </span>{" "}
              <span className="relative inline-block cursor-pointer" onMouseEnter={revealDesigner}>
                <span className="invisible">Designer</span>
                <span
                  className={`absolute left-0 top-0 transition-all duration-500 text-[#FFD700] text-shadow-glow-gold ${
                    isDesignerRevealed ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Designer
                </span>
              </span>
              .
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ShatterSection
