"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import categories from "./Category";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const CategoryPage = () => {
  const [category, setCategory] = useState(categories);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="text-white body-font max-w-5xl mx-auto min-h-screen mt-[100px] px-5">
      <div className="text-center">
        <motion.h1
          className="text-4xl font-bold text-[#B43F3F]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          Categories
        </motion.h1>
        <motion.hr
          className="my-6 border-t-4 border-orange-500 w-1/3 mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <motion.div className="container py-12 mx-auto">
        <div className="flex flex-wrap -m-4">
          {category.map((data) => {
            let strData = data.strCategoryDescription.substring(0, 60);
            return (
              <motion.div
                key={data.idCategory}
                className="p-4 md:w-1/3"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                whileHover="hover"
              >
                <motion.div
                  className="h-full flex flex-col rounded-lg overflow-hidden bg-[#B43F3F] shadow-lg cursor-pointer"
                  whileHover="hover"
                >
                  <motion.img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={data.strCategoryThumb}
                    alt={data.strCategory}
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="tracking-widest text-xs font-medium text-orange-300 mb-1">
                      CATEGORY
                    </h2>
                    <div className="flex-grow">
                      <h1 className="text-xl font-semibold text-white mb-3">
                        {data.strCategory}
                      </h1>
                      <p className="leading-relaxed text-white">{strData}...</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="mt-3 text-right"
                    >
                      <Link
                        href={`/category/${data.strCategory}`}
                        className="text-orange-300 inline-flex items-center hover:text-white transition-colors"
                      >
                        <span>More Details</span>
                        <motion.svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </motion.svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default CategoryPage;
