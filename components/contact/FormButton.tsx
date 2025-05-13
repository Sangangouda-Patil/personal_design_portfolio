"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FormButtonProps {
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  children: ReactNode
  className?: string
}

const FormButton = ({ type = "button", onClick, children, className = "" }: FormButtonProps) => {
  return (
    <div className="gradient-border-container rounded-lg">
      <motion.button
        type={type}
        onClick={onClick}
        className={`w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg font-medium transition-colors hover:bg-[#222222] ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.button>
    </div>
  )
}

export default FormButton
