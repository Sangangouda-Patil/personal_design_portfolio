"use client"

import { motion } from "framer-motion"
import { Rubik } from 'next/font/google'
import Image from "next/image"

// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})

// Define all 10 tools/weapons with their names and background colors
const tools = [
  { id: 1, name: "Figma", bg: "bg-[#1E1E2E]", imagePath: "/images/weapons/figma.webp", url: "https://www.figma.com" },
  { id: 2, name: "Framer", bg: "bg-[#0055FF]", imagePath: "/images/weapons/framer.webp", url: "https://www.framer.com" },
  { id: 3, name: "Midjourney", bg: "bg-black", imagePath: "/images/weapons/midjourney.webp", url: "https://www.midjourney.com" },
  { id: 4, name: "Photoshop", bg: "bg-[#001E36]", imagePath: "/images/weapons/photoshop.webp", url: "https://www.adobe.com/products/photoshop.html" },
  { id: 5, name: "Illustrator", bg: "bg-[#330000]", imagePath: "/images/weapons/illustrator.webp", url: "https://www.adobe.com/products/illustrator.html" },
  { id: 6, name: "Premiere Pro", bg: "bg-[#00005B]", imagePath: "/images/weapons/premiere-pro.webp", url: "https://www.adobe.com/products/premiere.html" },
  { id: 7, name: "Cursor AI", bg: "bg-black", imagePath: "/images/weapons/cursor-ai.webp", url: "https://www.cursorai.com" },
  { id: 8, name: "After Effects", bg: "bg-[#00005B]", imagePath: "/images/weapons/react.webp", url: "https://react.dev/" },
  // { id: 9, name: "Webflow", bg: "bg-[#4353FF]", imagePath: "/images/weapons/webflow.webp" },
  // { id: 10, name: "VS Code", bg: "bg-[#007ACC]", imagePath: "/images/weapons/vs-code.webp" }, 
]

const WeaponsSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-[#0a0a0a] border-t border-b border-[#1a1a1a]">
      <div className="section-container">
        {/* Tools/Weapons Container with gradient border matching navbar */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Gradient border container */}
          <div className="gradient-border-container rounded-2xl">
            <div className="bg-[#111111] rounded-2xl p-4 sm:p-6">
              {/* Horizontal layout with heading on left and tools on right */}
              <div className="flex flex-col md:flex-row items-center md:items-center justify-between">
                {/* Heading on the left */}
                <div className="mb-6 md:mb-0 text-center md:text-left">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl">
                    <span className={`${rubik.className} font-bold`}>Weapons</span>{" "}
                    <span className="text-[#FFD700] font-bold font-times italic">I Use</span>{" "}
                    {/* <span className={`${rubik.className} font-bold`}>Use</span> */}
                  </h2>
                </div>

                {/* Tool Items container */}
                <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4">
                  {tools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * tool.id }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.05,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          duration: 0.2,
                        },
                      }}
                    >
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <div
                          className={`w-[60px] h-[60px] sm:w-[60px] sm:h-[60px] rounded-lg ${tool.bg} overflow-hidden flex items-center justify-center`}
                        >
                          <Image 
                            src={tool.imagePath || "/placeholder.svg"}
                            alt={tool.name}
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WeaponsSection
