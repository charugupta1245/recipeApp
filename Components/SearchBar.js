"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import MealResults from "./MealResults";
import MealDetails from "./MealDetails";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMeals = async (searchTerm) => {
    if (!searchTerm) return;
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await res.json();
      setMeals(data.meals);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals(query);
  };

  return (
    <div className="flex flex-col items-center w-3/5 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center bg-orange-100 border-2 border-orange-500 shadow-md rounded-full px-6 py-3 w-full mt-6"
      >
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for delicious recipes..."
          className="ml-3 w-full bg-transparent focus:outline-none text-gray-700 text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 p-3 rounded-full text-white hover:bg-orange-600 transition"
        >
          🍽️
        </button>
      </motion.div>

      {meals && (
        <div className="w-full mt-4">
          <MealResults
            meals={meals}
            onSelectMeal={setSelectedMeal}
            transition={{ duration: 0.5, ease: "easeOut" }}
            hoverEffect={{ scale: 1.05 }}
          />
        </div>
      )}

      {selectedMeal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
            <MealDetails
              meal={selectedMeal}
              onClose={() => setSelectedMeal(null)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
