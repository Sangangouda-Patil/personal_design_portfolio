"use client"

import { motion } from "framer-motion"
import { Rubik } from "next/font/google"
import Image from "next/image"

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
        <div className="flex items-start mb-8 sm:mb-10 md:mb-12">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "90px" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-1 bg-[#FFD700] mr-3 sm:mr-4"
          ></motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            <span className={`${rubik.className} font-bold text-white`}>BRANDS I&apos;VE</span>
            <br />
            <span className={`${rubik.className} font-bold text-white`}>PARTNERED</span>
            <span className="text-[#FFD700] font-bold font-times italic"> WITH </span>
          </h2>
        </div>
      </div>

      {/* Brand Logos Grid - Full width with no gaps */}
      <div className="w-full overflow-hidden border-t border-[#222222] relative z-10">
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
