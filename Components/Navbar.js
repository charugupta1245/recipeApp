"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [user, setUser] = useState(undefined); // Initially undefined to prevent SSR mismatch
  const pathname = usePathname();

  // Ensure animations don't cause hydration mismatch
  const shouldReduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  // Fetch user from localStorage only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  return (
    <nav className="bg-[#8C2F39] shadow-md p-4 sm:p-6 rounded-2xl flex items-center justify-between relative z-50">
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex items-center gap-6">
        <Link href="/">
          <motion.h1
            className="text-xl sm:text-3xl font-semibold tracking-tight text-white font-cursive"
            whileHover={!shouldReduceMotion ? { scale: 1.1 } : {}}
          >
            🍽️ 247 Crossing Cafe
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-6">
          <Link href="/random">
            <motion.p className="hover:text-orange-500 text-lg font-medium text-white">
              Random
            </motion.p>
          </Link>
          <Link href="/blogs">
            <motion.p className="hover:text-orange-500 text-lg font-medium text-white">
              Blogs
            </motion.p>
          </Link>
          <Link href="/search">
            <motion.button className="hover:text-orange-500 text-lg font-medium text-white">
              Search
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Right Section: User Auth / Toggle Menu */}
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {user === undefined ? (
          <p className="text-white">Loading...</p>
        ) : user ? (
          <div className="relative z-50">
            <UserMenu user={user} setUser={setUser} />
          </div>
        ) : (
          <div className="hidden sm:flex gap-3">
            <Link href="/auth/login">
              <motion.button className="px-4 py-2 rounded-lg bg-[#D15A5A] hover:bg-[#B43F3F] text-white">
                Log In
              </motion.button>
            </Link>

            <Link href="/auth/register">
              <motion.button className="px-4 py-2 rounded-lg bg-[#D15A5A] hover:bg-[#B43F3F] text-white">
                Sign Up
              </motion.button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 w-full bg-[#8C2F39] text-white p-4 flex flex-col gap-4 z-50 rounded-b-2xl"
          >
            <Link href="/random">
              <motion.p className="text-lg font-medium hover:text-orange-500">
                Random
              </motion.p>
            </Link>
            <Link href="/search">
              <motion.button className="text-lg font-medium hover:text-orange-500">
                Search
              </motion.button>
            </Link>
            <Link href="/blogs">
              <motion.p className="text-lg font-medium hover:text-orange-500">
                Blogs
              </motion.p>
            </Link>

            {!user && (
              <div className="flex flex-col gap-3">
                <Link href="/auth/login">
                  <motion.button className="px-4 py-2 rounded-lg bg-[#D15A5A] hover:bg-[#B43F3F] text-white w-full">
                    Log In
                  </motion.button>
                </Link>

                <Link href="/auth/register">
                  <motion.button className="px-4 py-2 rounded-lg bg-[#D15A5A] hover:bg-[#B43F3F] text-white w-full">
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
