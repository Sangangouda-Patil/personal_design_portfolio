"use client"

import { motion } from "framer-motion"

// Custom WhatsApp icon component - same as used elsewhere
const WhatsAppIcon = ({ size = 20, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3764 4.62392C17.2619 2.50291 14.4454 1.32775 11.4602 1.32471C5.31709 1.32471 0.324547 6.31644 0.321503 12.4618C0.320481 14.3825 0.776358 16.2577 1.64818 17.9359L0.25 23.75L6.20332 22.3881C7.82083 23.1768 9.62219 23.5946 11.4548 23.5953H11.4602C17.6026 23.5953 22.5951 18.6032 22.5989 12.4575C22.6019 9.47909 21.4909 6.74493 19.3764 4.62392ZM11.4602 21.6909H11.4558C9.81037 21.6902 8.19645 21.2904 6.77547 20.5362L6.44681 20.3489L3.02957 21.1606L3.85688 17.8281L3.64943 17.4863C2.81888 16.0145 2.37633 14.3296 2.37731 12.4625C2.37974 7.36911 6.36759 3.22968 11.4646 3.22968C13.9407 3.23211 16.2739 4.21189 18.0095 5.95236C19.7451 7.69283 20.7204 10.0289 20.7182 12.5568C20.7155 17.6505 16.5534 21.6909 11.4602 21.6909ZM16.6809 14.8319C16.4089 14.6959 15.0328 14.0202 14.7811 13.9262C14.5294 13.8322 14.3454 13.7852 14.1615 14.0575C13.9775 14.3297 13.4428 14.9582 13.2792 15.1422C13.1156 15.3262 12.952 15.3497 12.6797 15.2137C12.4075 15.0777 11.5123 14.7747 10.4598 13.8322C9.63861 13.0933 9.09358 12.1774 8.92999 11.9051C8.76639 11.6329 8.91257 11.4821 9.05268 11.3431C9.17865 11.2179 9.33164 11.0143 9.47172 10.8507C9.6118 10.6871 9.65879 10.5691 9.75277 10.3851C9.84675 10.2011 9.79976 10.0375 9.72928 9.90152C9.65879 9.76553 9.11498 8.38837 8.88396 7.84395C8.65903 7.31364 8.43044 7.38778 8.25774 7.37939C8.09414 7.37161 7.91017 7.37039 7.72621 7.37039C7.54224 7.37039 7.24345 7.44087 6.99176 7.71312C6.74007 7.98537 6.01729 8.66107 6.01729 10.0382C6.01729 11.4154 7.03472 12.7456 7.1748 12.9296C7.31488 13.1136 9.09114 15.8487 11.8111 16.9966C12.4588 17.2767 12.9644 17.4465 13.3583 17.5744C14.0064 17.7863 14.5984 17.7558 15.0642 17.6834C15.5819 17.6028 16.6809 17.0094 16.9119 16.3709C17.1429 15.7325 17.1429 15.1881 17.0724 15.0715C17.0019 14.9549 16.8179 14.8844 16.5457 14.7484C16.2734 14.6124 16.4089 14.6959 16.6809 14.8319Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Remove any props that aren't being used
const WhatsAppRedirect = () => {
  // Replace with your actual WhatsApp number
  const whatsappNumber = "1234567890"

  const openWhatsAppChat = () => {
    // You can add a pre-filled message if desired
    const message = "Hello! I'd like to discuss a project with you."
    const encodedMessage = encodeURIComponent(message)

    // Open WhatsApp with the number and message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <motion.div
      className="flex items-center justify-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <span className="mr-3 text-gray-400">or</span>
      <motion.button
        onClick={openWhatsAppChat}
        className="flex items-center text-white bg-transparent hover:text-[#FFD700] transition-colors relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <WhatsAppIcon size={20} className="mr-2" />
        <span className="font-medium">Say hello!</span>
        {/* Straight scribble line under "Say hello!" */}
        <svg
          className="absolute -bottom-1 left-0 w-full"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M1 2C5 1 10 3 15 2C20 1 25 1 30 2C35 3 40 3 45 2C50 1 55 1 60 2C65 3 70 3 75 2C80 1 85 1 90 2C95 3 99 2 99 2"
            stroke="#FFD700"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.button>
    </motion.div>
  )
}

export default WhatsAppRedirect
