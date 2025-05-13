"use client"

import Background from "@/components/shared/Background"
import Navbar from "@/components/shared/Navbar"
import HeroSection from "@/components/landing-page/HeroSection"
import AboutSection from "@/components/landing-page/AboutSection"
import WeaponsSection from "@/components/landing-page/WeaponsSection"
import BrandsSection from "@/components/landing-page/BrandsSection"
import WorkSection from "@/components/landing-page/WorkSection"
import ShatterSection from "@/components/landing-page/ShatterSection"
import DiscoverWork from "@/components/landing-page/DiscoverWork"
import TestimonialsSection from "@/components/landing-page/TestimonialsSection"
import ContactSection from "@/components/landing-page/ContactSection"
import InfiniteSlider from "@/components/landing-page/InfiniteSlider"
import Footer from "@/components/shared/Footer"

export default function LandingPage() {
  return (
    <Background>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WeaponsSection />
      <BrandsSection />
      <WorkSection />
      <ShatterSection />
      <DiscoverWork />
      <TestimonialsSection />
      <InfiniteSlider />
      <ContactSection />
      <Footer />
    </Background>
  )
}
