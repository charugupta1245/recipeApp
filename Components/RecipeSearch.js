// "use client";
// import React, { useState } from "react";
// import Link from "next/link";

// export default function RecipeFinder() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API_URL = "https://fastmealapi-2.onrender.com/meals";
//   const UNSPLASH_API_KEY = "7omHTJvkc6nvSpl6MFdpLMI2WtfEECfT5f5nwoPDwaY";

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) {
//       alert("Please enter a dish name");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setRecipes([]);

//     try {
//       const response = await fetch(
//         `${API_URL}/${encodeURIComponent(searchQuery)}`
//       );
//       if (!response.ok)
//         throw new Error(`API responded with status ${response.status}`);

//       const data = await response.json();
//       const normalizedData = data?.data
//         ? Array.isArray(data.data)
//           ? data.data
//           : [data.data]
//         : [];

//       setRecipes(normalizedData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-center gap-4 mb-10">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search for recipes..."
//           className="w-2/3 px-4 py-3 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />
//         <button
//           onClick={handleSearch}
//           className="px-6 py-3 bg-[#B43F3F] text-white rounded-lg hover:bg-[#ba6e6e] transition-all"
//         >
//           Search
//         </button>
//       </div>

//       <div className="w-full flex justify-center">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
//           {loading && (
//             <p className="text-center text-gray-600">
//               Searching for recipes...
//             </p>
//           )}
//           {error && <div className="text-red-500 text-center">{error}</div>}
//           {recipes.length === 0 && !loading && !error && (
//             <p className="text-center text-gray-500">No recipes found.</p>
//           )}

//           {recipes.map((recipe, index) => (
//             <RecipeCard
//               key={index}
//               recipe={recipe}
//               unsplashApiKey={UNSPLASH_API_KEY}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const RecipeCard = ({ recipe, unsplashApiKey }) => {
//   const { strMeal, strMealThumb, strInstructions } = recipe;

//   const [imageUrl, setImageUrl] = useState(strMealThumb);
//   const [loadingImage, setLoadingImage] = useState(!strMealThumb);
//   const [activeTab, setActiveTab] = useState(null); // Track which tab is active

//   const fetchImage = async () => {
//     try {
//       const response = await fetch(
//         `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
//           strMeal
//         )}&client_id=${unsplashApiKey}`
//       );
//       const data = await response.json();
//       setImageUrl(
//         data?.urls?.regular ||
//           "https://via.placeholder.com/400x300?text=No+Image"
//       );
//     } catch (error) {
//       console.error("Error fetching Unsplash image:", error);
//       setImageUrl("https://via.placeholder.com/400x300?text=No+Image");
//     } finally {
//       setLoadingImage(false);
//     }
//   };

//   React.useEffect(() => {
//     if (!strMealThumb) {
//       fetchImage();
//     }
//   }, [strMealThumb]);

//   // Extract ingredients dynamically
//   const getIngredients = () => {
//     let ingredients = [];

//     if (Array.isArray(recipe.strIngredients)) {
//       // ✅ Supabase format (array)
//       ingredients = recipe.strIngredients;
//     } else if (typeof recipe.strIngredients === "string") {
//       // ✅ Supabase format (stringified array)
//       console.log("Raw strIngredients:", recipe.strIngredients);
//       try {
//         let fixedStr = recipe.strIngredients.replace(/'/g, '"'); // Fix invalid JSON
//         ingredients = JSON.parse(fixedStr);
//         if (!Array.isArray(ingredients)) {
//           ingredients = [];
//         }
//       } catch (error) {
//         console.error("Error parsing Supabase ingredients:", error);
//         ingredients = [];
//       }
//     } else {
//       // ✅ MealDB format (separate ingredient keys)
//       for (let i = 1; i <= 20; i++) {
//         const ingredient = recipe[`strIngredient${i}`];
//         const measure = recipe[`strMeasure${i}`];
//         if (ingredient && ingredient.trim()) {
//           ingredients.push(`${measure ? measure + " " : ""}${ingredient}`);
//         }
//       }
//     }

//     return ingredients;
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm transform transition duration-300 hover:scale-105">
//       {loadingImage ? (
//         <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
//       ) : (
//         <img
//           src={imageUrl}
//           alt={strMeal}
//           className="w-full h-48 object-cover"
//         />
//       )}

//       <div className="p-4">
//         <h2 className="text-xl font-semibold text-gray-800">{strMeal}</h2>

//         <div className="flex gap-3 mt-4">
//           <button
//             className={`px-4 py-2 rounded-lg transition-all ${
//               activeTab === "ingredients"
//                 ? "bg-orange-600 text-white"
//                 : "bg-orange-400 text-white hover:bg-orange-500"
//             }`}
//             onClick={() =>
//               setActiveTab(activeTab === "ingredients" ? null : "ingredients")
//             }
//           >
//             View Ingredients
//           </button>

//           <button
//             className={`px-4 py-2 rounded-lg transition-all ${
//               activeTab === "instructions"
//                 ? "bg-orange-600 text-white"
//                 : "bg-orange-400 text-white hover:bg-orange-500"
//             }`}
//             onClick={() =>
//               setActiveTab(activeTab === "instructions" ? null : "instructions")
//             }
//           >
//             View Instructions
//           </button>
//         </div>

//         {activeTab === "ingredients" && (
//           <div className="mt-4 max-h-60 overflow-y-auto p-3 border-t border-gray-300">
//             <h3 className="text-lg font-semibold">Ingredients</h3>
//             <ul className="list-disc ml-5 text-gray-700">
//               {getIngredients().map((ingredient, index) => (
//                 <li key={index}>{ingredient}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {activeTab === "instructions" && (
//           <div className="mt-4 max-h-60 overflow-y-auto p-3 border-t border-gray-300">
//             <h3 className="text-lg font-semibold">Instructions</h3>
//             <p className="text-gray-700">{strInstructions}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
"use client";
import React, { useState, useEffect } from "react";

export default function RecipeFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const API_URL = "https://fastmealapi-2.onrender.com/meals";

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
    return (
      data?.urls?.regular || "https://source.unsplash.com/400x300/?food,dish"
    );
  } catch (error) {
    console.error("Error fetching Unsplash image:", error);
    return "https://source.unsplash.com/400x300/?food,dish"; // Fallback Unsplash image
  }
};

// Recipe Card Component
const RecipeCard = ({ recipe, onView }) => {
  const [imageSrc, setImageSrc] = useState(
    recipe.strMealThumb || "https://source.unsplash.com/400x300/?food,dish"
  );

  useEffect(() => {
    if (!recipe.strMealThumb) {
      getRecipeImage(recipe.strMeal).then(setImageSrc);
    }
  }, [recipe.strMealThumb, recipe.strMeal]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm transform transition duration-300 hover:scale-105">
      <img
        src={imageSrc}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {recipe.strMeal}
        </h2>
        <button
          onClick={onView}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all w-full"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

// Recipe Modal Component
const RecipeModal = ({ recipe, onClose }) => {
  const { strMeal, strMealThumb, strInstructions, strYoutube } = recipe;
  const [activeTab, setActiveTab] = useState("ingredients");
  const [imageSrc, setImageSrc] = useState(
    strMealThumb || "https://source.unsplash.com/400x300/?food,dish"
  );

  useEffect(() => {
    if (!strMealThumb) {
      getRecipeImage(strMeal).then(setImageSrc);
    }
  }, [strMealThumb, strMeal]);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-amber-700 text-white hover:bg-amber-800 transition-all shadow-md"
          onClick={onClose}
        >
          ✖
        </button>

        <img
          src={imageSrc}
          alt={strMeal}
          className="w-full h-60 object-cover rounded-lg"
        />
        <h2 className="text-2xl font-bold text-center mt-4">{strMeal}</h2>

        <div className="flex justify-around mt-6">
          {["ingredients", "instructions", "tutorial"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-orange-600 text-white"
                  : "bg-orange-400 text-white hover:bg-orange-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4 max-h-60 overflow-y-auto p-3 border-t border-gray-300">
          {activeTab === "ingredients" && (
            <ul className="list-disc ml-5 text-gray-700">
              {getIngredients().map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          )}
          {activeTab === "instructions" && (
            <p className="text-gray-700">{strInstructions}</p>
          )}
          {activeTab === "tutorial" && strYoutube && (
            <iframe
              src={strYoutube.replace("watch?v=", "embed/")}
              className="w-full h-48"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};
