// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";

// const CategoryPageDetails = () => {
//   const { categoryName } = useParams(); // Get category name from URL
//   const [meals, setMeals] = useState([]);

//   useEffect(() => {
//     const fetchMeals = async () => {
//       const res = await fetch(
//         `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
//       );
//       const data = await res.json();
//       setMeals(data.meals || []);
//     };

//     fetchMeals();
//   }, [categoryName]);

//   return (
//     <section className="text-white body-font max-w-5xl mx-auto min-h-screen mt-[100px] px-5">
//       <h1 className="text-4xl font-bold text-[#B43F3F] text-center">
//         {categoryName} Recipes
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {meals.map((meal) => (
//           <div
//             key={meal.idMeal}
//             className="bg-[#B43F3F] p-4 rounded-lg shadow-lg"
//           >
//             <img
//               src={meal.strMealThumb}
//               alt={meal.strMeal}
//               className="w-full h-40 object-cover rounded-md"
//             />
//             <h2 className="text-lg font-bold mt-3">{meal.strMeal}</h2>
//             <Link
//               href={`/meal/${meal.idMeal}`}
//               className="text-orange-300 mt-2 inline-block hover:text-white"
//             >
//               View Recipe
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CategoryPageDetails;
