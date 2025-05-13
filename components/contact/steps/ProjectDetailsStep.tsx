"use client"

import React from "react"
import type { ChangeEvent } from "react"
import FormInput from "@/components/contact/FormInput"
import FormButton from "@/components/contact/FormButton"
import type { ContactFormData } from "@/components/contact/ContactForm"
import { motion } from "framer-motion"

interface ProjectDetailsStepProps {
  formData: ContactFormData
  updateFormData: (data: Partial<ContactFormData>) => void
  onPrev: () => void
  onSubmit: () => void
}

const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({ formData, updateFormData, onPrev, onSubmit }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
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
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
        placeholder="Project Type"
      />

      <FormInput
        type="text"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Budget (optional)"
        required={false}
      />

      <FormInput
        isTextarea
        type="text"
        name="projectDetails"
        value={formData.projectDetails}
        onChange={handleChange}
        placeholder="Project Details"
        rows={5}
      />

      <div className="flex justify-between mt-6">
        <FormButton type="button" onClick={onPrev} variant="secondary">
          Back
        </FormButton>
        <FormButton type="submit">Submit</FormButton>
      </div>
    </motion.form>
  )
}

export default ProjectDetailsStep
