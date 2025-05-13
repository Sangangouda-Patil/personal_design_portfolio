"use client"

import type React from "react"

import type { ChangeEvent } from "react"
import FormInput from "../FormInput"  
import FormButton from "../FormButton"
import type { FormData } from "../ContactForm"
import { motion } from "framer-motion"

interface PersonalInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

const PersonalInfoStep = ({ formData, updateFormData, onNext }: PersonalInfoStepProps) => {
  // Update the type to accept both HTMLInputElement and HTMLTextAreaElement
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FormInput
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
      />

      <FormInput
        type="tel"
        name="whatsappNumber"
        value={formData.whatsappNumber}
        onChange={handleChange}
        placeholder="WhatsApp Number"
      />

      <FormInput type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />

      <div className="mt-6">
        <FormButton type="submit">Next</FormButton>
      </div>
    </motion.form>
  )
}

export default PersonalInfoStep
