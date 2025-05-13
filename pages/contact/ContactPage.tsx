"use client"

import Background from "@/components/shared/Background"
import Navbar from "@/components/shared/Navbar"
import ContactForm from "@/components/contact/ContactForm"

export default function ContactPage() {
  return (
    <Background>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 bg-[#0a0a0a]">
        <div className="w-full max-w-md">
          <ContactForm />
        </div>
      </div>
    </Background>
  )
}
