"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function MealDetails({ meal }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const router = useRouter();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient,
        measure,
        image: `https://www.themealdb.com/images/ingredients/${ingredient}.png`,
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAF3E0] p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-8 bg-white/90 backdrop-blur-md shadow-lg rounded-3xl border border-[#8B4513] relative flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 right-4 text-[#8B4513] hover:text-[#B22222] text-2xl"
        >
          ✖
        </button>

        {/* Meal Image & Title */}
        <div className="flex flex-col items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={280}
              height={200}
              className="rounded-lg shadow-md"
            />
          </motion.div>
          <h2 className="text-3xl font-bold mt-4 text-[#8B4513] tracking-wide text-center">
            {meal.strMeal}
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="mt-6 flex-1 overflow-y-auto px-4 hide-scrollbar">
          {currentPage === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-xl font-semibold text-[#E87C2A] mb-3">
                Ingredients:
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-[#FFF3E0] p-2 rounded-lg shadow-md hover:scale-105 transition"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                    />
                    <p className="text-[#8B4513] text-sm font-medium text-center">
                      {item.measure} {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-xl font-semibold text-[#E87C2A] mb-3">
                Instructions:
              </h3>
              <p className="text-md text-gray-700 leading-relaxed">
                {meal.strInstructions}
              </p>
            </motion.div>
          )}

          {currentPage === 3 && meal.strYoutube && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-lg font-semibold text-[#8B4513] hover:text-[#B22222] transition underline"
              >
                📺 Watch Video
              </a>
            </motion.div>
          )}
        </div>

        {/* Like & Dislike Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <motion.button
            onClick={() => setLikes((prev) => prev + 1)}
            className="bg-[#E87C2A] text-white px-4 py-2 rounded-lg hover:bg-[#C95E1D] transition hover:scale-105 flex items-center gap-2 text-md font-semibold"
          >
            👍 Like ({likes})
          </motion.button>
          <motion.button
            onClick={() => setDislikes((prev) => prev + 1)}
            className="bg-[#8B4513] text-white px-4 py-2 rounded-lg hover:bg-[#6D3710] transition hover:scale-105 flex items-center gap-2 text-md font-semibold"
          >
            👎 Dislike ({dislikes})
          </motion.button>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 gap-4">
          <motion.button
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50 text-md font-semibold"
            disabled={currentPage === 1}
          >
            ◀ Previous
          </motion.button>
          <span className="text-md font-semibold text-[#8B4513]">
            Page {currentPage} / {totalPages}
          </span>
          <motion.button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50 text-md font-semibold"
            disabled={currentPage === totalPages}
          >
            Next ▶
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
