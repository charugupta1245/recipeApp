"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function UserMenu({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="relative">
      <motion.img
        src="https://selfie.motorhome.co.il/Selfie/Images/plans/Paid.png"
        alt="User Avatar"
        className="w-10 h-10 rounded-full  cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        whileHover={{ scale: 1.1 }}
      />

      {menuOpen && (
        <motion.div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl p-4 w-48">
          <p className="text-gray-800 font-medium">{user.username}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-2 px-4 py-2 w-full text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </motion.div>
      )}
    </div>
  );
}
