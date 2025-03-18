"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MealResults({ meals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {meals?.length > 0 &&
        meals.map((meal) => (
          <motion.div
            key={meal.idMeal}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#B43F3F] p-4 rounded-lg shadow-lg cursor-pointer"
          >
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={200}
              height={150}
              className="rounded-md w-full h-40 object-cover"
            />
            <h3 className="text-lg text-white mt-2 font-semibold">
              {meal.strMeal}
            </h3>
            <Link
              href={`/meal/${meal.idMeal}`}
              className="mt-3 inline-block bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition text-center w-full"
            >
              View Recipe
            </Link>
          </motion.div>
        ))}
    </div>
  );
}
