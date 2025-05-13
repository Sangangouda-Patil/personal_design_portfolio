"use client"

import { motion } from "framer-motion"
import { Bayon, Rubik } from "next/font/google"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

// Load Bayon font
const bayon = Bayon({
  subsets: ["latin"],
  weight: ["400"], // Bayon only has 400 weight
})

// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})


const HeroSection = () => {
  // State to track viewport size
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [isUltraWideScreen, setIsUltraWideScreen] = useState(false)

  // Refs for positioning
  const creativeRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update state based on window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
      setIsLargeScreen(window.innerWidth >= 1024)
      setIsUltraWideScreen(window.innerWidth >= 1920)
    }

    // Set initial values
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pt-28 sm:pt-32 md:pt-36 lg:pt-40"
    >
      {/* Main content container - removed section-container class to allow full width */}
      <div className="w-full flex flex-col items-center mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        {/* Content wrapper for alignment with image overlay - increased max-width */}
        <div ref={containerRef} className="relative w-full mx-auto">
          {/* "CREATIVE" text with letter-specific positioning */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 text-center relative z-0 w-full"
            >
              <h1
                ref={creativeRef}
                className={`${bayon.className} text-[4.5rem] xs:text-[5.5rem] sm:text-[7.5rem] md:text-[10rem] lg:text-[13rem] xl:text-[16rem] 2xl:text-[20rem] 3xl:text-[24rem] text-[#5a5a5a] tracking-[0.08em] sm:tracking-[0.09em] md:tracking-[0.1em] leading-none w-full`}
              >
                <span className="relative inline-block">
                  <span className="relative">C</span>
                  <div
                    className="
                      absolute
                      -bottom-6
                      xs:-bottom-8
                      sm:-bottom-10
                      md:-bottom-14
                      lg:-bottom-18
                      xl:-bottom-22
                      2xl:-bottom-26
                      left-0
                    "
                  >
                    <p
                      className={`${bayon.className}
                       text-[#5a5a5a] 
                       text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 
                       uppercase tracking-wide text-left`}
                       style={{ transform: 'translateX(15%)' }} // Adjust the value to move right
                      
                    >
                      
                      DESIGNER
                    </p>
                  </div>
                </span>
                REATIV
                <span className="relative inline-block">
                  <span className="relative">E</span>
                  <div
                    className="
                      absolute
                      -bottom-6
                      xs:-bottom-8
                      sm:-bottom-10
                      md:-bottom-14
                      lg:-bottom-18
                      xl:-bottom-22
                      2xl:-bottom-26
                      right-0
                    "
                  >
                    <p
                      className={`
                        ${bayon.className}
                        text-[#5a5a5a]
                        text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl
                        uppercase tracking-wide text-right
                      `}
                      style={{ transform: 'translateX(-40%)' }} // Adjust the value to move left
                      

                    >
                     ENGINEER
                      
                    </p>
                  </div>
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Hero image - centered and overlapping with text - RESPONSIVE POSITIONING */}
          <motion.div
            className="absolute top-[50%] sm:top-[55%] md:top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] xs:w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px] 3xl:w-[1000px] z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full aspect-[3/4] overflow-hidden relative">
              <Image
                src="/images/herosectionimage.webp"
                alt="Creative professional portrait"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Adjusted spacer to position yellow ribbon with slight overlap */}
        <div className="flex-grow min-h-[12vh] xs:min-h-[14vh] sm:min-h-[17vh] md:min-h-[20vh] lg:min-h-[22vh] xl:min-h-[24vh] 2xl:min-h-[27vh]"></div>
      </div>

      {/* Yellow Ribbon Banner - Adjusted to create slight overlap with image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="
          w-full 
          relative
          -mt-12      /* was -mt-4 */
          xs:-mt-14     /* was xs:-mt-5 */
          sm:-mt-16    /* was sm:-mt-6 */
          md:-mt-18    /* was md:-mt-8 */
          lg:-mt-20    /* was lg:-mt-10 */
          xl:-mt-22    /* was xl:-mt-12 */
          2xl:-mt-24   /* was 2xl:-mt-14 */
          z-20
        "
      >
        <div className="relative overflow-hidden">
          {/* Main gold background */}
          <div className="bg-[#ffd301]/90 py-3 sm:py-4 md:py-5 lg:py-6">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>
           {/* Content with Rubik font */}
           <div className="max-w-6xl mx-auto px-4 relative z-0">
              <p
                className={`
                  ${rubik.className}
                  text-[10px]       /* ↓ smaller default */
                  xs:text-xs        /* ↓ reduce at xs */
                  md:text-sm        /* ↓ reduce at md */
                  lg:text-base      /* ↓ keep base at lg+ */
                  xl:text-lg
                  2xl:text-xl
                  text-black
                  font-bold
                  text-center 
                  max-w-[1600px] 
                  mx-auto
                  leading-wide
                `}
              >
                Creating impactful, visually appealing designs and websites that
                engage, connect, and drive conversions.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      {/* CTA Button container - RESPONSIVE MARGINS AND PADDING */}
      <div className="w-full section-container mx-auto px-4 mb-8 sm:mb-10 md:mb-12 mt-4 sm:mt-6 md:mt-8 lg:mt-10 z-20">
        <div className="max-w-[280px] xs:max-w-[320px] sm:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <div className="gradient-border-container w-full">
              <motion.button
                className={`${bayon.className} bg-[#1a1a1a] text-white py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 rounded-full flex items-center justify-between w-full text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="pr-2">Transform Your Ideas Into Reality</span>
                <div className="bg-[#FFD700] rounded-full p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0">
                  <svg
                    width={isMobile ? "18" : isUltraWideScreen ? "32" : "24"}
                    height={isMobile ? "18" : isUltraWideScreen ? "32" : "24"}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
