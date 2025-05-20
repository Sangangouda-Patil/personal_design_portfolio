"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Bayon } from "next/font/google"
import type { ReactNode } from "react"

// Load Bayon font
const bayon = Bayon({
  subsets: ["latin"],
  weight: ["400"],
})

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  icon?: ReactNode
  className?: string
  fullWidth?: boolean
}

const Button = ({
  children,
  onClick,
  icon = <ArrowRight size={20} />,
  className = "",
  fullWidth = false,
}: ButtonProps) => {
  return (
    <div className={`gradient-border-container ${fullWidth ? "w-full" : "w-auto inline-block"}`}>
      <motion.button
        className={`${bayon.className} bg-[#1a1a1a] text-white py-3 px-5 rounded-full flex items-center gap-3 ${fullWidth ? "w-full justify-between" : "w-auto"} ${className}`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{children}</span>
        <span className="flex-shrink-0">{icon}</span>
      </motion.button>
    </div>
  )
}

export default Button
