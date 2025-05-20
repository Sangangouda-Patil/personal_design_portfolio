"use client"

import { useEffect, useState } from "react"

export default function ScrollDebugger() {
  const [sections, setSections] = useState<{ id: string; top: number; height: number }[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== "development") return

    const updateSections = () => {
      const allSections = document.querySelectorAll("section[id]")
      const sectionsData = Array.from(allSections).map((section) => {
        const rect = section.getBoundingClientRect()
        return {
          id: section.id,
          top: rect.top + window.scrollY,
          height: rect.height,
        }
      })
      setSections(sectionsData)
    }

    updateSections()
    window.addEventListener("resize", updateSections)
    window.addEventListener("scroll", updateSections)

    return () => {
      window.removeEventListener("resize", updateSections)
      window.removeEventListener("scroll", updateSections)
    }
  }, [])

  if (process.env.NODE_ENV !== "development") return null

  return (
    <div
      className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs max-w-[300px] max-h-[300px] overflow-auto"
      style={{ display: visible ? "block" : "none" }}
    >
      <button className="absolute top-1 right-1 text-xs text-gray-400" onClick={() => setVisible(false)}>
        ✕
      </button>
      <h3 className="font-bold mb-2">Sections Debug:</h3>
      <ul>
        {sections.map((section) => (
          <li key={section.id} className="mb-1">
            <strong>#{section.id}</strong>: {Math.round(section.top)}px - {Math.round(section.top + section.height)}px
          </li>
        ))}
      </ul>
    </div>
  )
}
