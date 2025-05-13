"use client"

import React from "react"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary"
}

const FormButton: React.FC<FormButtonProps> = ({ type = "button", onClick, children, className = "", variant = "primary" }) => {
  const buttonClassName = `w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg font-medium transition-colors hover:bg-[#222222] ${className} ${variant === "primary" ? "" : "btn-secondary"}`

  return (
    <div className="gradient-border-container rounded-lg">
      <motion.button
        type={type}
        onClick={onClick}
        className={buttonClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.button>
    </div>
  )
}

export default FormButton
