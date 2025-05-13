"use client"

import { motion } from "framer-motion"

const navItems = [
  { label: "Home", sectionId: "hero" },
  { label: "About", sectionId: "about" },
  { label: "Work", sectionId: "work" },
  { label: "Contact", sectionId: "contact" },
]

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="w-full flex flex-col items-center py-8 bg-[#0a0a0a]">
      <div className="section-container w-full mb-4">
        <div className="gradient-border-container rounded-full">
          <motion.nav
            className="rounded-full bg-black/90 backdrop-blur-md px-6 sm:px-10 py-3 sm:py-5 transition-all duration-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation items in a single row */}
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-between w-full max-w-xs sm:max-w-md">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.sectionId)}
                    className="font-rubik font-bold text-white text-sm sm:text-xl md:text-2xl relative opacity-100 hover:opacity-80 transition-opacity duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        </div>
      </div>

      {/* Copyright text positioned below the box and centered */}
      <div className="section-container w-full">
        <div className="text-center">
          <p className="font-rubik text-white/70 text-xs sm:text-sm">
            © 2025 All Rights Reserved <span className="text-[#FFD700] font-times italic">Sangangouda Patil</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
