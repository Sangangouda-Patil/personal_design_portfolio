"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from 'next/image'

// Updated navigation items with section IDs instead of page routes
const leftNavItems = [
  { label: "Home", sectionId: "hero" },
  { label: "About", sectionId: "about" },
]

const rightNavItems = [
  { label: "Work", sectionId: "work" },
  { label: "Contact", sectionId: "contact" },
]

// Combine all nav items for mobile menu
const allNavItems = [...leftNavItems, ...rightNavItems]

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Home")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Create a stable handleScroll function with useCallback
  const handleScroll = useCallback(() => {
    // Update navbar background on scroll
    if (window.scrollY > 50) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }

    // Find the current active section based on scroll position
    const sections = [...leftNavItems, ...rightNavItems].map((item) => item.sectionId)

    // Get all section elements
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    // Find the section that is currently in view
    if (sectionElements.length) {
      const currentSection = sectionElements.reduce((closest, section) => {
        const sectionTop = section.offsetTop
        const scrollPosition = window.scrollY + 100 // Add offset for navbar height

        if (scrollPosition >= sectionTop && (!closest || sectionTop > closest.offsetTop)) {
          return section
        }
        return closest
      }, null as HTMLElement | null)

      if (currentSection) {
        // Find the nav item that corresponds to this section
        const allNavItems = [...leftNavItems, ...rightNavItems]
        const activeNav = allNavItems.find((item) => item.sectionId === currentSection.id)

        if (activeNav && activeNav.label !== activeItem) {
          setActiveItem(activeNav.label)
        }
      }
    }
  }, [activeItem])

  // Handle scroll effect and active section detection
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    // Call once to set initial active section
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll]) // handleScroll is stable with useCallback

  // Function to scroll to a section when nav item is clicked
  const scrollToSection = (sectionId: string, label: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Set active item immediately for better UX
      setActiveItem(label)

      // Close mobile menu if open
      setMobileMenuOpen(false)

      // Scroll to the section
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Render a nav item with proper styling and animations
  const renderNavItem = (item: { label: string; sectionId: string }) => (
    <button
      key={item.label}
      onClick={() => scrollToSection(item.sectionId, item.label)}
      className={`font-bold text-white text-lg relative ${
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
      onClick={() => scrollToSection(item.sectionId, item.label)}
      className={`text-white text-xl py-4 relative ${
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
        >
          <div className="flex items-center justify-between relative">
            {/* Left navigation items */}
            <div className="flex items-center space-x-8 mr-16">{leftNavItems.map(renderNavItem)}</div>

            {/* Center space for logo */}
            <div className="w-16 h-8 flex items-center justify-center">
              <Link href="/">
                <Image
                  src="/icons/logo.webp"
                  alt="Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
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
        >
          <div className="flex items-center justify-between">
            {/* Logo in the mobile navbar */}
            <div className="w-16 h-8 flex items-center justify-center">
              <Link href="/">
                <Image
                  src="/icons/logo.webp"
                  alt="Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Mobile menu button with proper X transformation */}
            <button
              className="text-white relative w-8 h-6 z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
