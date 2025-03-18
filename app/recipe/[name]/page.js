"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RecipeDetails() {
  const { name } = useParams(); // ✅ Extracts 'name' from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://fastmealapi-2.onrender.com/meals";

  useEffect(() => {
    if (!name) return;

    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error("Recipe not found!");

        const data = await response.json();
        setRecipe(Array.isArray(data.data) ? data.data[0] : data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [name]);

  // ✅ Extracts ingredients correctly
  const getIngredients = () => {
    let ingredients = [];

    if (Array.isArray(recipe?.strIngredients)) {
      ingredients = recipe.strIngredients;
    } else if (typeof recipe?.strIngredients === "string") {
      try {
        let fixedStr = recipe.strIngredients.replace(/'/g, '"');
        ingredients = JSON.parse(fixedStr);
        if (!Array.isArray(ingredients)) {
          ingredients = [];
        }
      } catch (error) {
        console.error("Error parsing ingredients:", error);
        ingredients = [];
      }
    } else {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe?.[`strIngredient${i}`];
        const measure = recipe?.[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${measure ? measure + " " : ""}${ingredient}`);
        }
      }
    }
    return ingredients;
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb || "https://via.placeholder.com/400"}
        alt={recipe.strMeal}
        className="w-full max-w-lg mx-auto rounded-lg shadow-lg mt-4"
      />

      {/* Ingredients Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Ingredients</h2>
        <ul className="list-disc ml-6 text-gray-700 mt-2">
          {getIngredients().map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Instructions Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Instructions</h2>
        <p className="text-gray-700 mt-2">{recipe.strInstructions}</p>
      </div>
    </div>
  );
}
