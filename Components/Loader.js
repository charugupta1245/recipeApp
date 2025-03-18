"use client";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50"
    >
      <div className="w-16 h-16 border-4 border-t-4 border-red-500 rounded-full animate-spin"></div>
    </motion.div>
  );
}
