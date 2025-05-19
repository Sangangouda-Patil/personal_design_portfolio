"use client"

import { motion } from "framer-motion"
import { Rubik } from "next/font/google"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import type React from "react"
import Image from "next/image"
import ShinyText from "../shared/ShinyText"

// Add these keyframe animations for text effects
const textRevealAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})

// Sample project data with 5 cards
const highlightedProjects = [
  {
    id: 1,
    client: "CommunionHub",
    title: "UI, UX & Development",
    category: "WEB & MOBILE",
    year: "2025",
    slug: "https://communion-hub-fxry.vercel.app/",
    // The image property is ready for you to add your own images
    image: "/discoverworksection/img1.webp", // You'll add your own image path here
  },
  {
    id: 2,
    client: "Creatorships",
    title: "UI, UX & Branding",
    category: "WEB",
    year: "2024",
    image: "/discoverworksection/img2.webp", // You'll add your own image path here
    slug: "https://creatorships.vercel.app/",
  },
  {
    id: 3,
    client: "Bobo Food Delivery App",
    title: "Design System",
    category: "Coming Soon",
    year: "2025",
    image: "/discoverworksection/img6.webp",
    slug: ""
  },
  {
    id: 4,
    client: "AM internationa",
    title: "UI, UX",
    category: "Landing Page",
    year: "2023",
    image: "/discoverworksection/img4.webp", // You'll add your own image path here
    slug: "https://aminternational.sg/",
  },
  {
    id: 5,
    client: "BabyMD",
    title: "UI, UX",
    category: "Coming Soon",
    year: "2025",
    image: "/discoverworksection/img5.webp", // You'll add your own image path here
    slug: "https://babymd.in/",
  },
  {
    id: 6,
    client: "DesignFLow",
    title: "UI, UX",
    category: "Landing Page",
    year: "2023",
    image: "/discoverworksection/img3.webp", // You'll add your own image path here
    slug: "https://www.figma.com/proto/qraBc63gpJ8WYilKdrPLrB/Design-Flow-Landing-Page?page-id=271%3A502&node-id=271-1346&viewport=460%2C65%2C0.15&t=6Fkk5TddC4f3S6eO-1&scaling=min-zoom&content-scaling=fixed",
  },
]

const DiscoverWork: React.FC = () => {
  // Add state for current card index
  const [currentIndex, setCurrentIndex] = useState(0)
  // Track if we're dragging
  const [isDragging, setIsDragging] = useState(false)
  // Track drag start position
  const [dragStartX, setDragStartX] = useState(0)
  // Track current drag position
  const [dragX, setDragX] = useState(0)
  // Ref for the carousel container
  const carouselRef = useRef<HTMLDivElement>(null)
  // Track carousel width
  const [carouselWidth, setCarouselWidth] = useState(0)
  // Track window width
  const [windowWidth, setWindowWidth] = useState(0)
  // Track if animation is in progress
  const [isAnimating, setIsAnimating] = useState(false)

  // Add navigation functions
  const goToPrevious = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? highlightedProjects.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 700)
  }, [isAnimating])

  const goToNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === highlightedProjects.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 700)
  }, [isAnimating])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevious, goToNext])

  // Update mobile state based on window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragX(0)
  }

  // Handle touch start for dragging on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return
    setIsDragging(true)
    setDragStartX(e.touches[0].clientX)
    setDragX(0)
  }

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - dragStartX
    setDragX(deltaX)
  }

  // Handle touch move for dragging on mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const deltaX = e.touches[0].clientX - dragStartX
    setDragX(deltaX)
  }

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    // If dragged more than 100px or 20% of carousel width, navigate
    const threshold = Math.min(100, carouselWidth * 0.2)

    if (dragX > threshold) {
      goToPrevious()
    } else if (dragX < -threshold) {
      goToNext()
    }

    setDragX(0)
  }

  // Handle touch end to end dragging on mobile
  const handleTouchEnd = () => {
    handleMouseUp()
  }

  // Get previous and next indices with wrapping
  const prevIndex = currentIndex === 0 ? highlightedProjects.length - 1 : currentIndex - 1
  const nextIndex = currentIndex === highlightedProjects.length - 1 ? 0 : currentIndex + 1

  // Custom transition for smoother animations
  const smoothTransition = {
    type: "spring",
    stiffness: 180, // Reduced from 300 for smoother motion
    damping: 25, // Reduced from 30 for smoother motion
    mass: 1.2, // Increased from 1 for more inertia
    duration: 0.6, // Added explicit duration
  }

  // Separate transition for opacity and filter for smoother blending
  const fadeTransition = {
    opacity: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    filter: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    scale: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }

  // Calculate transform values for each card
  const getCardStyle = (index: number) => {
    // Calculate how much of the adjacent cards should be visible
    // On larger screens, show more of the adjacent cards
    const visibleWidth = windowWidth >= 1920 ? 0.25 : windowWidth >= 1280 ? 0.2 : 0.15

    // Calculate the offset for adjacent cards
    // This ensures they're partially visible at the edges
    // Reduced offset to make adjacent cards more visible
    const sideCardOffset = carouselWidth * (0.4 - visibleWidth)

    if (index === currentIndex) {
      return {
        zIndex: 10,
        opacity: 1,
        scale: 1,
        x: isDragging ? dragX : 0,
        filter: "blur(0px)",
        transition: {
          scale: {
            duration: 0.3,
          },
        },
      }
    } else if (index === prevIndex) {
      return {
        zIndex: 5,
        opacity: 0.1, // Slightly increased opacity
        scale: 0.85, // Slightly larger scale
        x: isDragging ? -sideCardOffset + dragX : -sideCardOffset,
        filter: "blur(3px)", // Slightly less blur
      }
    } else if (index === nextIndex) {
      return {
        zIndex: 5,
        opacity: 0.1, // Slightly increased opacity
        scale: 0.85, // Slightly larger scale
        x: isDragging ? sideCardOffset + dragX : sideCardOffset,
        filter: "blur(3px)", // Slightly less blur
      }
    } else {
      return {
        zIndex: 1,
        opacity: 0,
        scale: 0.75, // Slightly larger scale
        x: index < currentIndex ? -carouselWidth * 1.5 : carouselWidth * 1.5,
        filter: "blur(6px)",
      }
    }
  }

  // Calculate card width based on screen size - IMPROVED RESPONSIVENESS
  const getCardWidth = () => {
    if (windowWidth < 375) {
      return "260px" // Smaller for very small devices
    } else if (windowWidth < 480) {
      return "320px" // Small mobile
    } else if (windowWidth < 640) {
      return "340px" // Mobile
    } else if (windowWidth < 768) {
      return "380px" // Large mobile
    } else if (windowWidth < 1024) {
      return "420px" // Tablet
    } else if (windowWidth < 1280) {
      return "480px" // Small desktop
    } else if (windowWidth < 1536) {
      return "520px" // Desktop
    } else {
      return "550px" // Large desktop
    }
  }

  // Calculate image height to maintain aspect ratio - IMPROVED RESPONSIVENESS
  const getImageHeight = () => {
    const cardWidth = Number.parseInt(getCardWidth().replace("px", ""))
    // Maintain a 4:3 aspect ratio for the image
    const baseHeight = Math.round((cardWidth / 4) * 3)

    // Ensure minimum height on very small screens
    if (windowWidth < 375) {
      return Math.max(baseHeight, 210) + "px"
    } else if (windowWidth < 480) {
      return Math.max(baseHeight, 240) + "px"
    } else if (windowWidth < 640) {
      return Math.max(baseHeight, 260) + "px"
    } else if (windowWidth < 768) {
      return Math.max(baseHeight, 280) + "px"
    } else if (windowWidth < 1024) {
      return Math.max(baseHeight, 300) + "px"
    } else {
      return Math.max(baseHeight, 340) + "px"
    }
  }

  // Calculate card container height based on content - IMPROVED RESPONSIVENESS
  const getCardContainerHeight = () => {
    const imageHeight = Number.parseInt(getImageHeight().replace("px", ""))
    // Add space for text content and padding - adjust for different screen sizes
    const textContentHeight =
      windowWidth < 480 ? 180 : windowWidth < 640 ? 200 : windowWidth < 768 ? 220 : windowWidth < 1024 ? 230 : 250
    return imageHeight + textContentHeight + "px"
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#0a0a0a] relative">
      <div className="section-container">
       {/* Centered Section Header with ShinyText effect */}
       <div className="flex flex-col items-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-9xl text-center">
            <span className={`font-rubik-bold text-white`}>
              <ShinyText text="Featured" speed={3} className={`font-rubik-bold`} />
            </span>
            <span className="text-[#FFD700] font-bold font-times italic"> Work</span>
          </h2>
        </div>
      

        {/* Projects carousel with visible adjacent cards - full width container */}
        <div
          className="relative overflow-hidden w-full mt-10 sm:mt-20 md:mt-30"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            height: getCardContainerHeight(),
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {highlightedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="absolute group cursor-pointer"
                style={{ width: getCardWidth() }}
                initial={false}
                animate={getCardStyle(index)}
                transition={{
                  x: smoothTransition,
                  ...fadeTransition,
                }}
              >
                {/* Card with enhanced styling and gradient border */}
                <div className="overflow-hidden rounded-2xl sm:rounded-3xl flex flex-col relative h-full">
                  {/* Gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-2xl sm:rounded-3xl p-[1px]"></div>
                  <div className="relative z-10 flex flex-col w-full h-full bg-[#111111] rounded-2xl sm:rounded-3xl overflow-hidden">
                    {/* Image placeholder area with gradient and hover effect */}
                    <div
                      className="w-full rounded-t-2xl sm:rounded-t-3xl relative overflow-hidden transition-all duration-500"
                      style={{
                        height: getImageHeight(),
                        background: project.image ? "transparent" : "linear-gradient(135deg, #111111 0%, #333333 100%)",
                      }}
                    >
                      {project.image ? (
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.client}
                          fill
                          className="object-cover rounded-t-2xl sm:rounded-t-3xl transition-transform duration-700 hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/30 text-base sm:text-lg font-rubik">Project Preview</span>
                        </div>
                      )}

                      {/* Category badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/70 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-rubik">{project.category}</span>
                      </div>
                    </div>

                    {/* Text content area with simplified hover effects */}
                    <div className="px-3 xs:px-4 sm:px-6 md:px-8 py-3 xs:py-4 sm:py-6 bg-[#111111] flex-grow flex flex-col">
                      {/* Client name with hover movement effect */}
                      <div className="overflow-hidden mb-1 sm:mb-2">
                        <h3 className="font-switzer font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#FFD700] leading-tight tracking-tight transform group-hover:translate-x-2 transition-transform duration-300">
                          {project.client}
                        </h3>
                      </div>

                      {/* Title with hover movement effect */}
                      <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
                        <h4 className="font-rubik font-bold text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 tracking-tight transform group-hover:translate-x-2 transition-transform duration-300">
                          {project.title}
                        </h4>
                      </div>

                      {/* Bottom row with year and View Project button */}
                      <div className="flex justify-between items-center border-t border-white/10 pt-2 xs:pt-3 sm:pt-4 mt-auto">
                        {/* Year moved to the left */}
                        <span className="text-white/80 font-rubik text-sm sm:text-base md:text-lg transform group-hover:translate-x-2 transition-transform duration-300">
                          {project.year}
                        </span>

                        {/* View Project button as a pill-shaped button with yellow arrow - REMOVED text hover effect */}
                        <div className="gradient-border-container rounded-full">
                          <a
                            href={project.slug}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#111111] hover:bg-[#222222] text-white rounded-full py-1 xs:py-1.5 sm:py-2 px-2 xs:px-3 sm:px-4 flex items-center gap-1 xs:gap-1.5 sm:gap-2 transition-colors duration-300 group/button"
                            onClick={(e) => {
                              // Prevent the click from triggering the card's drag behavior
                              e.stopPropagation()
                            }}
                          >
                            <span className="font-medium text-xs xs:text-sm whitespace-nowrap">View Project</span>
                            <div className="bg-[#FFD700] rounded-full p-0.5 xs:p-1 flex items-center justify-center group-hover/button:scale-110 transition-transform duration-300">
                              <ArrowRight
                                size={windowWidth < 480 ? 8 : windowWidth < 640 ? 10 : 12}
                                className="text-black"
                              />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation arrows below the carousel - UPDATED to match testimonials section */}
        <div className="flex justify-center space-x-4 mt-5">
          <motion.button
            onClick={goToPrevious}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#FFD700] flex items-center justify-center text-[#FFD700] transition-colors ${
              isAnimating ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FFD700] hover:text-black cursor-pointer"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAnimating}
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={goToNext}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#FFD700] flex items-center justify-center text-[#FFD700] transition-colors ${
              isAnimating ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FFD700] hover:text-black cursor-pointer"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAnimating}
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>

      {/* View All Projects Button */}
      <div className="section-container">
        <div className="flex justify-center mt-6 sm:mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Gradient border container
            <div className="gradient-border-container rounded-full">
              <button
                className="bg-[#1a1a1a] text-white rounded-full py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 flex items-center gap-2 sm:gap-3 md:gap-4 hover:bg-[#2a2a2a] transition-colors text-base sm:text-lg md:text-xl group"
                onClick={() => {
                  const heroSection = document.getElementById("hero")
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                <span className="font-semibold tracking-wider transform group-hover:translate-x-2 transition-transform duration-300">
                  SEE &apos;EM ALL
                </span>
                <div className="bg-[#FFD700] rounded-full p-1 sm:p-1.5 md:p-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight
                    size={windowWidth < 640 ? 16 : 20}
                    className="text-black group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </button>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DiscoverWork
