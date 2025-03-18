// "use client";
// import React, { useState } from "react";

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
//           Search{" "}
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
//   const { strMeal, strCategory, strArea, strInstructions, strMealThumb } =
//     recipe;

//   const [imageUrl, setImageUrl] = useState(strMealThumb);
//   const [loadingImage, setLoadingImage] = useState(!strMealThumb);

//   const fetchImage = async () => {
//     try {
//       const response = await fetch(
//         `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
//           strMeal
//         )}&client_id=${unsplashApiKey}`
//       );
//       const data = await response.json();
//       if (data?.urls?.regular) {
//         setImageUrl(data.urls.regular);
//       } else {
//         setImageUrl("https://via.placeholder.com/400x300?text=No+Image");
//       }
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

//   const ingredients = extractIngredients(recipe);
//   const instructions = formatInstructions(recipe.strInstructions);

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
//         <h2 className="text-xl font-semibold text-gray-800">
//           {strMeal || "Unnamed Recipe"}
//         </h2>
//         <div className="flex gap-2 mt-2">
//           {strCategory && (
//             <span className="bg-gray-200 px-2 py-1 rounded text-sm">
//               {strCategory}
//             </span>
//           )}
//           {strArea && (
//             <span className="bg-gray-200 px-2 py-1 rounded text-sm">
//               {strArea}
//             </span>
//           )}
//         </div>
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Ingredients</h3>
//           <ul className="list-disc list-inside text-gray-600">
//             {ingredients.length > 0 ? (
//               ingredients.map((ing, i) => <li key={i}>{ing}</li>)
//             ) : (
//               <li>No ingredients listed</li>
//             )}
//           </ul>
//         </div>
//         {instructions && (
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Instructions</h3>
//             <p className="text-gray-700">{instructions}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Extract ingredients correctly
// const extractIngredients = (recipe) => {
//   let ingredients = [];

//   if (
//     typeof recipe.strIngredients === "string" &&
//     recipe.strIngredients.includes("[")
//   ) {
//     try {
//       ingredients = JSON.parse(recipe.strIngredients.replace(/'/g, '"'));
//     } catch (e) {
//       console.error("Error parsing Supabase ingredients:", e);
//     }
//   }

//   for (let i = 1; i <= 20; i++) {
//     const ingredient = recipe[`strIngredient${i}`]?.trim();
//     const measure = recipe[`strMeasure${i}`]?.trim();
//     if (ingredient) {
//       ingredients.push(`${measure ? measure + " " : ""}${ingredient}`);
//     }
//   }

//   return ingredients;
// };

// // Format instructions correctly
// const formatInstructions = (instructions) => {
//   if (Array.isArray(instructions)) {
//     return instructions.join(" ");
//   }
//   if (typeof instructions === "string" && instructions.includes("[")) {
//     try {
//       const parsedInstructions = JSON.parse(instructions.replace(/'/g, '"'));
//       return parsedInstructions.join(" ");
//     } catch (e) {
//       console.error("Error parsing instructions:", e);
//     }
//   }
//   return instructions;
// };
