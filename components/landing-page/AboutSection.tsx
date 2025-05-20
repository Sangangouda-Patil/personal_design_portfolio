"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import ShinyText from "../shared/ShinyText"

const AboutSection = () => {
  // State to track if animation should start
  const [animationStart, setAnimationStart] = useState(false)

  // Start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStart(true)
    }, 500) // Short delay before animation starts

    return () => clearTimeout(timer)
  }, [])

  // Handle CV button click with smooth scroll to EducationCareerSection
  const handleCVButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Get the education-career section by ID
    const educationCareerSection = document.getElementById("education-career")

    if (educationCareerSection) {
      // Add a delay to ensure proper scrolling on mobile
      setTimeout(() => {
        educationCareerSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        console.log("Scrolling to education career section")
      }, 100)
    } else {
      console.error("Education career section not found by ID")

      // Fallback: try to find the section by its class structure
      const fallbackSection = document.querySelector(
        "section.py-12.sm\\:py-16.md\\:py-20.bg-\\[\\#0a0a0a\\].overflow-hidden",
      )

      if (fallbackSection) {
        console.log("Found education career section by class selector")
        setTimeout(() => {
          fallbackSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 100)
      } else {
        console.error("Could not find education career section by any method")
      }
    }
  }

  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 bg-[#0a0a0a]">
      <div className="section-container">
        {/* Centered Section Header with ShinyText effect */}
        <div className="flex flex-col items-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-9xl text-center">
            <span className={`font-rubik-bold text-white`}>
              <ShinyText text="About" speed={3} className={`font-rubik-bold`} />
            </span>
            <span className="text-[#FFD700] font-bold font-times italic"> Me</span>
          </h2>
        </div>
      </div>

      {/* About content - using section-container for consistent margins */}
      <div className="section-container">
        {/* Center-aligned container with max-width for the profile and bio group */}
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          {/* Two-column grid for profile image and bio with moderate gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
            {/* Profile Image - Polaroid style with fixed size */}
            <div className="flex justify-center md:justify-center md:-mr-8">
              {/* Gradient border container - Adding this wrapper for consistency */}
              <div className="gradient-border-container rounded-xl p-[2px] max-w-full">
                {/* Fixed size Polaroid frame with animation - Changed bg-white to bg-[#111111] */}
                <motion.div
                  className="bg-[#111111] rounded-xl p-4 pb-16 relative w-[320px] h-[420px] xs:w-[360px] xs:h-[460px] sm:w-[400px] sm:h-[500px] md:w-[420px] md:h-[520px] max-w-full"
                  initial={{ opacity: 0, y: 20, rotate: -5, scale: 0.9 }}
                  animate={
                    animationStart
                      ? {
                          opacity: 1,
                          y: [0, -5, 0, -5, 0],
                          rotate: [0, -1, 0, -1, 0],
                          scale: 1,
                          transition: {
                            opacity: { duration: 1 },
                            y: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" },
                            rotate: { repeat: Number.POSITIVE_INFINITY, duration: 4.5, ease: "easeInOut" },
                            scale: { duration: 1 },
                          },
                        }
                      : { opacity: 0, y: 20, rotate: -5, scale: 0.9 }
                  }
                >
                  {/* Profile image container */}
                  <div className="w-full h-[300px] xs:h-[340px] sm:h-[380px] md:h-[400px] rounded-lg overflow-hidden relative">
                    <Image src="/images/aboutimage.webp" alt="Profile photo" fill className="object-cover" priority />
                  </div>
                  {/* Caption text - Updated text color to light for dark background */}
                  <div className="absolute bottom-4 left-0 w-full text-center">
                    <p className="font-times italic text-gray-300 text-sm xs:text-base sm:text-lg md:text-xl">
                      It&apos;s me{" "}
                      <span role="img" aria-label="pointing up">
                        👆
                      </span>
                    </p>
                    <p className="font-times italic text-gray-400 text-xs xs:text-sm text-sm xs:text-base sm:text-lg md:text-xl">
                      in a colored photo from 2025
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* About text - clean, minimal design matching the reference image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-start md:pt-16 text-center md:text-left md:-ml-4"
            >
              {/* Simple greeting */}
              <h2 className="font-switzer-semibold text-white text-3xl xs:text-4xl sm:text-5xl mb-5 sm:mb-7">
                Greetings 👋
              </h2>

              {/* Clean, minimal bio with better spacing and typography - matching the reference */}
              <div className="mb-8 sm:mb-10">
                <p className="font-switzer-regular text-gray-400 text-lg xs:text-xl sm:text-2xl leading-relaxed max-w-[500px] mx-auto md:mx-0">
                  I&apos;m <span className="text-gray-300">Sangangouda Patil</span>, a curious designer, casual PC gamer
                  (IKYK 😂), and part-time backpacker with a love for good UI and great mountains. I&apos;ve been
                  helping brands to shape meaningful digital experiences as a{" "}
                  <span className="text-gray-300">Design Executive</span> at Alphanumero.
                </p>
              </div>

              {/* Read My CV Button - Updated to match WorkSection button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex justify-center md:justify-start"
              >
                <div className="gradient-border-container rounded-full">
                  <motion.button
                    onClick={handleCVButtonClick}
                    className="bg-[#1a1a1a] text-white rounded-full py-3 xs:py-4 sm:py-5 px-6 xs:px-8 sm:px-10 flex items-center gap-3 xs:gap-4 hover:bg-[#2a2a2a] transition-colors text-sm xs:text-base sm:text-lg md:text-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-switzer-extrabold uppercase pl-1 xs:pl-2">READ MY CV</span>
                    <div className="bg-[#FFD700] rounded-full p-1.5 xs:p-2 flex items-center justify-center flex-shrink-0">
                      <ArrowRight size={16} className="text-black sm:hidden" />
                      <ArrowRight size={20} className="text-black hidden sm:block" />
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
