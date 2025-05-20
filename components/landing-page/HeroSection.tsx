"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState, useRef, useMemo } from "react"
import { Spotlight } from "@/components/shared/Spotlight"

// Add the BlurText component implementation
const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>,
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))])

  const keyframes: Record<string, Array<string | number>> = {}
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])]
  })
  return keyframes
}

type BlurTextProps = {
  text?: string
  delay?: number
  className?: string
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  threshold?: number
  rootMargin?: string
  animationFrom?: Record<string, string | number>
  animationTo?: Array<Record<string, string | number>>
  easing?: (t: number) => number
  onAnimationComplete?: () => void
  stepDuration?: number
}

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("")
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(ref.current as Element)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo(
    () =>
      direction === "top" ? { filter: "blur(10px)", opacity: 0, y: -50 } : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction],
  )

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)))

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap justify-center`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        } as const

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        )
      })}
    </p>
  )
}

const HeroSection = () => {
  // Add state to control the visibility of the hero section
  const [showHero, setShowHero] = useState(false)
  // Debug mode for logging
  const DEBUG = true

  // Debug log function
  const debugLog = (message: string, data?: unknown) => {
    if (!DEBUG) return
    if (data) {
      console.log(`[HeroSection] ${message}:`, data)
    } else {
      console.log(`[HeroSection] ${message}`)
    }
  }

  // Add a delay after component mount to show the hero section
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(true)
    }, 5000) // 2-second delay

    return () => clearTimeout(timer)
  }, [])

  // Enhanced media query checks for better responsiveness
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    isUltraWideScreen: false,
  })

  // Set up media query listeners with more breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setScreenSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024 && width < 1536,
        isLargeDesktop: width >= 1536 && width < 2000,
        isUltraWideScreen: width >= 2000,
      })
    }

    // Initial check
    checkScreenSize()

    // Add listener for resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Words to cycle through
  const rotatingWords = [
    "SOFTWARE ENGINEER",
    "VISUAL DESIGNER",
    "UI/UX SPECIALIST",
    "CREATIVE DEVELOPER",
    "PROBLEM SOLVER",
  ]

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [forceRender, setForceRender] = useState(0) // Add this state to force re-render

  // Function to cycle through words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length)
      setForceRender((prev) => prev + 1) // Force re-render when word changes
    }, 4000) // Change word every 4 seconds

    return () => clearInterval(interval)
  }, [rotatingWords.length])

  // Improved function to handle contact button click
  const handleContactButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    debugLog("Contact button clicked")

    // Try multiple methods to find the contact section
    const findContactSection = () => {
      // Method 1: Direct ID lookup
      const byId = document.getElementById("contact")
      if (byId) {
        debugLog("Found contact section by ID")
        return byId
      }

      // Method 2: Query selector for section with contact ID
      const bySelector = document.querySelector("section#contact")
      if (bySelector) {
        debugLog("Found contact section by selector")
        return bySelector
      }

      // Method 3: Find by class name pattern that might be unique to the contact section
      const byClass = document.querySelector("section.py-12.sm\\:py-16.bg-\\[\\#0a0a0a\\]")
      if (byClass) {
        debugLog("Found contact section by class pattern")
        // Add ID if missing for future reference
        if (!byClass.id) byClass.id = "contact"
        return byClass
      }

      // Method 4: Last resort - find ContactSection component
      const allSections = document.querySelectorAll("section")
      const lastSection = allSections[allSections.length - 1]
      if (lastSection) {
        debugLog("Using last section as fallback")
        // Add ID if missing for future reference
        if (!lastSection.id) lastSection.id = "contact"
        return lastSection
      }

      return null
    }

    const contactSection = findContactSection()

    if (contactSection) {
      // Add visual indicator for debugging (will be removed after scrolling)
      const indicator = document.createElement("div")
      indicator.style.position = "absolute"
      indicator.style.left = "0"
      indicator.style.right = "0"
      indicator.style.height = "5px"
      indicator.style.backgroundColor = "red"
      indicator.style.zIndex = "9999"
      contactSection.prepend(indicator)

      // Try different scrolling methods with a delay for mobile
      setTimeout(() => {
        // Method 1: scrollIntoView
        try {
          contactSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
          debugLog("Scrolling with scrollIntoView")
        } catch (error) {
          debugLog("Error with scrollIntoView", error)

          // Method 2: window.scrollTo
          try {
            const rect = contactSection.getBoundingClientRect()
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const targetY = rect.top + scrollTop

            window.scrollTo({
              top: targetY,
              behavior: "smooth",
            })
            debugLog("Scrolling with window.scrollTo", { targetY })
          } catch (error) {
            debugLog("Error with window.scrollTo", error)
          }
        }

        // Remove the indicator after scrolling
        setTimeout(() => {
          indicator.remove()
        }, 2000)
      }, 100) // 100ms delay for mobile
    } else {
      console.error("Could not find contact section by any method")
      debugLog("Could not find contact section by any method")
    }
  }

  return (
    <div
      id="hero"
      className={`relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 ${
        showHero ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      {/* Replace grid background with Spotlight */}
      <div className="absolute inset-0 z-0">
        <Spotlight />
      </div>

      <div className="w-full max-w-[1400px] z-10 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center w-full overflow-hidden">
          {/* Main fixed heading - improved responsive sizing */}
          <div className="w-full overflow-visible px-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-switzer-black text-[3rem] xs:text-[4.5rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] text-white leading-none tracking-wider z-20 mx-auto"
            >
              CREATIVE
            </motion.h1>
          </div>

          {/* Rotating words with improved responsive sizing */}
          <div className="relative h-[2.5rem] xs:h-[3rem] sm:h-[3.5rem] md:h-[4rem] lg:h-[4.5rem] xl:h-[5rem] 2xl:h-[5.5rem] w-full flex items-center justify-center mt-0.5 xs:mt-1 sm:mt-1 md:mt-2 z-20">
            <div key={forceRender} className="flex items-center justify-center absolute w-full">
              <BlurText
                text={rotatingWords[currentWordIndex]}
                delay={100}
                animateBy="letters"
                direction="bottom"
                className="font-switzer-extrabold text-[1rem] xs:text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] 2xl:text-[3.5rem] text-[#FFD700] tracking-wide"
                animationFrom={{ filter: "blur(8px)", opacity: 0, y: 30 }}
                animationTo={[
                  { filter: "blur(4px)", opacity: 0.6, y: 15 },
                  { filter: "blur(0px)", opacity: 1, y: 0 },
                ]}
                stepDuration={0.3}
                easing={(t) => t * (2 - t)} // Ease out quad
                onAnimationComplete={() => {
                  debugLog("Animation completed!")
                }}
              />
            </div>
          </div>
        </div>

        {/* Description text with improved responsive spacing */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-gray-300 mt-8 xs:mt-10 sm:mt-12 md:mt-14 lg:mt-16 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center text-sm xs:text-base sm:text-lg md:text-xl z-20 relative font-switzer-regular"
          style={{ opacity: 0.6 }}
        >
          I create sharp, stylish designs and websites that connect, convert, and add just the right amount of{" "}
          <span className="font-switzer-bold whitespace-nowrap" style={{ color: "#f6cc0b", opacity: 0.8 }}>
            {" "}
            &apos;wow&apos;{" "}
          </span>{" "}
          without screaming for attention 🧲.
        </motion.p>

        {/* CTA Button container - MOVED CLOSER TO DESCRIPTION */}
        <div className="w-full flex justify-center mt-6 xs:mt-8 sm:mt-10 md:mt-12 relative z-30">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ opacity: 0.8 }}
          >
            {/* Gradient border container */}
            <div className="gradient-border-container rounded-full">
              <motion.button
                className="bg-[#1a1a1a] text-white rounded-full py-3 xs:py-4 sm:py-5 px-6 xs:px-8 sm:px-10 flex items-center gap-3 xs:gap-4 hover:bg-[#2a2a2a] transition-colors text-sm xs:text-base sm:text-lg md:text-xl"
                onClick={handleContactButtonClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-switzer-extrabold uppercase pl-1 xs:pl-2">LET&apos;S GET IN TOUCH</span>
                <div className="bg-[#FFD700] rounded-full p-1.5 xs:p-2 flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={screenSize.isMobile ? 16 : 20} className="text-black" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add perspective to the entire hero section */}
      <style jsx global>{`        .perspective-[1000px] {
          perspective: 1000px;
        }
        
        /* Add xxs breakpoint for very small screens */
        @media (min-width: 375px) {
          .xxs\\:text-\\[3rem\\] { font-size: 3rem; }
          .xxs\\:text-\\[0\\.875rem\\] { font-size: 0.875rem; }
          .xxs\\:text-sm { font-size: 0.875rem; }
          .xxs\\:h-\\[2\\.25rem\\] { height: 2.25rem; }
          .xxs\\:mt-7 { margin-top: 1.75rem; }
          .xxs\\:mt-5 { margin-top: 1.25rem; }
          .xxs\\:py-2\\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
          .xxs\\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
          .xxs\\:gap-2\\.5 { gap: 0.625rem; }
          .xxs\\:pl-1 { padding-left: 0.25rem; }
          .xxs\\:p-1\\.5 { padding: 0.375rem; }
          .xxs\\:max-w-xs { max-width: 20rem; }
        }
        
        /* Additional responsive fixes for very small mobile devices */
        @media (max-width: 360px) {
          .font-shamgod-extrabold.text-\\[4rem\\] { font-size: 3.5rem; }
          .relative.h-\\[2\\.5rem\\] { height: 2rem; }
          .font-shamgod-bold.text-\\[1rem\\] { font-size: 0.875rem; }
        }
        
        /* Fix for medium-sized phones */
        @media (min-width: 361px) and (max-width: 413px) {
          .font-shamgod-extrabold.text-\\[4rem\\] { font-size: 3.75rem; }
        }
        
        /* Fix for larger phones but smaller than xs breakpoint */
        @media (min-width: 414px) and (max-width: 639px) {
          .font-shamgod-extrabold.text-\\[4rem\\] { font-size: 4rem; }
        }
        
        /* Ensure button text is readable on small devices */
        @media (max-width: 359px) {
          .text-sm.xs\\:text-base { font-size: 0.75rem; }
          .p-1\\.5.xs\\:p-2 { padding: 0.25rem; }
        }
      `}</style>
    </div>
  )
}

export default HeroSection
