"use client"

import { motion } from "framer-motion"
import { Rubik } from "next/font/google"
import Image from "next/image"
import ShinyText from "../shared/ShinyText"


// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})

// Sample brand data with logos
const brands = Array.from({ length: 13 }, (_, index) => ({
  id: index + 1,
  name: `Brand ${index + 1}`,
  logo: `/brands/img${index + 1}.webp`,
}))

// Create a larger array with more duplicates to ensure no gaps on larger screens
const extendedBrands = [...brands, ...brands, ...brands]

const BrandsSection = () => {
  return (
    <section id="brands" className="py-20 bg-[#0a0a0a] overflow-hidden relative">
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(255, 215, 0, 0.15), transparent 60%), radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.15), transparent 60%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header with yellow accent - aligned left */}
        {/* Centered Section Header */}
          {/* Centered Section Header with ShinyText effect */}
          <div className="flex flex-col items-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-9xl text-center">
            <span className={`font-rubik-bold text-white`}>
              <ShinyText text="Worked" speed={3} className={`font-rubik-bold`} />
            </span>
            <span className="text-[#FFD700] font-bold font-times italic"> With</span>
          </h2>
        </div>
      </div>

      {/* Brand Logos Grid - Full width with no gaps */}
      <div className="w-full overflow-hidden border-t border-[#222222] relative z-10 mt-10 sm:mt-20 md:mt-30">
        {/* Slider container - no padding to avoid gaps */}
        <div className="flex pointer-events-none relative">
          {/* First set of logos for infinite scroll */}
          <div className="flex animate-scroll">
            {extendedBrands.map((brand, index) => (
              <div
                key={`logo-${brand.id}-${index}`}
                className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] 2xl:w-[260px] h-[120px] sm:h-[140px] md:h-[160px] border-r border-b border-[#222222] flex items-center justify-center bg-[#0a0a0a] bg-opacity-80 flex-shrink-0"
              >
                {/* Brand logo */}
                <div className="relative w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] pointer-events-auto h-[60px] sm:h-[70px] md:h-[80px]">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 80px, (max-width: 1200px) 100px, 140px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless looping */}
          <div className="flex animate-scroll">
            {extendedBrands.map((brand, index) => (
              <div
                key={`logo-dup-${brand.id}-${index}`}
                className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] 2xl:w-[260px] h-[120px] sm:h-[140px] md:h-[160px] border-r border-b border-[#222222] flex items-center justify-center bg-[#0a0a0a] bg-opacity-80 flex-shrink-0"
              >
                {/* Brand logo */}
                <div className="relative w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] pointer-events-auto h-[60px] sm:h-[70px] md:h-[80px]">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 80px, (max-width: 1200px) 100px, 140px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
