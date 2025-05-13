"use client"

import type React from "react"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/shared/LoadingScreen"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {/* The main content is always rendered */}
      <div className="w-full">{children}</div>

      {/* Loading screen overlay */}
      {isMounted && isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
    </>
  )
}
