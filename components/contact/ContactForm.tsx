"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import StepIndicator from "./Stepindicator"
import PersonalInfoStep from "./steps/PersonalInfoStep"
import ProjectDetailsStep from "./steps/ProjectDetailsStep"
import { Rubik } from "next/font/google"
import WhatsAppRedirect from "./WhatsAppRedirect"

// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})

export type FormData = {
  fullName: string
  whatsappNumber: string
  email: string
  services: string[]
  message?: string
}

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsappNumber: "",
    email: "",
    services: [],
  })

  const totalSteps = 2

  const updateFormData = (data: Partial<FormData>) => {
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
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)

    // For demo purposes, just show an alert
    alert("Form submitted successfully! We'll get back to you soon.")

    // Reset form after submission
    setFormData({
      fullName: "",
      whatsappNumber: "",
      email: "",
      services: [],
    })
    setCurrentStep(1)
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
        {currentStep === 1 && (
          <PersonalInfoStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />
        )}

        {currentStep === 2 && (
          <ProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            onBack={handleBack}
            onSubmit={handleSubmit}
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
