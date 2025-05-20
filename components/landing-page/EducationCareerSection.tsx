"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, Briefcase, Calendar, Building } from "lucide-react"
import ShinyText from "../shared/ShinyText"

// Education data
const educationData = [
  {
    id: 1,
    title: "Bachelor in Computer Science",
    institution: "KLS Gogte Institute of Technology, Belagavi",
    period: "Dec 2021 - May 2024",
  },
  {
    id: 2,
    title: "Diploma in Computer Science",
    institution: "MLBP College, Belagavi",
    period: "2017-2021",
  },
  {
    id: 3,
    title: "Primary Education",
    institution: "BEMS School, Belagavi",
    period: "2007-2017",
  },
]

// Career data
const careerData = [
  {
    id: 1,
    title: "Design Executive",
    company: "Alphanumero",
    period: "DEC 2024 - Present",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creatorships",
    period: "MAY 2024 - DEC 2024",
  },
  {
    id: 3,
    title: "Web Development Intern",
    company: "Infynow Software Solutions",
    period: "MAY 2023 - JUL 2023",
  },
]

const EducationCareerSection = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState<"education" | "career">("education")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.1,
      },
    }),
  }

  const tabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 15 } },
  }

  const renderCards = (data: typeof educationData | typeof careerData) => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:gap-6"
      >
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            variants={cardVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            className="relative"
          >
            {/* Card with subtle border */}
            <div className="relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-r from-[#333] via-[#444] to-[#333] group">
              {/* Card content */}
              <div className="bg-[#111] rounded-xl p-4 sm:p-6 relative overflow-hidden">
                {/* Card header */}
                <div className="flex items-start">
                  {/* Icon */}
                  <div className="mr-3 sm:mr-5">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#222] flex items-center justify-center shadow-lg"
                    >
                      {activeTab === "education" ? (
                        <GraduationCap size={20} className="text-white sm:hidden" />
                      ) : (
                        <Briefcase size={20} className="text-white sm:hidden" />
                      )}
                      {activeTab === "education" ? (
                        <GraduationCap size={28} className="text-white hidden sm:block" />
                      ) : (
                        <Briefcase size={28} className="text-white hidden sm:block" />
                      )}
                    </motion.div>
                  </div>

                  {/* Title and details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300 pr-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center mt-1 sm:mt-2 text-gray-300">
                      <Building size={14} className="text-gray-400 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {activeTab === "education"
                          ? "institution" in item
                            ? item.institution
                            : ""
                          : "company" in item
                            ? item.company
                            : ""}
                      </span>
                    </div>

                    <div className="flex items-center mt-1 sm:mt-2 text-gray-400 text-xs sm:text-sm">
                      <Calendar size={12} className="text-gray-500 mr-2 sm:hidden" />
                      <Calendar size={14} className="text-gray-500 mr-2 hidden sm:block" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  // Make sure the section has the correct ID
  return (
    <section id="education-career" className="py-12 sm:py-16 md:py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[90%] sm:max-w-[85%] md:max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header - Responsive heading */}
        {/* Centered Section Header with ShinyText effect */}
        <div className="flex flex-col items-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-9xl text-center">
            <span className={`font-rubik-bold text-white`}>
              <ShinyText text="Education" speed={3} className={`font-rubik-bold`} />
            </span>
            <span className="text-[#FFD700] font-bold font-times italic"> & </span>
            <span className={`font-rubik-bold text-white`}>
              <ShinyText text="Career" speed={3} className={`font-rubik-bold`} />
            </span>
          </h2>
        </div>

        {/* Tab navigation - Responsive tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-[#111111] p-1 rounded-full flex relative">
            {/* Education tab */}
            <motion.button
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === "education" ? "active" : "inactive"}
              onClick={() => setActiveTab("education")}
              className={`relative z-10 py-2 sm:py-3 px-4 sm:px-8 rounded-full flex items-center space-x-1 sm:space-x-2 transition-colors ${
                activeTab === "education" ? "text-white" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <GraduationCap
                size={16}
                className={`${activeTab === "education" ? "text-white" : "text-gray-400"} sm:hidden`}
              />
              <GraduationCap
                size={18}
                className={`${activeTab === "education" ? "text-white" : "text-gray-400"} hidden sm:block`}
              />
              <span className="text-sm sm:text-base">Education</span>
              {activeTab === "education" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#1a1a1a] rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>

            {/* Career tab */}
            <motion.button
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === "career" ? "active" : "inactive"}
              onClick={() => setActiveTab("career")}
              className={`relative z-10 py-2 sm:py-3 px-4 sm:px-8 rounded-full flex items-center space-x-1 sm:space-x-2 transition-colors ${
                activeTab === "career" ? "text-white" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <Briefcase size={16} className={`${activeTab === "career" ? "text-white" : "text-gray-400"} sm:hidden`} />
              <Briefcase
                size={18}
                className={`${activeTab === "career" ? "text-white" : "text-gray-400"} hidden sm:block`}
              />
              <span className="text-sm sm:text-base">Career</span>
              {activeTab === "career" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#1a1a1a] rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "education" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "education" ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "education" ? renderCards(educationData) : renderCards(careerData)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default EducationCareerSection
