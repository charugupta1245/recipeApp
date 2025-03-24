"use client";
import React, { useState, useEffect } from "react";

export default function RecipeFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const API_URL = "https://api1-07fg.onrender.com/meals";

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
              onView={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      </div>

      {/* Modal for Viewing Recipe */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

// Function to get an image from Unsplash if not available
const getRecipeImage = async (mealName) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        mealName
      )}&client_id=7omHTJvkc6nvSpl6MFdpLMI2WtfEECfT5f5nwoPDwaY`
    );
    const data = await response.json();
    return data?.urls?.regular || "https://wallpaperaccess.com/full/767277.jpg";
  } catch (error) {
    console.error("Error fetching Unsplash image:", error);
    return "https://wallpaperaccess.com/full/767277.jpg"; // Fallback default image
  }
};

// Recipe Card Component
const RecipeCard = ({ recipe, onView }) => {
  const defaultImage = "https://wallpaperaccess.com/full/767277.jpg";
  const [imageSrc, setImageSrc] = useState(recipe.strMealThumb || defaultImage);

  useEffect(() => {
    if (!recipe.strMealThumb) {
      getRecipeImage(recipe.strMeal).then(setImageSrc);
    }
  }, [recipe.strMealThumb, recipe.strMeal]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Recipe Image */}
      <img
        src={imageSrc}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={() => setImageSrc(defaultImage)} // Fallback in case of a broken image link
      />

      {/* Content Section */}
      <div className="p-4 flex flex-col h-32">
        {/* Title Section */}
        <h2 className="text-lg font-semibold text-gray-800 text-center line-clamp-2 leading-tight flex-grow">
          {recipe.strMeal}
        </h2>

        {/* View Recipe Button - Always at Bottom */}
        <button
          onClick={onView}
          className="mt-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all w-full font-semibold"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

// recipemodal
const RecipeModal = ({ recipe, onClose }) => {
  const { strMeal, strMealThumb, strInstructions, strYoutube } = recipe;
  const [activeTab, setActiveTab] = useState("ingredients");
  const [imageSrc, setImageSrc] = useState(
    strMealThumb || "https://source.unsplash.com/400x300/?food,dish"
  );

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  useEffect(() => {
    if (!strMealThumb) {
      getRecipeImage(strMeal).then(setImageSrc);
    }

    // Load like/dislike status from localStorage
    const storedStatus = localStorage.getItem(`recipe-${recipe.idMeal}`);
    if (storedStatus === "liked") setLiked(true);
    if (storedStatus === "disliked") setDisliked(true);
  }, [strMealThumb, strMeal]);

  const handleLike = () => {
    if (!liked && !disliked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      localStorage.setItem(`recipe-${recipe.idMeal}`, "liked");
    }
  };

  const handleDislike = () => {
    if (!liked && !disliked) {
      setDisliked(true);
      setDislikesCount((prev) => prev + 1);
      localStorage.setItem(`recipe-${recipe.idMeal}`, "disliked");
    }
  };

  const handleShare = async () => {
    const shareURL = window.location.href;
    try {
      await navigator.clipboard.writeText(shareURL);
      alert("Recipe link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const getIngredients = () => {
    let ingredients = [];

    if (Array.isArray(recipe.strIngredients)) {
      ingredients = recipe.strIngredients;
    } else if (typeof recipe.strIngredients === "string") {
      try {
        let fixedStr = recipe.strIngredients.replace(/'/g, '"');
        ingredients = JSON.parse(fixedStr);
        if (!Array.isArray(ingredients)) {
          ingredients = [];
        }
      } catch (error) {
        console.error("Error parsing Supabase ingredients:", error);
        ingredients = [];
      }
    } else {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${measure ? measure + " " : ""}${ingredient}`);
        }
      }
    }

    return ingredients;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl p-6 relative animate-fadeIn h-[80vh] flex flex-col">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all shadow-md"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Image */}
        <img
          src={imageSrc}
          alt={strMeal}
          className="w-full h-40 object-cover rounded-lg shadow-md"
        />

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mt-3 text-gray-900">
          {strMeal}
        </h2>

        {/* Like, Dislike, and Share Buttons */}
        <div className="flex justify-center space-x-6 mt-3">
          <button
            onClick={handleLike}
            disabled={liked || disliked}
            className={`px-4 py-2 rounded-full text-lg font-semibold transition-all ${
              liked
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-green-400"
            }`}
          >
            👍 {likesCount}
          </button>

          <button
            onClick={handleDislike}
            disabled={liked || disliked}
            className={`px-4 py-2 rounded-full text-lg font-semibold transition-all ${
              disliked
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-red-400"
            }`}
          >
            👎 {dislikesCount}
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all"
          >
            📤 Share
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mt-5 space-x-3">
          {["ingredients", "instructions", "tutorial"].map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2 text-lg rounded-full transition-all duration-300 font-semibold shadow-md ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-orange-300 text-gray-800 hover:bg-orange-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="mt-4 flex-grow overflow-y-auto p-4 border-t border-gray-300 text-gray-800">
          {activeTab === "ingredients" && (
            <ul className="list-disc ml-5 space-y-2 text-lg">
              {getIngredients().map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          )}
          {activeTab === "instructions" && (
            <p className="text-lg leading-relaxed">{strInstructions}</p>
          )}
          {activeTab === "tutorial" && strYoutube && (
            <iframe
              src={strYoutube.replace("watch?v=", "embed/")}
              className="w-full h-52 rounded-lg shadow-md"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};
