"use client"

import type React from "react"
import { useState, type ChangeEvent } from "react"
import FormButton from "../FormButton"
import type { FormData } from "../ContactForm"
import { motion } from "framer-motion"

interface ProjectDetailsStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onBack: () => void
  onSubmit: () => void
}

const services = [
  "Landing Page",
  "Portfolio Website",
  "E-Commerce Website",
  "Redefining Your Company's Presence",
  "SEO Strategies To Drive Growth",
]

const ProjectDetailsStep = ({ formData, updateFormData, onBack, onSubmit }: ProjectDetailsStepProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(formData.services || [])

  const handleServiceChange = (service: string) => {
    const updatedServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service]

    setSelectedServices(updatedServices)
    updateFormData({ services: updatedServices })
  }

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ message: e.target.value })
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
                checked={selectedServices.includes(service)}
                onChange={() => handleServiceChange(service)}
                className="absolute opacity-0 w-5 h-5 cursor-pointer z-10"
              />
              <div
                className={`w-5 h-5 border ${selectedServices.includes(service) ? "border-[#FFD700]" : "border-[#333]"} rounded transition-colors`}
              ></div>
              {selectedServices.includes(service) && (
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
        <p className="text-gray-400 mb-2">Optional</p>
        <div className="gradient-border-container rounded-lg">
          <textarea
            name="message"
            value={formData.message || ""}
            onChange={handleMessageChange}
            placeholder="Message"
            rows={4}
            className="w-full px-4 py-3 bg-[#0a0a0a] rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <FormButton variant="secondary" onClick={onBack} className="flex-1">
          Back
        </FormButton>
        <FormButton type="submit" className="flex-1">
          Submit
        </FormButton>
      </div>
    </motion.form>
  )
}

export default ProjectDetailsStep
