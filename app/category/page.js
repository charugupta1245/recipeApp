"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // 🚀 Import Framer Motion
import categories from "./Category";

const CategoryPage = () => {
  const [category, setCategory] = useState(categories);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="text-white body-font max-w-5xl mx-auto min-h-screen mt-[100px] px-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#B43F3F]">Categories</h1>
        <hr className="my-6 border-t-4 border-orange-500 w-1/3 mx-auto" />
      </div>

      <motion.div
        className="container py-12 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        <div className="flex flex-wrap -m-4">
          {category.map((data) => {
            let strData = data.strCategoryDescription.substring(0, 60);
            return (
              <motion.div
                key={data.idCategory}
                className="p-4 md:w-1/3"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="h-full rounded-lg overflow-hidden bg-[#B43F3F] shadow-lg hover:scale-105 transition-transform">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={data.strCategoryThumb}
                    alt={data.strCategory}
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs font-medium text-orange-300 mb-1">
                      CATEGORY
                    </h2>
                    <h1 className="text-xl font-semibold text-white mb-3">
                      {data.strCategory}
                    </h1>
                    <p className="leading-relaxed mb-3 text-white">
                      {strData}...
                    </p>
                    <div className="flex items-center justify-end">
                      <Link
                        href={`/category/${data.strCategory}`} // 🔗 Dynamic route
                        className="text-orange-300 inline-flex items-center hover:text-white transition-colors"
                      >
                        <span>More Details</span>
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default CategoryPage;
