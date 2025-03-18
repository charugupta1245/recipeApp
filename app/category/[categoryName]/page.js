"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion from framer-motion

const CategoryPageDetails = () => {
  const { categoryName } = useParams(); // ✅ Correct way to get dynamic param
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
        );
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [categoryName]);

  // Define card variants with hover scaling
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }, // Add hover scaling
  };

  return (
    <section className="text-white body-font max-w-5xl mx-auto min-h-screen mt-[100px] px-5">
      <h1 className="text-4xl font-bold text-[#B43F3F] text-center">
        {categoryName} Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {meals.map((meal) => (
          <motion.div
            key={meal.idMeal}
            className="bg-[#B43F3F] p-4 rounded-lg shadow-lg cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            whileHover="hover" // Apply hover scaling
          >
            <motion.img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-40 object-cover rounded-md"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <h2 className="text-lg font-bold mt-3">{meal.strMeal}</h2>
            <Link
              href={`/meal/${meal.idMeal}`}
              className="text-orange-300 mt-2 inline-block hover:text-white"
            >
              View Recipe
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryPageDetails;
