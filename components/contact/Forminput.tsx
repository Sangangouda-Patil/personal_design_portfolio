"use client"

import type { ChangeEvent } from "react"
import { motion } from "framer-motion"

interface FormInputProps {
  type: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder: string
  required?: boolean
  isTextarea?: boolean
  rows?: number
}

const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required = true,
  isTextarea = false,
  rows = 4,
}: FormInputProps) => {
  return (
    <motion.div
      className="mb-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="gradient-border-container rounded-lg">
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className="w-full px-4 py-3 bg-[#0a0a0a] rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-3 bg-[#0a0a0a] rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors"
          />
        )}
      </div>
    </motion.div>
  )
}

export default FormInput
