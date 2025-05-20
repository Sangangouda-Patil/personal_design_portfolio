"use client"

import LandingPage from "@/pages/landing-page/LandingPage"
import ScrollDebugger from "../components/shared/ScrollDebugger"

export default function ClientPage() {
  return (
    <>
      <LandingPage />
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => {
            const debugElement = document.querySelector('[data-debug="true"]')
            if (debugElement) {
              (debugElement as HTMLElement).style.display = "block"
            }
          }}
          className="bg-black/50 text-white text-xs p-1 rounded-md"
          data-debug="button"
        >
          Debug
        </button>
      </div>
      <ScrollDebugger />
    </>
  )
}
