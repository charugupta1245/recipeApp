"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddRecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to add a recipe.");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(
        "http://localhost:5000/api/recipes/add",
        recipe,
        config
      );

      if (response.status === 201) {
        setSuccess("Recipe added successfully!");
        setTimeout(() => {
          router.push("/dashboard"); // Redirect to dashboard
        }, 1500);
      }
    } catch (err) {
      setError("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <h1 className="text-dark-red text-2xl font-bold mb-4">
          Add New Recipe
        </h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={recipe.title}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:outline-none focus:border-orange"
            required
          />
          <textarea
            name="ingredients"
            placeholder="Ingredients (comma-separated)"
            value={recipe.ingredients}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:outline-none focus:border-orange"
            required
          />
          <textarea
            name="instructions"
            placeholder="Instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:outline-none focus:border-orange"
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={recipe.imageUrl}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:outline-none focus:border-orange"
          />
          <button
            type="submit"
            className="bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-dark-red transition-all"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
