"use client"

import { Rubik } from "next/font/google"
import Image from "next/image"

// Load Rubik font with semibold weight
const rubikSemibold = Rubik({
  subsets: ["latin"],
  weight: ["600", "700", "800"], // Added bold (700) and extra bold (800) weights
})

const rubikBold = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})

const sliderItems = [
  "ROI-driven designs that make an impact",
  "Custom designs tailored to your brand",
  "Quick delivery without compromising quality",
]

const InfiniteSlider = () => {
  return (
    <section className="w-full py-8 sm:py-10 md:py-12 overflow-hidden border-t border-b border-black relative">
      {/* Main background with your gold color */}
      <div className="absolute inset-0 bg-[#fada00]/90"></div>

      {/* Left fade mask for text */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[20%] z-30 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #ffd301 0%, rgba(206, 174, 3, 0.9) 40%, transparent 100%)",
        }}
      ></div>

      {/* Right fade mask for text */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[20%] z-30 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #ffd301 0%, rgba(206, 174, 3, 0.9) 40%, transparent 100%)",
        }}
      ></div>

      <div className="relative flex z-20">
        {/* First slider - moves from right to left */}
        <div className="animate-marquee whitespace-nowrap flex">
          {sliderItems.map((item, index) => (
            <div key={`slider-1-${index}`} className="flex items-center mx-14 sm:mx-20 md:mx-24">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image src="/icons/sliderstar.png" alt="Star" fill className="object-contain" />
              </div>
              <span
                className={`${rubikBold.className} text-black text-4xl sm:text-5xl md:text-6xl ml-8 whitespace-nowrap`}
              >
                {item}
              </span>
              {/* <div className="relative w-8 h-8 sm:w-10 sm:h-10 ml-6">
                <Image src="/icons/sliderstar.png" alt="Star" fill className="object-contain" />
              </div> */}
            </div>
          ))}
        </div>

        {/* Second slider - ensures seamless looping */}
        <div className="animate-marquee2 whitespace-nowrap flex absolute top-0 left-0">
          {sliderItems.map((item, index) => (
            <div key={`slider-2-${index}`} className="flex items-center mx-14 sm:mx-20 md:mx-24">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image src="/icons/sliderstar.png" alt="Star" fill className="object-contain" />
              </div>
              <span
                className={`${rubikBold.className} text-black text-4xl sm:text-5xl md:text-6xl ml-8  whitespace-nowrap`}
              >
                {item}
              </span>
              {/* <div className="relative w-8 h-8 sm:w-10 sm:h-10 ml-6 ">
                <Image src="/icons/star.svg" alt="Star" fill className="object-contain text-black" />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfiniteSlider
