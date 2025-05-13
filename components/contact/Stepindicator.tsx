"use client"

import { motion } from "framer-motion"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="relative flex items-center justify-between w-full">
      {/* Progress line */}
      <div className="absolute h-[2px] bg-gray-700 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>

      {/* Active progress line */}
      <motion.div
        className="absolute h-[2px] bg-white left-0 top-1/2 transform -translate-y-1/2 z-0"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      {/* Step circles */}
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="relative z-10 flex items-center justify-center">
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: index + 1 === currentStep ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`text-xl font-bold ${index + 1 <= currentStep ? "text-white" : "text-gray-500"}`}>
              {index + 1}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export default StepIndicator
