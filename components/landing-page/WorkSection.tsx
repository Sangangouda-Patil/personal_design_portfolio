"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Rubik } from "next/font/google"
import { Heart, Bookmark, ArrowRight } from "lucide-react"
import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import ShinyText from "../shared/ShinyText"

// Load Rubik font with bold weight
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
})

const initialProjects = [
  {
    id: 1,
    image: "/worksection/img1.webp",
  },
  {
    id: 2,
    image: "/worksection/img2.webp",
  },
  {
    id: 3,
    image: "/worksection/img3.webp",
  },
  {
    id: 4,
    image: "/worksection/img4.webp",
  },
  {
    id: 5,
    image: "/worksection/img5.webp",
  },
  {
    id: 6,
    image: "/worksection/img6.webp",
  },
  {
    id: 7,
    image: "/worksection/img21.webp",
  },
  {
    id: 8,
    image: "/worksection/img22.webp",
  },
  {
    id: 9,
    image: "/worksection/img9.webp",
  },
  {
    id: 10,
    image: "/worksection/img10.webp",
  },
  {
    id: 11,
    image: "/worksection/img11.webp",
  },
  {
    id: 12,
    image: "/worksection/img12.webp",
  },
  {
    id: 13,
    image: "/worksection/img13.webp",
  },
  {
    id: 14,
    image: "/worksection/img14.webp",
  },
  {
    id: 15,
    image: "/worksection/img15.webp",
  },
  {
    id: 16,
    image: "/worksection/img16.webp",
  },
  {
    id: 17,
    image: "/worksection/img17.webp",
  },
  {
    id: 18,
    image: "/worksection/img18.webp",
  },
  {
    id: 19,
    image: "/worksection/img19.webp",
  },
  {
    id: 20,
    image: "/worksection/img20.webp",
  },
  {
    id: 21,
    image: "/worksection/img7.webp",
  },
  {
    id: 22,
    image: "/worksection/img9.webp",
  },
];

const WorkSection: React.FC = () => {
  // State to track liked projects
  const [likedProjects, setLikedProjects] = useState<number[]>([])
  // State for items per view
  const [itemsPerView, setItemsPerView] = useState(3)
  // Ref for slider container
  const sliderRef = useRef<HTMLDivElement>(null)
  // Ref for the inner slider
  const innerSliderRef = useRef<HTMLDivElement>(null)
  // State for slider width
  const [sliderWidth, setSliderWidth] = useState(0)
  // State for tracking if we're dragging
  const [isDragging, setIsDragging] = useState(false)
  // State for tracking the current drag position
  const [dragPosition, setDragPosition] = useState(0)
  // Ref for tracking the last touch/mouse position
  const lastPositionRef = useRef(0)
  // Ref for animation frame
  const animationRef = useRef<number | null>(null)
  // Initial margin before the first card (in pixels)
  const initialMargin = 24 // This will be added to the left of the first card

  // Create a circular array of projects for infinite scrolling
  const circularProjects = [...initialProjects, ...initialProjects, ...initialProjects]

  // Function to toggle like status
  const toggleLike = (projectId: number) => {
    setLikedProjects((prev) => {
      if (prev.includes(projectId)) {
        return prev.filter((id) => id !== projectId)
      } else {
        return [...prev, projectId]
      }
    })
  }

  // Calculate items per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 640) {
        setItemsPerView(1.5) // Show 1.5 cards on mobile for peek effect
      } else if (width < 1024) {
        setItemsPerView(2.5) // Show 2.5 cards on small tablets for peek effect
      } else if (width < 1280) {
        setItemsPerView(3.5) // Show 3.5 cards on larger tablets for peek effect
      } else if (width < 1536) {
        setItemsPerView(4.5) // Show 4.5 cards on small desktops for peek effect
      } else if (width < 1920) {
        setItemsPerView(5.5) // Show 5.5 cards on larger desktops for peek effect
      } else {
        setItemsPerView(6.5) // Show 6.5 cards on ultra-wide screens for peek effect
      }

      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth)
      }
    }

    // Set initial values
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Recalculate slider width on resize
  useEffect(() => {
    const updateSliderWidth = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth)
      }
    }

    // Initial calculation
    updateSliderWidth()

    // Add resize observer for more accurate width tracking
    if (sliderRef.current) {
      const currentRef = sliderRef.current
      const resizeObserver = new ResizeObserver(updateSliderWidth)
      resizeObserver.observe(currentRef)
      return () => {
        resizeObserver.unobserve(currentRef)
      }
    }
  }, [])

  // Calculate the item width
  const itemWidth = sliderWidth / itemsPerView

  // Calculate the total width of all items
  const totalWidth = circularProjects.length * itemWidth

  // Function to update the slider position with requestAnimationFrame
  const updateSliderPosition = useCallback(
    (position: number) => {
      if (innerSliderRef.current) {
        innerSliderRef.current.style.transform = `translateX(${position + initialMargin}px)`
      }
    },
    [initialMargin],
  )

  // Function to check if we need to loop and adjust position
  const checkAndAdjustPosition = useCallback(() => {
    if (!innerSliderRef.current) return

    // The width of one complete set of projects
    const originalWidth = initialProjects.length * itemWidth

    // If we've scrolled past the end
    if (-dragPosition >= 2 * originalWidth) {
      // Jump back to the middle set without animation
      const newPosition = dragPosition + originalWidth
      setDragPosition(newPosition)
      updateSliderPosition(newPosition)
    }
    // If we've scrolled before the beginning
    else if (-dragPosition < originalWidth) {
      // Jump forward to the middle set without animation
      const newPosition = dragPosition - originalWidth
      setDragPosition(newPosition)
      updateSliderPosition(newPosition)
    }
  }, [dragPosition, itemWidth, updateSliderPosition])

  // Add a state to track if auto-scrolling is enabled
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)

  // Function to handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    // Temporarily disable auto-scrolling when user interacts
    setAutoScrollEnabled(false)

    // Cancel any ongoing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Remove any transition
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transition = "none"
    }

    setIsDragging(true)
    lastPositionRef.current = e.clientX
    e.preventDefault()
  }

  // Function to handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const delta = e.clientX - lastPositionRef.current
    lastPositionRef.current = e.clientX

    // Use requestAnimationFrame for smoother animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
    }

    animationRef.current = requestAnimationFrame(() => {
      const newPosition = dragPosition + delta
      setDragPosition(newPosition)
      updateSliderPosition(newPosition)
    })

    e.preventDefault()
  }

  // Function to handle mouse up
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return

    setIsDragging(false)

    // Re-enable auto-scrolling after user interaction
    setTimeout(() => {
      setAutoScrollEnabled(true)
    }, 5000) // Wait a bit longer than the auto-scroll interval (4s + 1s buffer)

    // Cancel any ongoing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Add transition for smooth stop
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)"

      // After transition completes, remove it and check if we need to loop
      setTimeout(() => {
        if (!innerSliderRef.current) return
        innerSliderRef.current.style.transition = "none"
        checkAndAdjustPosition()
      }, 300)
    }

    e.preventDefault()
  }

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)

      // Re-enable auto-scrolling after user interaction
      setTimeout(() => {
        setAutoScrollEnabled(true)
      }, 5000)

      // Cancel any ongoing animation
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      // Add transition for smooth stop
      if (innerSliderRef.current) {
        innerSliderRef.current.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)"

        // After transition completes, remove it and check if we need to loop
        setTimeout(() => {
          if (!innerSliderRef.current) return
          innerSliderRef.current.style.transition = "none"
          checkAndAdjustPosition()
        }, 300)
      }
    }
  }

  // Function to handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return

    // Temporarily disable auto-scrolling when user interacts
    setAutoScrollEnabled(false)

    // Cancel any ongoing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Remove any transition
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transition = "none"
    }

    const touch = e.touches[0]
    setIsDragging(true)
    lastPositionRef.current = touch.clientX
  }

  // Function to handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return

    const touch = e.touches[0]
    const delta = touch.clientX - lastPositionRef.current
    lastPositionRef.current = touch.clientX

    // Use requestAnimationFrame for smoother animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
    }

    animationRef.current = requestAnimationFrame(() => {
      const newPosition = dragPosition + delta
      setDragPosition(newPosition)
      updateSliderPosition(newPosition)
    })
  }

  // Function to handle touch end
  const handleTouchEnd = () => {
    if (!isDragging) return

    setIsDragging(false)

    // Re-enable auto-scrolling after user interaction
    setTimeout(() => {
      setAutoScrollEnabled(true)
    }, 5000) // Wait a bit longer than the auto-scroll interval (4s + 1s buffer)

    // Cancel any ongoing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Add transition for smooth stop
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)"

      // After transition completes, remove it and check if we need to loop
      setTimeout(() => {
        if (!innerSliderRef.current) return
        innerSliderRef.current.style.transition = "none"
        checkAndAdjustPosition()
      }, 300)
    }
  }

  // Add a useEffect for automatic scrolling
  useEffect(() => {
    if (!autoScrollEnabled) return

    // Set up interval to automatically scroll every 4 seconds
    const autoScrollInterval = setInterval(() => {
      // Only auto-scroll if not currently dragging
      if (!isDragging) {
        // Cancel any ongoing animation
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }

        // Add transition for smooth animation
        if (innerSliderRef.current) {
          innerSliderRef.current.style.transition = "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)"

          // Move by one full card width to ensure one card completely exits the screen
          const newPosition = dragPosition - itemWidth
          setDragPosition(newPosition)
          updateSliderPosition(newPosition)

          // After transition completes, remove it and check if we need to loop
          setTimeout(() => {
            if (!innerSliderRef.current) return
            innerSliderRef.current.style.transition = "none"
            checkAndAdjustPosition()
          }, 800)
        }
      }
    }, 3000) // 3 seconds interval

    return () => {
      clearInterval(autoScrollInterval)
    }
  }, [isDragging, dragPosition, itemWidth, autoScrollEnabled, updateSliderPosition, checkAndAdjustPosition])

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Update the initialization effect to set the initial position correctly
  useEffect(() => {
    if (innerSliderRef.current && itemWidth > 0) {
      // Start at the middle section of the circular array
      const initialPosition = -initialProjects.length * itemWidth
      setDragPosition(initialPosition)
      updateSliderPosition(initialPosition)

      // Add initial transition for when the component first loads
      innerSliderRef.current.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)"

      // Remove transition after initial load
      setTimeout(() => {
        if (innerSliderRef.current) {
          innerSliderRef.current.style.transition = "none"
        }
      }, 300)
    }
  }, [itemWidth, updateSliderPosition])

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Example breakpoint for mobile
    };

    updateScreenSize(); // Set initial value
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <section id="work" className="py-12 sm:py-16 md:py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="section-container">
       {/* Centered Section Header with ShinyText effect */}
       <div className="flex flex-col items-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-9xl text-center">
            <span className={`font-rubik-bold text-white`}>
              <ShinyText text="Graphic" speed={3} className={`font-rubik-bold`} />
            </span>
            <span className="text-[#FFD700] font-bold font-times italic"> Work</span>
          </h2>
        </div>
      </div>

      {/* Projects Slider with infinite scrolling - full width with slight margins */}
      <div
        className="relative mb-12 overflow-hidden w-full mt-10 sm:mt-20 md:mt-30"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={innerSliderRef}
          className={`flex ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{
            width: `${totalWidth}px`,
            willChange: "transform",
            transform: `translateX(${initialMargin}px)`,
          }}
        >
          {circularProjects.map((project, index) => (
            <div key={`${project.id}-${index}`} className="px-2 sm:px-3" style={{ width: `${itemWidth}px` }}>
              {/* Gradient border container */}
              <div className="gradient-border-container rounded-xl p-[2px]">
                <motion.div className="bg-[#111111] rounded-xl overflow-hidden h-full">
                  {/* Project Image - Instagram aspect ratio (4:5) */}
                  <div className="w-full relative" style={{ paddingBottom: "125%" }}>
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={`Project ${project.id}`}
                      fill
                      className="object-contain bg-[#111111]"
                      sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`}
                    />
                  </div>

                  {/* Bottom section with icons and minimal text */}
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      {/* Like Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(project.id)
                        }}
                        className="transition-transform active:scale-110"
                        aria-label={likedProjects.includes(project.id) ? "Unlike" : "Like"}
                      >
                        <Heart
                          size={24}
                          className={`
                            transition-all duration-300 
                            ${
                              likedProjects.includes(project.id)
                                ? "text-[#FFD700] fill-[#FFD700]"
                                : "text-gray-400 hover:text-gray-200"
                            }
                          `}
                        />
                      </button>

                      {/* Save Button */}
                      <button
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Bookmark size={24} />
                      </button>
                    </div>

                    {/* Minimal project title */}
                    {/* <p className="text-white text-sm mt-2">{project.title}</p> */}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View More Button */}
      <div className="section-container">
        <div className="flex justify-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Gradient border container */}
            <div className="gradient-border-container rounded-full">
              <motion.button
                className="bg-[#1a1a1a] text-white rounded-full py-3 xs:py-4 sm:py-5 px-6 xs:px-8 sm:px-10 flex items-center gap-3 xs:gap-4 hover:bg-[#2a2a2a] transition-colors text-sm xs:text-base sm:text-lg md:text-xl"
                onClick={() => {
                  const contactSection = document.getElementById("hero")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-switzer-extrabold uppercase pl-1 xs:pl-2">SEE &apos;EM ALL</span>
                <div className="bg-[#FFD700] rounded-full p-1.5 xs:p-2 flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={isMobile ? 16 : 20} className="text-black" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WorkSection
