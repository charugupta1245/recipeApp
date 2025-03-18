// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const RandomRecipe = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [likes, setLikes] = useState({});
//   const [dislikes, setDislikes] = useState({});

//   useEffect(() => {
//     fetchRandomRecipes();
//   }, []);

//   const fetchRandomRecipes = async () => {
//     try {
//       let newRecipes = [];
//       for (let i = 0; i < 6; i++) {
//         const res = await fetch(
//           "https://www.themealdb.com/api/json/v1/1/random.php"
//         );
//         const data = await res.json();
//         if (data.meals) {
//           newRecipes.push(data.meals[0]);
//         }
//       }
//       setRecipes(newRecipes);
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   };

//   const fetchMealDetails = async (idMeal) => {
//     try {
//       const res = await fetch(
//         `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
//       );
//       const data = await res.json();
//       if (data.meals) {
//         setSelectedRecipe(data.meals[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching meal details:", error);
//     }
//   };

//   const handleLike = (id) => {
//     setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
//   };

//   const handleDislike = (id) => {
//     setDislikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
//   };

//   return (
//     <section className="text-white body-font max-w-5xl mx-auto min-h-screen mt-[100px] px-5">
//       <div className="text-center">
//         <motion.h1
//           className="text-4xl font-bold text-[#B43F3F]"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false }}
//           transition={{ duration: 0.8 }}
//         >
//           Random Recipes
//         </motion.h1>
//         <motion.hr
//           className="my-6 border-t-4 border-orange-500 w-1/3 mx-auto"
//           initial={{ scaleX: 0 }}
//           whileInView={{ scaleX: 1 }}
//           viewport={{ once: false }}
//           transition={{ duration: 0.8 }}
//         />
//       </div>

//       {!selectedRecipe ? (
//         <motion.div className="container py-12 mx-auto">
//           <div className="flex flex-wrap -m-4">
//             {recipes.map((recipe, index) => (
//               <motion.div
//                 key={index}
//                 className="p-4 md:w-1/3"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: false, amount: 0.2 }}
//               >
//                 <motion.div
//                   className="h-full rounded-lg overflow-hidden bg-[#B43F3F] shadow-lg"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <motion.img
//                     className="lg:h-48 md:h-36 w-full object-cover object-center"
//                     src={recipe.strMealThumb}
//                     alt={recipe.strMeal}
//                     initial={{ scale: 1.1 }}
//                     whileInView={{ scale: 1 }}
//                     viewport={{ once: false, amount: 0.2 }}
//                     transition={{ duration: 1, ease: "easeOut" }}
//                   />
//                   <div className="p-6">
//                     <h2 className="tracking-widest text-xs font-medium text-orange-300 mb-1">
//                       RECIPE
//                     </h2>
//                     <h1 className="text-xl font-semibold text-white mb-3">
//                       {recipe.strMeal}
//                     </h1>

//                     <button
//                       className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition w-full active:scale-95"
//                       onClick={() => fetchMealDetails(recipe.idMeal)}
//                     >
//                       More Details
//                     </button>

//                     <div className="flex justify-between mt-4 text-sm gap-2">
//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex-1 active:scale-95"
//                         onClick={() => handleLike(index)}
//                       >
//                         Like ❤️ {likes[index] || 0}
//                       </button>
//                       <button
//                         className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 flex-1 active:scale-95"
//                         onClick={() => handleDislike(index)}
//                       >
//                         Dislike 👎 {dislikes[index] || 0}
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       ) : (
//         <motion.div
//           className="p-6 text-brown w-full max-w-3xl recipe-details bg-white shadow-lg rounded-lg"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <button
//             className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto active:scale-95"
//             onClick={() => setSelectedRecipe(null)}
//           >
//             Back to Recipes
//           </button>
//           <h1 className="text-3xl font-bold mb-4 text-center text-[#B43F3F]">
//             {selectedRecipe.strMeal}
//           </h1>
//           <img
//             src={selectedRecipe.strMealThumb}
//             alt={selectedRecipe.strMeal}
//             className="rounded-md mb-4 w-full object-cover"
//           />
//           <h3 className="text-lg font-medium mb-2 text-[#B43F3F]">
//             Ingredients:
//           </h3>
//           <ul className="list-disc pl-6 text-gray-800">
//             {Array.from({ length: 20 }, (_, i) => i + 1)
//               .map((i) => selectedRecipe[`strIngredient${i}`])
//               .filter(Boolean)
//               .map((ingredient, idx) => (
//                 <li key={idx}>{ingredient}</li>
//               ))}
//           </ul>
//           <h3 className="text-lg font-medium mt-4 text-[#B43F3F]">
//             Instructions:
//           </h3>
//           <p className="text-gray-700 leading-relaxed">
//             {selectedRecipe.strInstructions}
//           </p>
//         </motion.div>
//       )}
//     </section>
//   );
// };

// export default RandomRecipe;
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const RandomRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    try {
      let newRecipes = [];
      for (let i = 0; i < 6; i++) {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        const data = await res.json();
        if (data.meals) {
          newRecipes.push(data.meals[0]);
        }
      }
      setRecipes(newRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDislike = (id) => {
    setDislikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

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
          Random Recipes
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
          {recipes.map((recipe, index) => (
            <motion.div
              key={index}
              className="p-4 md:w-1/3"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <motion.div
                className="h-full rounded-lg overflow-hidden bg-[#B43F3F] shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <motion.img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs font-medium text-orange-300 mb-1">
                    RECIPE
                  </h2>
                  <h1 className="text-xl font-semibold text-white mb-3">
                    {recipe.strMeal}
                  </h1>

                  <Link
                    href={`/meal/${recipe.idMeal}`}
                    className="text-orange-300 mt-2 inline-block hover:text-white"
                  >
                    View Recipe
                  </Link>

                  <div className="flex justify-between mt-4 text-sm gap-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex-1 active:scale-95"
                      onClick={() => handleLike(index)}
                    >
                      Like ❤️ {likes[index] || 0}
                    </button>
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 flex-1 active:scale-95"
                      onClick={() => handleDislike(index)}
                    >
                      Dislike 👎 {dislikes[index] || 0}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RandomRecipe;
