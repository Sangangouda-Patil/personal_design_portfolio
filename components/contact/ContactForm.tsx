"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import PersonalInfoStep from "@/components/contact/steps/PersonalInfoStep"
import ProjectDetailsStep from "@/components/contact/steps/ProjectDetailsStep"
import StepIndicator from "./StepIndicator"
import WhatsAppRedirect from "@/components/contact/WhatsAppRedirect"
import { submitContactForm } from "@/app/actions/contact-form"

export interface ContactFormData {
  fullName: string
  whatsappNumber: string
  email: string
  projectType: string
  budget: string
  projectDetails: string
}

const initialFormData: ContactFormData = {
  fullName: "",
  whatsappNumber: "",
  email: "",
  projectType: "",
  budget: "",
  projectDetails: "",
}

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const updateFormData = (data: Partial<ContactFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    setCurrentStep(2)
  }

  const handlePrev = () => {
    setCurrentStep(1)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await submitContactForm(formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!isSubmitted ? (
        <>
          <StepIndicator currentStep={currentStep} totalSteps={2} />
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <PersonalInfoStep key="step1" formData={formData} updateFormData={updateFormData} onNext={handleNext} />
              )}
              {currentStep === 2 && (
                <ProjectDetailsStep
                  key="step2"
                  formData={formData}
                  updateFormData={updateFormData}
                  onPrev={handlePrev}
                  onSubmit={handleSubmit}
                />
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <WhatsAppRedirect formData={formData} />
      )}
    </div>
  )
}

export default ContactForm
