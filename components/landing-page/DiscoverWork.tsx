"use client"

import { motion } from "framer-motion"
import { Rubik } from "next/font/google"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import Image from "next/image"

// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})

// Sample project data with 5 cards
const highlightedProjects = [
  {
    id: 1,
    client: "DESIGN SYSTEM",
    title: "UI/UX Design System : Created a comprehensive component library",
    category: "App & Web",
    year: "2024",
    description:
      "An intuitive design system that increased development speed by 40% and improved UI consistency across platforms",
    tags: ["UI/UX", "Design System", "Figma"],
    image: "/discoverworksection/img1.webp",
    link: "/work/design-system",
  },
  {
    id: 2,
    client: "E-COMMERCE",
    title: "Shopify Redesign : Transformed user experience for higher conversions",
    category: "Web Design",
    year: "2023",
    description:
      "A complete redesign that boosted conversion rates by 35% and reduced cart abandonment for this premium fashion retailer",
    tags: ["Web Design", "E-commerce", "Shopify"],
    image: "/discoverworksection/img2.webp",
    link: "/work/ecommerce",
  },
  {
    id: 3,
    client: "HEALTH APP",
    title: "Wellness Tracker : Reimagined health monitoring for everyday users",
    category: "Mobile App",
    year: "2023",
    description:
      "An intuitive mobile interface that increased user engagement by 62% and session duration for this health tech startup",
    tags: ["Mobile", "UI Design", "React Native"],
    image: "/discoverworksection/img3.webp",
    link: "/work/mobile-app",
  },
  {
    id: 4,
    client: "TECH STARTUP",
    title: "Brand Identity : Created distinctive visual language for new venture",
    category: "Branding",
    year: "2024",
    description:
      "A comprehensive brand identity that helped secure Series A funding and market recognition for this innovative AI platform",
    tags: ["Branding", "Identity", "Logo Design"],
    image: "/discoverworksection/img4.webp",
    link: "/work/brand-identity",
  },
  {
    id: 5,
    client: "SAAS PLATFORM",
    title: "Analytics Dashboard : Visualized complex data for quick insights",
    category: "UI Design",
    year: "2023",
    description:
      "A data visualization dashboard that reduced decision-making time by 45% for enterprise users of this B2B analytics tool",
    tags: ["Dashboard", "Data Viz", "UI Design"],
    image: "/discoverworksection/img5.webp",
    link: "/work/dashboard",
  },
]

const DiscoverWork: React.FC = () => {
  // Add state for current card index
  const [currentIndex, setCurrentIndex] = useState(0)
  // Track direction of animation (1 for right/next, -1 for left/previous)
  const [direction, setDirection] = useState(0)
  // Track if we're in mobile view
  const [isMobile, setIsMobile] = useState(false)
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

  // Update mobile state based on window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
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
  }, [isAnimating]) // Only re-add when isAnimating changes

  // Add navigation functions
  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1) // Set direction to left
    setCurrentIndex((prev) => (prev === 0 ? highlightedProjects.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 700)
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1) // Set direction to right
    setCurrentIndex((prev) => (prev === highlightedProjects.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 700)
  }

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
    const visibleWidth = windowWidth >= 1920 ? 0.1 : windowWidth >= 1280 ? 0.08 : 0.05

    // Calculate the offset for adjacent cards
    // This ensures they're partially visible at the edges
    const sideCardOffset = carouselWidth * (0.5 - visibleWidth)

    if (index === currentIndex) {
      return {
        zIndex: 10,
        opacity: 1,
        scale: 1,
        x: isDragging ? dragX : 0,
        filter: "blur(0px)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      }
    } else if (index === prevIndex) {
      return {
        zIndex: 5,
        opacity: 0.08,
        scale: 0.8,
        x: isDragging ? -sideCardOffset + dragX : -sideCardOffset,
        filter: "blur(4px)",
      }
    } else if (index === nextIndex) {
      return {
        zIndex: 5,
        opacity: 0.08,
        scale: 0.8,
        x: isDragging ? sideCardOffset + dragX : sideCardOffset,
        filter: "blur(4px)",
      }
    } else {
      return {
        zIndex: 1,
        opacity: 0,
        scale: 0.7,
        x: index < currentIndex ? -carouselWidth * 1.5 : carouselWidth * 1.5,
        filter: "blur(6px)",
      }
    }
  }

  // Calculate card height based on screen size
  const getCardHeight = () => {
    if (windowWidth < 640) {
      return "450px" // Smaller height for mobile
    } else if (windowWidth < 768) {
      return "500px" // Medium height for small tablets
    } else {
      return "550px" // Default height for larger screens
    }
  }

  return (
    <section className="py-20 bg-[#0a0a0a] relative">
      <div className="section-container">
        {/* Section Header with yellow accent */}
        <div className="flex items-start mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-start mb-6 sm:mb-0">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "80px" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-1 bg-[#FFD700] mr-3 sm:mr-4 sm:h-[35px] md:h-[40px]"
            ></motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">
              <span className={`${rubik.className} font-bold text-white`}>DISCOVER MY</span>
              <br />
              <span className={`${rubik.className} font-bold text-white`}>HIGHLIGHTED</span>
              <span className="text-[#FFD700] font-bold font-times italic"> WORK </span>
            </h2>
          </div>
        </div>

        {/* Projects carousel with visible adjacent cards - full width container */}
        <div
          className="relative overflow-hidden w-full"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            height: getCardHeight(),
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {highlightedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="absolute w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%]"
                initial={false}
                animate={getCardStyle(index)}
                transition={{
                  x: smoothTransition,
                  ...fadeTransition,
                }}
              >
                {/* Project card with gradient border */}
                <div className="gradient-border-container rounded-2xl p-[2px]">
                  <div className="bg-[#161616] rounded-2xl overflow-hidden h-full shadow-lg">
                    {/* Card layout - horizontal layout on md+ screens, vertical on smaller screens */}
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Left side - Image placeholder */}
                      <div className="w-full md:w-1/2 bg-[#1a1a1a] relative overflow-hidden min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-0">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          className="object-cover"
                        />
                      </div>

                      {/* Right side - Project details */}
                      <div className="w-full md:w-1/2 p-3 xs:p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                        {/* Client name */}
                        <h4 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2">
                          {project.client}
                        </h4>

                        {/* Project title - smaller on mobile */}
                        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4 line-clamp-2">
                          {project.title}
                        </h3>

                        {/* Category and year */}
                        <div className="flex items-center text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4 md:mb-6">
                          <span>{project.category}</span>
                          <span className="mx-2">•</span>
                          <span>{project.year}</span>
                        </div>

                        {/* Project description - hide on very small screens, limit lines on mobile */}
                        <p className="hidden xs:block text-gray-300 text-xs xs:text-sm sm:text-base mb-3 sm:mb-4 md:mb-6 line-clamp-3 md:line-clamp-none">
                          {project.description.includes("design system") ? (
                            <>
                              An intuitive <span className="text-[#FFD700]">design system</span> that increased
                              development speed by 40% and improved UI consistency across platforms
                            </>
                          ) : (
                            project.description
                          )}
                        </p>

                        {/* View Project button */}
                        <Link href={project.link} className="inline-block mt-auto">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#1a1a1a] text-white rounded-full py-1.5 xs:py-2 sm:py-3 px-3 xs:px-4 sm:px-6 inline-flex items-center border border-[#333] hover:border-[#FFD700] transition-colors"
                          >
                            <span className="mr-1 xs:mr-2 text-xs xs:text-sm sm:text-base">View Project</span>
                            <ArrowRight size={14} className="xs:size-16" />
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation arrows below the carousel */}
        <div className="flex justify-center space-x-4 mt-4">
          <motion.button
            onClick={goToPrevious}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#FFD700] flex items-center justify-center text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={goToNext}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#FFD700] flex items-center justify-center text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
        </div>

        {/* View All Projects Button */}
        <div className="section-container">
        <div className="flex justify-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Gradient border container */}
            <div className="gradient-border-container rounded-full">
              <button className="bg-[#1a1a1a] text-white rounded-full py-5 px-10 flex items-center gap-4 hover:bg-[#2a2a2a] transition-colors text-xl">
                <span className="font-semibold pl-1 xs:pl-2">SEE 'EM ALL</span>
                <div className="bg-[#FFD700] rounded-full p-2 flex items-center justify-center">
                  <ArrowRight size={20} className="text-black" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


export default DiscoverWork
