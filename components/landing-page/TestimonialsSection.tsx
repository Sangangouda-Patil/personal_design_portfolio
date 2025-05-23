"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ShinyText from "../shared/ShinyText"

// Testimonial data
const testimonials = [
  {
    id: 1,
    quote:
      "Joining Creatorthan changed everything for me. My passion turned into a brand, and now I collaborate with businesses I once admired.",
    name: "Tiana Press",
    title: "Digital Creator",
    avatar: "/testimonials/img1.webp",
  },
  {
    id: 2,
    quote:
      "The designs delivered exceeded my expectations. Our conversion rate increased by 40% after implementing the new user interface.",
    name: "Rafael Lee",
    title: "Startup Founder",
    avatar: "/testimonials/img2.webp",
  },
  {
    id: 3,
    quote:
      "Working with this team has been transformative for our brand. The attention to detail and creative solutions set us apart from competitors.",
    name: "Sophie Chen",
    title: "Marketing Director",
    avatar: "/testimonials/img3.webp",
  },
]

// Default avatar path as a constant
const DEFAULT_AVATAR = "/3d-avatar.webp"

// Emoji positions for floating animation
const emojiPositions = [
  { size: "w-10 h-10", initialPosition: { top: 5, left: 5 } },
  { size: "w-12 h-12", initialPosition: { top: 70, left: 10 } },
  { size: "w-8 h-8", initialPosition: { top: 20, left: 85 } },
]

const TestimonialsSection = () => {
  // State for current slide and animation direction
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  // State to track if animation is in progress (using state instead of ref for better reactivity)
  const [isAnimating, setIsAnimating] = useState(false)
  // Ref for auto-rotation timer
  const autoRotateInterval = useRef<NodeJS.Timeout | null>(null)

  // Navigation functions with direction tracking and debouncing
  const nextSlide = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setDirection(1)
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))

    // Reset animation flag after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))

    // Reset animation flag after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }, [isAnimating])

  // Auto-rotate functionality
  useEffect(() => {
    const startAutoRotate = () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current)
      }
      autoRotateInterval.current = setInterval(() => {
        if (!isAnimating) {
          nextSlide()
        }
      }, 5000) // Rotate every 5 seconds
    }

    startAutoRotate()

    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current)
      }
    }
  }, [nextSlide, isAnimating])

  // Helper function to get index with wrapping
  const getWrappedIndex = useCallback((index: number) => {
    return ((index % testimonials.length) + testimonials.length) % testimonials.length
  }, [])

  // Get previous and next indices with wrapping
  const prevIndex = getWrappedIndex(currentIndex - 1)
  const nextIndex = getWrappedIndex(currentIndex + 1)

  // Helper function to get a valid image source
  const getValidImageSrc = (src: string | null | undefined): string => {
    if (!src || src === "") return DEFAULT_AVATAR
    return src
  }

  // Animation variants for the main slide - smoother transitions
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "tween", ease: "easeInOut", duration: 0.4 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25, restDelta: 0.001 },
        opacity: { duration: 0.4 },
        scale: { type: "spring", stiffness: 250, damping: 25, restDelta: 0.001 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "tween", ease: "easeInOut", duration: 0.4 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  }

  // Animation variants for the side slides - smoother transitions
  const sideVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      scale: 0.9,
      x: direction > 0 ? "10%" : "-10%",
      transition: { duration: 0.3, ease: "easeOut" },
    }),
    visible: {
      opacity: 0.1,
      scale: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  // 3D avatar animation variants
  const avatarVariants = {
    hover: {
      rotateY: 15,
      rotateX: -10,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  // Handle animation completion
  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Floating emojis - positioned behind everything */}
      {emojiPositions.map((emoji, index) => (
        <motion.div
          key={`emoji-${index}`}
          className={`absolute ${emoji.size} opacity-10 pointer-events-none`}
          style={{
            zIndex: 0,
            top: `${emoji.initialPosition.top}%`,
            left: `${emoji.initialPosition.left}%`,
          }}
          initial={{ rotate: 0 }}
          animate={{
            top: [
              `${emoji.initialPosition.top}%`,
              `${emoji.initialPosition.top + 20}%`,
              `${emoji.initialPosition.top - 15}%`,
              `${emoji.initialPosition.top}%`,
            ],
            left: [
              `${emoji.initialPosition.left}%`,
              `${emoji.initialPosition.left - 15}%`,
              `${emoji.initialPosition.left + 10}%`,
              `${emoji.initialPosition.left}%`,
            ],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            top: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 30 + index * 5,
              ease: "easeInOut",
              delay: index * 2,
            },
            left: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 40 + index * 5,
              ease: "easeInOut",
              delay: index * 1.5,
            },
            rotate: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 20 + index * 3,
              ease: "easeInOut",
            },
          }}
        >
          <Image
            src="/icons/heartemoji.png"
            alt="Heart eyes emoji"
            width={50}
            height={50}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Centered Section Header with ShinyText effect */}
        <div className="flex flex-col items-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-9xl text-center">
            <span className={`font-rubik-bold text-white`}>
              <ShinyText text="Voices of" speed={3} className={`font-rubik-bold`} />
            </span>
            <span className="text-[#FFD700] font-bold font-times italic"> Satisfaction</span>
          </h2>
        </div>

        {/* Mobile Testimonials (Single Card View) */}
        <div className="md:hidden mb-8 relative min-h-[300px]">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={`mobile-${currentIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute w-full"
              onAnimationComplete={handleAnimationComplete}
            >
              {/* Gradient border container */}
              <div className="gradient-border-container rounded-3xl p-[2px]">
                <div className="bg-[#111111] rounded-3xl p-6 h-full relative">
                  <p className="font-switzer-medium italic text-white text-base mb-12">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </p>

                  {/* Bottom section with avatar and info */}
                  <div className="flex items-center mt-4 mb-2">
                    {/* Avatar container */}
                    <motion.div
                      className="w-24 h-24 mr-4 flex-shrink-0 drop-shadow-xl"
                      whileHover="hover"
                      variants={avatarVariants}
                      style={{ perspective: 1000 }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={getValidImageSrc(testimonials[currentIndex].avatar) || "/placeholder.svg"}
                          alt={testimonials[currentIndex].name}
                          width={96}
                          height={96}
                          className="object-contain"
                        />
                      </div>
                    </motion.div>

                    {/* Name and title */}
                    <div>
                      <h4 className="font-switzer-medium text-white">{testimonials[currentIndex].name}</h4>
                      <p className="font-switzer-medium text-gray-400 text-sm">{testimonials[currentIndex].title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Testimonials with visible adjacent slides */}
        <div className="hidden md:block mb-16">
          <div className="flex justify-center items-center relative min-h-[350px] mt-10 sm:mt-20 md:mt-30">
            {/* Previous testimonial */}
            <motion.div
              className="w-1/3 px-2 opacity-10 transform -translate-x-1/4"
              custom={direction}
              variants={sideVariants}
              initial="hidden"
              animate="visible"
              key={`prev-${prevIndex}-${direction}`}
            >
              {/* Gradient border container */}
              <div className="gradient-border-container rounded-3xl p-[2px]">
                <div className="bg-[#111111] rounded-3xl p-8 h-full relative">
                  <p className="font-switzer-medium italic text-white text-lg mb-12">
                    &quot;{testimonials[prevIndex].quote}&quot;
                  </p>

                  {/* Bottom section with avatar and info */}
                  <div className="flex items-center mt-4 mb-2">
                    {/* Avatar container */}
                    <div className="w-20 h-20 mr-4 flex-shrink-0">
                      <div className="relative w-full h-full">
                        <Image
                          src={getValidImageSrc(testimonials[prevIndex].avatar) || "/placeholder.svg"}
                          alt={testimonials[prevIndex].name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Name and title */}
                    <div>
                      <h4 className="font-switzer-bold text-white">{testimonials[prevIndex].name}</h4>
                      <p className="font-switzer-bold text-gray-400 text-sm">{testimonials[prevIndex].title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current testimonial */}
            <div className="w-1/3 px-2 z-10 relative">
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                  className="w-full transform scale-105"
                  custom={direction}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={`current-${currentIndex}`}
                  onAnimationComplete={handleAnimationComplete}
                >
                  {/* Gradient border container */}
                  <div className="gradient-border-container rounded-3xl p-[2px]">
                    <div className="bg-[#111111] rounded-3xl p-8 h-full relative">
                      <p className="font-switzer-medium italic text-white text-lg mb-12">
                        &quot;{testimonials[currentIndex].quote}&quot;
                      </p>

                      {/* Bottom section with avatar and info */}
                      <div className="flex items-center mt-4 mb-2">
                        {/* Avatar container */}
                        <motion.div
                          className="w-32 h-32 mr-5 flex-shrink-0 drop-shadow-xl"
                          whileHover="hover"
                          variants={avatarVariants}
                          style={{ perspective: 1000 }}
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={getValidImageSrc(testimonials[currentIndex].avatar) || "/placeholder.svg"}
                              alt={testimonials[currentIndex].name}
                              width={128}
                              height={128}
                              className="object-contain"
                            />
                          </div>
                        </motion.div>

                        {/* Name and title */}
                        <div>
                          <h4 className="font-switzer-bold text-white">{testimonials[currentIndex].name}</h4>
                          <p className="font-switzer-bold text-gray-400 text-base">
                            {testimonials[currentIndex].title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next testimonial */}
            <motion.div
              className="w-1/3 px-2 opacity-10 transform translate-x-1/4"
              custom={direction}
              variants={sideVariants}
              initial="hidden"
              animate="visible"
              key={`next-${nextIndex}-${direction}`}
            >
              {/* Gradient border container */}
              <div className="gradient-border-container rounded-3xl p-[2px]">
                <div className="bg-[#111111] rounded-3xl p-8 h-full relative">
                  <p className="font-switzer-medium italic text-white text-lg mb-12">
                    &quot;{testimonials[nextIndex].quote}&quot;
                  </p>

                  {/* Bottom section with avatar and info */}
                  <div className="flex items-center mt-4 mb-2">
                    {/* Avatar container */}
                    <div className="w-20 h-20 mr-4 flex-shrink-0">
                      <div className="relative w-full h-full">
                        <Image
                          src={getValidImageSrc(testimonials[nextIndex].avatar) || "/placeholder.svg"}
                          alt={testimonials[nextIndex].name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Name and title */}
                    <div>
                      <h4 className="font-switzer-bold text-white">{testimonials[nextIndex].name}</h4>
                      <p className="font-switzer-bold text-gray-400 text-sm">{testimonials[nextIndex].title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows - Added more spacing and fixed positioning */}
        <div className="flex justify-center space-x-4 mt-20">
          <button
            onClick={prevSlide}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#FFD700] flex items-center justify-center text-[#FFD700] transition-colors ${
              isAnimating ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FFD700] hover:text-black cursor-pointer"
            }`}
            disabled={isAnimating}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#FFD700] flex items-center justify-center text-[#FFD700] transition-colors ${
              isAnimating ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FFD700] hover:text-black cursor-pointer"
            }`}
            disabled={isAnimating}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
