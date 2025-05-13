"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import StepIndicator from "./StepIndicator"
import PersonalInfoStep from "./steps/PersonalInfoStep"
import ProjectDetailsStep from "./steps/ProjectDetailsStep"
import { Rubik } from "next/font/google"
import WhatsAppRedirect from "./WhatsAppRedirect"
import { handleContactFormSubmission } from "@/app/actions/contact-form"

// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})

export type ContactFormData = {
  fullName: string
  whatsappNumber: string
  email: string
  services: string[]
  message?: string
}

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ContactFormData>({
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

  const totalSteps = 2

  const updateFormData = (data: Partial<ContactFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Submit form data to server action
      const result = await handleContactFormSubmission(formData)

      setSubmissionResult(result)

      if (result.success) {
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
        }, 3000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmissionResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
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

      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

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

        {currentStep === 1 && (
          <PersonalInfoStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />
        )}

        {currentStep === 2 && (
          <ProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-[#222]">
        <WhatsAppRedirect />
      </div>
    </div>
  )
}

export default ContactForm
