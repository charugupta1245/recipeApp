"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Footer = () => {
  return (
    <footer className="bg-[#FFFAF0] text-[#6D3B47] py-12 px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
          },
        }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        {/* About Section */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-4 text-[#E85A4F] font-cursive hover:text-[#D7263D] transition duration-300 cursor-pointer">
            247 Crossing Cafe 🍽️ <span className="text-sm">✨</span>
          </h2>
          <p className="text-[#8E6C88] text-sm">
            Your cozy corner for delightful recipes. Dive into a world of
            flavors and culinary joy!
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-xl font-semibold mb-4 text-[#E85A4F] hover:text-[#D7263D] transition duration-300 cursor-pointer">
            Quick Links 🔗
          </h2>
          <ul className="text-[#8E6C88] text-sm space-y-2">
            {["Home", "Recipes", "About Us", "Contact"].map((link, index) => (
              <li key={index}>
                <Link href={`/${link.toLowerCase().replace(/\s+/g, "")}`}>
                  <span className="hover:text-[#D7263D] cursor-pointer transition duration-300">
                    {link}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-xl font-semibold mb-4 text-[#E85A4F] hover:text-[#D7263D] transition duration-300 cursor-pointer">
            Contact Info 📞
          </h2>
          <ul className="text-[#8E6C88] text-sm space-y-2">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-[#D7263D]" /> 123 Food
              Street, Gourmet City
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2 text-[#E85A4F]" /> +123 456 7890
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-[#8E6C88]" />
              support@247crossingCafe.com
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-xl font-semibold mb-4 text-[#E85A4F] hover:text-[#D7263D] transition duration-300 cursor-pointer">
            Follow Us 📱
          </h2>
          <div className="flex space-x-4">
            {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map(
              (Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, color: "#D7263D" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[#8E6C88] transition duration-300"
                >
                  <Icon size={24} />
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, ease: "easeOut" },
        }}
        className="text-center text-[#8E6C88] text-sm mt-8 border-t border-[#E85A4F] pt-4"
      >
        &copy; {new Date().getFullYear()} 247 Crossing Cafe. All rights
        reserved. <span className="text-xs">Made with ❤️</span>
      </motion.div>
    </footer>
  );
};

export default Footer;
