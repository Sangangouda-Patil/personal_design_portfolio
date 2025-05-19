"use client"

import type React from "react"

import { useState, type ChangeEvent } from "react"
import { motion } from "framer-motion"
import { Rubik } from "next/font/google"

// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})

// Custom WhatsApp icon component
const WhatsAppIcon = ({ size = 20, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3764 4.62392C17.2619 2.50291 14.4454 1.32775 11.4602 1.32471C5.31709 1.32471 0.324547 6.31644 0.321503 12.4618C0.320481 14.3825 0.776358 16.2577 1.64818 17.9359L0.25 23.75L6.20332 22.3881C7.82083 23.1768 9.62219 23.5946 11.4548 23.5953H11.4602C17.6026 23.5953 22.5951 18.6032 22.5989 12.4575C22.6019 9.47909 21.4909 6.74493 19.3764 4.62392ZM11.4602 21.6909H11.4558C9.81037 21.6902 8.19645 21.2904 6.77547 20.5362L6.44681 20.3489L3.02957 21.1606L3.85688 17.8281L3.64943 17.4863C2.81888 16.0145 2.37633 14.3296 2.37731 12.4625C2.37974 7.36911 6.36759 3.22968 11.4646 3.22968C13.9407 3.23211 16.2739 4.21189 18.0095 5.95236C19.7451 7.69283 20.7204 10.0289 20.7182 12.5568C20.7155 17.6505 16.5534 21.6909 11.4602 21.6909ZM16.6809 14.8319C16.4089 14.6959 15.0328 14.0202 14.7811 13.9262C14.5294 13.8322 14.3454 13.7852 14.1615 14.0575C13.9775 14.3297 13.4428 14.9582 13.2792 15.1422C13.1156 15.3262 12.952 15.3497 12.6797 15.2137C12.4075 15.0777 11.5123 14.7747 10.4598 13.8322C9.63861 13.0933 9.09358 12.1774 8.92999 11.9051C8.76639 11.6329 8.91257 11.4821 9.05268 11.3431C9.17865 11.2179 9.33164 11.0143 9.47172 10.8507C9.6118 10.6871 9.65879 10.5691 9.75277 10.3851C9.84675 10.2011 9.79976 10.0375 9.72928 9.90152C9.65879 9.76553 9.11498 8.38837 8.88396 7.84395C8.65903 7.31364 8.43044 7.38778 8.25774 7.37939C8.09414 7.37161 7.91017 7.37039 7.72621 7.37039C7.54224 7.37039 7.24345 7.44087 6.99176 7.71312C6.74007 7.98537 6.01729 8.66107 6.01729 10.0382C6.01729 11.4154 7.03472 12.7456 7.1748 12.9296C7.31488 13.1136 9.09114 15.8487 11.8111 16.9966C12.4588 17.2767 12.9644 17.4465 13.3583 17.5744C14.0064 17.7863 14.5984 17.7558 15.0642 17.6834C15.5819 17.6028 16.6809 17.0094 16.9119 16.3709C17.1429 15.7325 17.1429 15.1881 17.0724 15.0715C17.0019 14.9549 16.8179 14.8844 16.5457 14.7484C16.2734 14.6124 16.4089 14.6959 16.6809 14.8319Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Form Input Component
const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required = true,
  isTextarea = false,
  rows = 4,
  error = "",
}: {
  type: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder: string
  required?: boolean
  isTextarea?: boolean
  rows?: number
  error?: string
}) => {
  return (
    <motion.div
      className="mb-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`gradient-border-container rounded-lg ${error ? "border-red-500" : ""}`}>
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
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </motion.div>
  )
}

// Form Button Component
const FormButton = ({
  type = "button",
  onClick,
  children,
  variant = "primary",
  className = "",
  disabled = false,
}: {
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  children: React.ReactNode
  variant?: "primary" | "secondary"
  className?: string
  disabled?: boolean
}) => {
  return (
    <div className={`gradient-border-container rounded-lg ${disabled ? "opacity-70" : ""}`}>
      <motion.button
        type={type}
        onClick={onClick}
        className={`w-full px-4 py-3 ${variant === "primary" ? "bg-[#1a1a1a]" : "bg-[#111111]"} text-white rounded-lg font-medium transition-colors hover:bg-[#222222] ${className}`}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        disabled={disabled}
      >
        {children}
      </motion.button>
    </div>
  )
}

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
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

// WhatsApp Redirect Component
const WhatsAppRedirect = () => {
  // Replace with your actual WhatsApp number
  const whatsappNumber = "8217672080"

  const openWhatsAppChat = () => {
    // You can add a pre-filled message if desired
    const message = "Hello! I'd like to discuss a project with you."
    const encodedMessage = encodeURIComponent(message)

    // Open WhatsApp with the number and message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <motion.div
      className="flex items-center justify-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <span className="mr-3 text-gray-400">or</span>
      <motion.button
        onClick={openWhatsAppChat}
        className="flex items-center text-white bg-transparent hover:text-[#FFD700] transition-colors relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <WhatsAppIcon size={20} className="mr-2" />
        <span className="font-medium">Say hello!</span>
        {/* Straight scribble line under "Say hello!" */}
        <svg
          className="absolute -bottom-1 left-0 w-full"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M1 2C5 1 10 3 15 2C20 1 25 1 30 2C35 3 40 3 45 2C50 1 55 1 60 2C65 3 70 3 75 2C80 1 85 1 90 2C95 3 99 2 99 2"
            stroke="#FFD700"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.button>
    </motion.div>
  )
}

// Form Data Type
export type FormData = {
  fullName: string
  whatsappNumber: string
  email: string
  services: string[]
  message?: string
}

// Main Contact Form Component
const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsappNumber: "",
    email: "",
    services: [],
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{
    success?: boolean
    message?: string
  }>({})

  // Add state for validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const services = [
    "Landing Page",
    "Portfolio Website",
    "E-Commerce Website",
    "Redefining Your Company's Presence",
    "SEO Strategies To Drive Growth",
  ]

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  // Add a validation function to check all fields before proceeding
  const validateForm = () => {
    // Create an object to store validation errors
    const errors: Record<string, string> = {}

    // Validate fullName (required, 2-50 chars)
    if (!formData.fullName.trim()) {
      errors.fullName = "Name is required"
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Name must be at least 2 characters"
    }

    // Validate whatsappNumber (required, valid format)
    if (!formData.whatsappNumber.trim()) {
      errors.whatsappNumber = "WhatsApp number is required"
    } else if (!/^[+]?[0-9]{8,15}$/.test(formData.whatsappNumber.trim())) {
      errors.whatsappNumber = "Please enter a valid phone number"
    }

    // Validate email (required, valid format)
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address"
    }

    return errors
  }

  // Update handleNext to include validation
  const handleNext = () => {
    if (currentStep < 2) {
      // Validate before proceeding to next step
      const errors = validateForm()

      if (Object.keys(errors).length === 0) {
        setCurrentStep(currentStep + 1)
        setValidationErrors({})
      } else {
        setValidationErrors(errors)
      }
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Update the handleSubmit function to validate before submission
  const handleSubmit = async () => {
    // Validate services selection
    if (formData.services.length === 0) {
      setValidationErrors({ services: "Please select at least one service" })
      return
    }

    setIsSubmitting(true)
    setValidationErrors({})

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmissionResult({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      })

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: "",
          whatsappNumber: "",
          email: "",
          services: [],
          message: "",
        })
        setCurrentStep(1)
        setSubmissionResult({})
        setValidationErrors({})
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmissionResult({
        success: false,
        message: "There was an error submitting your form. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update the handleInputChange function to include validation
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Apply validations based on field name
    if (name === "fullName") {
      // Limit name to 50 characters
      if (value.length <= 50) {
        updateFormData({ [name]: value })
      }
    } else if (name === "whatsappNumber") {
      // Only allow numbers and + symbol for international format
      const phoneRegex = /^[0-9+]*$/
      if (value === "" || phoneRegex.test(value)) {
        // Limit phone number to 15 characters (international standard)
        if (value.length <= 15) {
          updateFormData({ [name]: value })
        }
      }
    } else if (name === "email") {
      // Limit email to 100 characters
      if (value.length <= 100) {
        updateFormData({ [name]: value })
      }
    } else if (name === "message") {
      // Limit message to 500 characters
      if (value.length <= 500) {
        updateFormData({ [name]: value })
      }
    } else {
      updateFormData({ [name]: value })
    }
  }

  // Handler for service selection
  const handleServiceChange = (service: string) => {
    setFormData((prev) => {
      if (prev.services.includes(service)) {
        return {
          ...prev,
          services: prev.services.filter((s) => s !== service),
        }
      } else {
        return {
          ...prev,
          services: [...prev.services, service],
        }
      }
    })
  }

  // Render Personal Info Step
  const renderPersonalInfoStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FormInput
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
          error={validationErrors.fullName}
        />

        <FormInput
          type="tel"
          name="whatsappNumber"
          value={formData.whatsappNumber}
          onChange={handleInputChange}
          placeholder="WhatsApp Number"
          error={validationErrors.whatsappNumber}
        />

        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          error={validationErrors.email}
        />

        <div className="mt-6">
          <FormButton onClick={handleNext}>Next</FormButton>
        </div>
      </motion.div>
    )
  }

  // Update the renderProjectDetailsStep function to include character counter for message
  const renderProjectDetailsStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white"
      >
        <h2 className="text-xl font-bold mb-6 text-white">What Service Can We Provide For You?</h2>

        <div className="space-y-3 mb-6">
          {services.map((service) => (
            <div key={service} className="flex items-center">
              <div className="relative w-5 h-5 mr-3">
                <input
                  type="checkbox"
                  id={service}
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceChange(service)}
                  className="absolute opacity-0 w-5 h-5 cursor-pointer z-10"
                  disabled={isSubmitting}
                />
                <div
                  className={`w-5 h-5 border ${
                    formData.services.includes(service) ? "border-[#FFD700]" : "border-[#333]"
                  } rounded transition-colors`}
                ></div>
                {formData.services.includes(service) && (
                  <svg
                    className="absolute top-0.5 left-0.5 w-4 h-4 text-[#FFD700]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <label htmlFor={service} className="text-gray-300 cursor-pointer">
                {service}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Optional</p>
            <p className="text-gray-400 text-xs">{formData.message?.length || 0}/500 characters</p>
          </div>
          <div className="gradient-border-container rounded-lg">
            <textarea
              name="message"
              value={formData.message || ""}
              onChange={handleInputChange}
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 bg-[#0a0a0a] rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <FormButton variant="secondary" onClick={handleBack} className="flex-1" disabled={isSubmitting}>
            Back
          </FormButton>
          <FormButton onClick={handleSubmit} className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </FormButton>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="w-full bg-[#0a0a0a] rounded-lg p-8">
      <motion.h1
        className={`${rubik.className} text-4xl font-bold text-center text-gray-400 mb-8`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        REACH OUT TO ME
      </motion.h1>

      <StepIndicator currentStep={currentStep} totalSteps={2} />

      <div className="mt-8">
        {/* Show submission result message if available */}
        {submissionResult.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg text-center ${
              submissionResult.success ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
            }`}
          >
            {submissionResult.message}
          </motion.div>
        )}

        {currentStep === 1 && renderPersonalInfoStep()}
        {currentStep === 2 && renderProjectDetailsStep()}
      </div>

      <div className="mt-8 pt-4 border-t border-[#222]">
        <WhatsAppRedirect />
      </div>
    </div>
  )
}

export default ContactForm
