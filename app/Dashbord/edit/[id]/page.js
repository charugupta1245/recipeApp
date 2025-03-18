"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditRecipe = () => {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    imgurl: "",
    ist: "",
    ingredients: [],
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:5000/api/recipes/${id}`);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);

        const data = await res.json();
        setFormData({
          title: data.title || "",
          imgurl: data.imgurl || "",
          ist: data.ist || "",
          ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
        });
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
        setError("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = formData.ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
    );
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleUpdate = async () => {
    if (
      !formData.title.trim() ||
      !formData.imgurl.trim() ||
      !formData.ist.trim()
    ) {
      alert("Title, Image URL, and Instructions are required.");
      return;
    }

    const filteredIngredients = formData.ingredients.filter(
      (ing) => ing.name.trim() !== ""
    );

    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ingredients: filteredIngredients }),
      });

      if (!res.ok) throw new Error(`Update failed: ${res.status}`);

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update recipe:", error);
      alert("Error updating recipe. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#ece9e3] p-6">
      <h1 className="text-3xl font-bold text-[#8C1C1C] mb-4">Edit Recipe</h1>

      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-2xl">
        <label className="block font-semibold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <label className="block font-semibold mt-4 mb-2">Image URL</label>
        <input
          type="text"
          name="imgurl"
          value={formData.imgurl}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <label className="block font-semibold mt-4 mb-2">Instructions</label>
        <textarea
          name="ist"
          value={formData.ist}
          onChange={handleChange}
          rows="3"
          className="w-full border p-2 rounded-md"
        ></textarea>

        <h4 className="font-semibold mt-4">Ingredients</h4>
        {formData.ingredients.map((ing, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              value={ing.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              placeholder="Ingredient Name"
              className="border p-2 rounded-md flex-1"
            />
            <input
              type="text"
              value={ing.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              placeholder="Quantity"
              className="border p-2 rounded-md w-24"
            />
          </div>
        ))}

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleUpdate}
            disabled={updating}
            className={`${
              updating ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
            } text-white px-6 py-2 rounded-md transition w-full sm:w-auto`}
          >
            ✅ {updating ? "Updating..." : "Update Recipe"}
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition w-full sm:w-auto"
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
