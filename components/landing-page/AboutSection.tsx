"use client"

import { motion, type Variants, useInView } from "framer-motion"
import { Rubik } from "next/font/google"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Bold weight
})

// Define heading content with explicit line breaks for different screen sizes
const headingContent = [
  { text: "Bringing digital", breakAfter: true },
  { text: "products to life ", breakAfter: true },
  { text: "with pixels and", breakAfter: true },
  { text: "code", breakAfter: false },
]

// Letter variants with smoother transition
const letterVariants: Variants = {
  initial: {
    color: "transparent",
    WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.8)",
  },
  animate: {
    color: "white",
    WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.8)",
    transition: {
      duration: 0.4, // Longer duration for smoother fill
      ease: [0.23, 1, 0.32, 1], // Custom easing for smoother animation
    },
  },
}

// Scribble line animation variants with delay
const scribbleLineVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 0.6, bounce: 0, delay: 1 }, // 1 second delay
      opacity: { duration: 0.2, delay: 1 }, // 1 second delay
    },
  },
}

const AboutSection = () => {
  // State to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  // State for line hover
  const [showPixelsLine, setShowPixelsLine] = useState(false)
  const [showCodeLine, setShowCodeLine] = useState(false)

  // Refs for heading text animation
  const headingRef = useRef<HTMLDivElement>(null)
  // Remove "once: true" to allow animation to trigger multiple times
  const isInView = useInView(headingRef, { amount: 0.5 })

  // State to control animation of each letter
  const [animateLetters, setAnimateLetters] = useState<boolean[]>([])

  // Calculate total number of characters
  const totalChars = headingContent.reduce((sum, item) => sum + item.text.length, 0)

  // Initialize animation states
  useEffect(() => {
    setAnimateLetters(Array(totalChars).fill(false))
  }, [totalChars])

  // Reset and start animation when section comes into view
  useEffect(() => {
    // If section just came into view
    if (isInView) {
      // Reset animation states
      setAnimateLetters(Array(totalChars).fill(false));

      // Animate all letters with sequential delay
      const animationTimer = setTimeout(() => {
        const animateNextLetter = (index: number) => {
          if (index >= totalChars) return;

          setAnimateLetters((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });

          setTimeout(() => animateNextLetter(index + 1), 50); // 50ms delay between each letter
        };

        animateNextLetter(0);
      }, 300); // Initial delay before animation starts

      return () => {
        clearTimeout(animationTimer);
      };
    }
  }, [isInView, totalChars]);

  // Update rotation based on mouse position
  useEffect(() => {
    if (!imageContainerRef.current || !isHovering) {
      // Gradually return to center when not hovering
      setRotation((prev) => ({
        x: prev.x * 0.9,
        y: prev.y * 0.9,
      }))
      return
    }

    const rect = imageContainerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center (normalized to -1 to 1)
    const x = (mousePosition.x - centerX) / (rect.width / 2)
    const y = (mousePosition.y - centerY) / (rect.height / 2)

    // Limit rotation to a reasonable range (-5 to 5 degrees)
    const rotateY = Math.min(Math.max(x * 5, -5), 5)
    const rotateX = Math.min(Math.max(y * -5, -5), 5)

    setRotation({ x: rotateX, y: rotateY })
  }, [mousePosition, isHovering])

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Function to render animated heading with controlled line breaks
  const renderAnimatedHeading = () => {
    let globalCharIndex = 0

    return (
      <h2
        className={`
          ${rubik.className} 
          text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
          font-bold
          leading-[1.2] sm:leading-[1.2] md:leading-[1.2]
          tracking-normal
          uppercase
        `}
      >
        {headingContent.map((line, lineIndex) => {
          // Split the line into words
          const words = line.text.split(" ")

          return (
            <div key={`line-${lineIndex}`} className={line.breakAfter ? "mb-2 sm:mb-3" : ""}>
              {words.map((word, wordIndex) => {
                // Add space between words (except for the first word in a line)
                const needsSpace = wordIndex > 0

                // Check if this word is "pixels" or "code"
                const isPixels = word.toLowerCase() === "pixels"
                const isCode = word.toLowerCase() === "code"

                // Create spans for each character including spaces
                const wordSpans = []

                // Add space before word if needed
                if (needsSpace) {
                  const spaceIndex = globalCharIndex
                  globalCharIndex++

                  wordSpans.push(
                    <motion.span
                      key={`space-${spaceIndex}`}
                      className="inline-block"
                      initial="initial"
                      animate={animateLetters[spaceIndex] ? "animate" : "initial"}
                      variants={letterVariants}
                    >
                      &nbsp;
                    </motion.span>,
                  )
                }

                // Add each character of the word
                for (let i = 0; i < word.length; i++) {
                  const char = word[i]
                  const charIndex = globalCharIndex
                  globalCharIndex++

                  wordSpans.push(
                    <motion.span
                      key={`char-${charIndex}`}
                      className="inline-block"
                      initial="initial"
                      animate={animateLetters[charIndex] ? "animate" : "initial"}
                      variants={letterVariants}
                      style={{
                        WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {char}
                    </motion.span>,
                  )
                }

                // Return the word with hover effect if it's a special word
                if (isPixels) {
                  return (
                    <span
                      key={`word-${wordIndex}`}
                      className="inline-block whitespace-nowrap relative"
                      onMouseEnter={() => setShowPixelsLine(true)}
                      onMouseLeave={() => setShowPixelsLine(false)}
                    >
                      {wordSpans}
                      <motion.svg
                        viewBox="0 0 100 10"
                        className="absolute -bottom-3 left-0 w-full h-4 pointer-events-none"
                        initial="hidden"
                        animate={showPixelsLine ? "visible" : "hidden"}
                      >
                        <motion.path
                          d="M0,5 L100,5"
                          fill="none"
                          stroke="#FFD700"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="1,3"
                          variants={scribbleLineVariants}
                        />
                      </motion.svg>
                    </span>
                  )
                } else if (isCode) {
                  return (
                    <span
                      key={`word-${wordIndex}`}
                      className="inline-block whitespace-nowrap relative"
                      onMouseEnter={() => setShowCodeLine(true)}
                      onMouseLeave={() => setShowCodeLine(false)}
                    >
                      {wordSpans}
                      <motion.svg
                        viewBox="0 0 100 10"
                        className="absolute -bottom-3 left-0 w-full h-4 pointer-events-none"
                        initial="hidden"
                        animate={showCodeLine ? "visible" : "hidden"}
                      >
                        <motion.path
                          d="M0,5 L100,5"
                          fill="none"
                          stroke="#FFD700"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="1,3"
                          variants={scribbleLineVariants}
                        />
                      </motion.svg>
                    </span>
                  )
                } else {
                  return (
                    <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
                      {wordSpans}
                    </span>
                  )
                }
              })}
            </div>
          )
        })}
      </h2>
    )
  }

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-[#0a0a0a]">
      <div className="section-container">
        {/* Header with yellow accent - aligned left */}
        <div className="flex items-start mb-8 sm:mb-10 md:mb-12">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "50px" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-1 bg-[#FFD700] mr-3 sm:mr-4"
          ></motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            <span className={`${rubik.className} font-bold text-white`}>ABOUT</span>
            <span className="text-[#FFD700] font-bold font-times italic"> ME</span>
          </h2>
        </div>
      </div>

      {/* About content - using section-container for consistent margins */}
      <div className="section-container">
        <div className="max-w-[1400px] mx-auto">
          {/* Changed from md: to lg: breakpoint for the flex layout */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12 lg:gap-16">
            {/* Container for 3D perspective */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[320px] sm:max-w-[400px] lg:w-[45%] xl:w-[40%] mx-auto"
              style={{
                perspective: "1000px",
                aspectRatio: "6/8", // Makes the frame taller than it is wide
              }}
              ref={imageContainerRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* 3D rotating container */}
              <div
                className="absolute inset-0 transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Visible border with gold gradient */}
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, #FFD700 0%, rgba(255, 215, 0, 0.3) 100%)",
                    padding: "2px",
                    transform: "translateZ(0px)",
                  }}
                >
                  {/* Dark background for image */}
                  <div className="absolute inset-0 rounded-lg bg-[#1a1a1a]" style={{ transform: "translateZ(1px)" }}>
                    {/* Image container */}
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <Image
                        src="/images/aboutimage.webp"
                        alt="ABout-Image"
                        fill
                        className="object-cover"
                        style={{ transform: "translateZ(2px)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-[55%] xl:w-[60%] mt-6 lg:mt-0 text-center lg:text-left "
            >
              {/* Main heading with letter-by-letter animation */}
              <div className="mb-8 mt-6 sm:mt-8 lg:mt-10" ref={headingRef}>
                {renderAnimatedHeading()}
              </div>

              {/* Bio paragraph - with enhanced responsive typography */}
              <p
                className={`
                  ${rubik.className} 
                  font-medium text-gray-400 
                  text-sm xs:text-base sm:text-base md:text-m lg:text-l l:text-xl
                  leading-relaxed 
                  max-w-[60ch]
                  mt-3 xs:mt-4 mb-6 xs:mb-8
                `}
              >
                Hi, I am Sam – A designer and developer from India, currently crafting innovative experiences as a
                <span className="font-bold text-white whitespace-nowrap"> {""}Design Executive</span> at Alphanumero
              </p>

              {/* Read My CV Button - Updated to match the "SEE 'EM ALL" button style */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <div className="gradient-border-container rounded-full">
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a1a1a] text-white rounded-full py-5 px-10 flex items-center gap-4 hover:bg-[#2a2a2a] transition-colors text-xl"
                  >
                    <span className="font-semibold pl-1 xs:pl-2">Read My CV</span>
                    <div className="bg-[#FFD700] rounded-full p-2 flex items-center justify-center">
                      <ArrowRight size={20} className="text-black" />
                    </div>
                  </a>
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
