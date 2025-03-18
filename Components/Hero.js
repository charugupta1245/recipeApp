"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full h-[900px] flex flex-col md:flex-row justify-center items-center bg-[#f9f6f2] px-6 overflow-hidden">
      {/* Left Image - Hidden on Mobile, Enhanced Animation */}
      <motion.img
        src="https://plus.unsplash.com/premium_photo-1664472619078-9db415ebef44?w=600&auto=format&fit=crop&q=60"
        alt="Pasta Dish"
        className="absolute left-4 md:left-16 top-16 w-40 md:w-60 rounded-full shadow-lg hidden md:block"
        initial={{ opacity: 0, y: -50, rotate: -10 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Right Image - Hidden on Mobile, Enhanced Animation */}
      <motion.img
        src="https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=1984&auto=format&fit=crop"
        alt="Salad Bowl"
        className="absolute right-4 md:right-16 bottom-16 w-40 md:w-60 rounded-full shadow-lg hidden md:block"
        initial={{ opacity: 0, y: 50, rotate: 10 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />

      {/* Center Image - Hidden on Mobile, Enhanced Animation */}
      <motion.img
        src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=60"
        alt="Bowl of Soup"
        className="absolute bottom-4 md:bottom-10 w-44 md:w-72 rounded-full shadow-lg hidden md:block"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      />

      {/* Text Content */}
      <motion.div
        className="text-center max-w-2xl px-4 md:px-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#5A382D] leading-tight mb-6">
          All-in-One <br /> Recipe Manager & Planner
        </h1>
        <p className="text-[#5A382D] text-lg">
          The ultimate recipe organizer for quick access to all your recipes
          across devices.
        </p>

        {/* Buttons with Motion Effects */}
        <motion.div
          className="flex flex-col md:flex-row justify-center mt-6 space-y-3 md:space-y-0 md:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            }}
            className="bg-[#5A382D] text-white px-5 py-3 rounded-lg hover:bg-[#3F271F] transition"
          >
            Download on App Store
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            }}
            className="bg-[#E67E22] text-white px-5 py-3 rounded-lg hover:bg-[#D96C18] transition"
          >
            Get it on Google Play
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
