"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="https://wa.me/05444035239"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 active:scale-95 transition-all duration-300 group relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "backInOut",
          }}
        >
          <MessageCircle className="w-8 h-8" />
        </motion.div>
        <span className="absolute right-full mr-4 bg-white text-slate-800 text-sm font-bold py-2 px-4 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          WhatsApp'tan Ulaşın
        </span>
      </Link>
    </motion.div>
  );
}