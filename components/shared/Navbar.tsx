"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

// Navigation items with section IDs
const leftNavItems = [
  { label: "Home", sectionId: "hero" },
  { label: "About", sectionId: "about" },
]

const rightNavItems = [
  { label: "Work", sectionId: "work" },
  { label: "Contact", sectionId: "contact" }, // This should match the ID in ContactSection
]

// Combine all nav items for mobile menu
const allNavItems = [...leftNavItems, ...rightNavItems]

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Home")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Ref to track if we're currently handling a click
  const isNavigatingRef = useRef(false)

  // Ref to store intersection data
  const intersectionDataRef = useRef<{ [key: string]: number }>({})

  // Debug mode
  const DEBUG = false

  // Debug log function
  const debugLog = (message: string, data?: unknown) => {
    if (!DEBUG) return
    if (data) {
      console.log(`[Navbar] ${message}:`, data)
    } else {
      console.log(`[Navbar] ${message}`)
    }
  }

  // Set up intersection observers for each section
  useEffect(() => {
    // Initialize intersection data
    allNavItems.forEach((item) => {
      intersectionDataRef.current[item.sectionId] = 0
    })

    // Create observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if we're currently handling navigation
        if (isNavigatingRef.current) return

        // Update intersection data for each entry
        entries.forEach((entry) => {
          const targetId = entry.target.id
          intersectionDataRef.current[targetId] = entry.intersectionRatio

          debugLog(`Section ${targetId} intersection: ${entry.intersectionRatio.toFixed(4)}`)
        })

        // Find section with highest intersection ratio
        let highestRatio = -1
        let highestSection = null

        allNavItems.forEach((item) => {
          const ratio = intersectionDataRef.current[item.sectionId] || 0
          if (ratio > highestRatio) {
            highestRatio = ratio
            highestSection = item
          }
        })

        // Special case for when we're at the top of the page
        if (window.scrollY < 100) {
          const homeItem = allNavItems.find((item) => item.label === "Home")
          if (homeItem) {
            highestSection = homeItem
            debugLog("Near top of page, forcing Home section")
          }
        }

        // Update active item if we found a section
        if (highestSection && highestSection.label !== activeItem) {
          debugLog(`Setting active item to ${highestSection.label} with ratio ${highestRatio.toFixed(4)}`)
          setActiveItem(highestSection.label)
        }
      },
      {
        // Adjust threshold to be more sensitive
        // This creates 11 thresholds from 0 to 1.0
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      },
    )

    // Observe all sections
    allNavItems.forEach((item) => {
      const element = document.getElementById(item.sectionId)
      if (element) {
        observer.observe(element)
        debugLog(`Observing section: ${item.sectionId}`)
      } else {
        debugLog(`WARNING: Section not found: ${item.sectionId}`)
      }
    })

    // Clean up
    return () => {
      allNavItems.forEach((item) => {
        const element = document.getElementById(item.sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [activeItem])

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Call once to set initial state
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Improved scroll to section function
  const scrollToSection = (sectionId: string, label: string, e: React.MouseEvent) => {
    // Stop event propagation to prevent parent elements from capturing the click
    e.stopPropagation()

    debugLog(`Clicked navigation: ${label} (${sectionId})`)

    // First check if we're on the homepage
    const isHomePage = window.location.pathname === "/" || window.location.pathname === ""

    // If we're not on the homepage, redirect to homepage with hash
    if (!isHomePage) {
      debugLog(`Not on homepage, redirecting to /#${sectionId}`)
      window.location.href = `/#${sectionId}`
      return
    }

    // Set flag that we're handling navigation
    isNavigatingRef.current = true

    // Force active item immediately for better UX
    setActiveItem(label)
    debugLog(`Set active item to: ${label}`)

    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }

    // Try to find the element
    const element = document.getElementById(sectionId)
    if (element) {
      debugLog(`Scrolling to section: ${sectionId}`)

      // Scroll to the section
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Reset navigation flag after animation completes
      setTimeout(() => {
        isNavigatingRef.current = false
      }, 1000)
    } else {
      console.warn(`Section with ID "${sectionId}" not found`)
      debugLog(`WARNING: Section with ID "${sectionId}" not found`)

      // Fallback for contact section - try to scroll to the bottom of the page
      if (sectionId === "contact") {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
        console.log("Fallback: Scrolling to bottom of page for contact section")
      }

      // Reset navigation flag
      isNavigatingRef.current = false
    }
  }

  // Prevent default behavior for navbar background clicks
  const handleNavbarBackgroundClick = (e: React.MouseEvent) => {
    // Only prevent default if the click is directly on the navbar background
    // and not on a child element
    if (e.target === e.currentTarget) {
      e.preventDefault()
      e.stopPropagation()
      debugLog("Clicked navbar background, preventing default behavior")
    }
  }

  // Render a nav item with proper styling and animations
  const renderNavItem = (item: { label: string; sectionId: string }) => (
    <button
      key={item.label}
      onClick={(e) => scrollToSection(item.sectionId, item.label, e)}
      className={`font-switzer-extrabold text-white text-lg relative px-4 py-2 ${
        activeItem === item.label ? "opacity-100" : "opacity-70 hover:opacity-100"
      } transition-opacity duration-200`}
    >
      {item.label}
      {activeItem === item.label && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
          layoutId="underline"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  )

  // Render a mobile nav item
  const renderMobileNavItem = (item: { label: string; sectionId: string }) => (
    <motion.button
      key={item.label}
      onClick={(e) => scrollToSection(item.sectionId, item.label, e)}
      className={`font-switzer-extrabold text-white text-xl py-4 relative ${
        activeItem === item.label ? "opacity-100" : "opacity-70"
      } transition-opacity duration-200`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {item.label}
    </motion.button>
  )

  return (
    <div className="w-full flex justify-center pt-6 fixed top-0 z-50">
      {/* Desktop navbar */}
      <div className="hidden md:block gradient-border-container">
        <motion.nav
          className={`rounded-full ${scrolled ? "bg-black/90" : "bg-black/70"} backdrop-blur-md px-8 py-4 transition-all duration-300`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleNavbarBackgroundClick}
        >
          <div className="flex items-center justify-between relative">
            {/* Left navigation items */}
            <div className="flex items-center space-x-8 mr-16">{leftNavItems.map(renderNavItem)}</div>

            {/* Center space for logo */}
            <div className="w-16 h-8 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Link href="/" onClick={(e) => e.stopPropagation()}>
                <div className="relative w-16 h-8">
                  <Image
                    src="/icons/logo.webp"
                    alt="Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Right navigation items */}
            <div className="flex items-center space-x-8 ml-16">{rightNavItems.map(renderNavItem)}</div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden w-[90%] max-w-[320px] gradient-border-container relative z-50">
        <motion.nav
          className={`rounded-full ${scrolled ? "bg-black/90" : "bg-black/70"} backdrop-blur-md px-4 py-3 transition-all duration-300`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleNavbarBackgroundClick}
        >
          <div className="flex items-center justify-between">
            {/* Logo in the mobile navbar */}
            <div className="w-16 h-8 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Link href="/" onClick={(e) => e.stopPropagation()}>
                <div className="relative w-16 h-8">
                  <Image
                    src="/icons/logo.webp"
                    alt="Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Mobile menu button with proper X transformation */}
            <button
              className="text-white relative w-8 h-6 z-50"
              onClick={(e) => {
                e.stopPropagation()
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* First line */}
                <span
                  className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-[0.3rem]" : "mb-1.5"
                  }`}
                ></span>

                {/* Middle line */}
                <span
                  className={`block h-0.5 w-full bg-white transition-opacity duration-200 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>

                {/* Last line */}
                <span
                  className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[0.3rem]" : "mt-1.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-40 pt-24 px-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center">{allNavItems.map(renderMobileNavItem)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
