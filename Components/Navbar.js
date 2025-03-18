"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const categories = [
    { name: "🍳 Breakfast", link: "/categories/breakfast" },
    { name: "🥪 Lunch", link: "/categories/lunch" },
    { name: "🍛 Dinner", link: "/categories/dinner" },
    { name: "🍰 Desserts", link: "/categories/desserts" },
    { name: "🍹 Drinks", link: "/categories/drinks" },
    { name: "🥗 Salads", link: "/categories/salads" },
    { name: "🍕 Fast Food", link: "/categories/fastfood" },
    { name: "🌱 Vegan", link: "/categories/vegan" },
    { name: "🍲 Soups", link: "/categories/soups" },
    { name: "🍝 Pasta", link: "/categories/pasta" },
  ];

  return (
    <nav className="bg-[#8C2F39] shadow-md p-4 sm:p-6 rounded-2xl flex items-center justify-between relative z-50">
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex items-center gap-6">
        <Link href="/">
          <motion.h1
            className="text-xl sm:text-3xl font-semibold tracking-tight text-white font-cursive"
            whileHover={{ scale: 1.1 }}
          >
            🍽️ 247 Crossing Cafe
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-6">
          <div className="relative">
            <button
              className="text-lg font-medium text-white"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              Categories ▼
            </button>
            {categoriesOpen && (
              <motion.div className="absolute bg-white shadow-lg rounded-xl p-4 mt-2 w-60 z-50">
                {categories.map((category, index) => (
                  <Link key={index} href={category.link}>
                    <motion.p className="px-4 py-2 hover:bg-[#B43F3F] hover:text-white rounded-lg">
                      {category.name}
                    </motion.p>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
          <Link href="/random">
            <motion.p className="text-lg font-medium text-white">
              Random
            </motion.p>
          </Link>
          <Link href="/blogs">
            <motion.p className="text-lg font-medium text-white">
              Blogs
            </motion.p>
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

        {user ? (
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
            <div className="relative">
              <button
                className="text-lg font-medium"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                Categories ▼
              </button>
              {categoriesOpen && (
                <motion.div className="bg-white shadow-lg rounded-xl p-4 mt-2 w-full z-50">
                  {categories.map((category, index) => (
                    <Link key={index} href={category.link}>
                      <motion.p className="px-4 py-2 hover:bg-[#B43F3F] hover:text-white rounded-lg">
                        {category.name}
                      </motion.p>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
            <Link href="/random">
              <motion.p className="text-lg font-medium">Random</motion.p>
            </Link>
            <Link href="/blogs">
              <motion.p className="text-lg font-medium">Blogs</motion.p>
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
