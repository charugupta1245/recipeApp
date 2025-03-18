"use client";
import React, { useState } from "react";
import RecipeCard from "./RecipeCard"; // Importing RecipeCard component

export default function RecipeFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://fastmealapi-2.onrender.com/meals";
  const UNSPLASH_API_KEY = "7omHTJvkc6nvSpl6MFdpLMI2WtfEECfT5f5nwoPDwaY";

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a dish name");
      return;
    }

    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const response = await fetch(
        `${API_URL}/${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok)
        throw new Error(`API responded with status ${response.status}`);

      const data = await response.json();
      const normalizedData = data?.data
        ? Array.isArray(data.data)
          ? data.data
          : [data.data]
        : [];

      setRecipes(normalizedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center gap-4 mb-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="w-2/3 px-4 py-3 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-[#B43F3F] text-white rounded-lg hover:bg-[#ba6e6e] transition-all"
        >
          Search
        </button>
      </div>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
          {loading && (
            <p className="text-center text-gray-600">
              Searching for recipes...
            </p>
          )}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {recipes.length === 0 && !loading && !error && (
            <p className="text-center text-gray-500">No recipes found.</p>
          )}

          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              unsplashApiKey={UNSPLASH_API_KEY}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
