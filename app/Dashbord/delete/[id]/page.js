"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

const DeleteRecipe = () => {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Recipe ID:", id);
  }, [id]);

  const handleDelete = async () => {
    if (!id) {
      alert("Recipe ID is missing!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/recipes/delete/${id}`, // ✅ Fixed URL
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Recipe deleted successfully!");
        router.push("/dashboard");
      } else {
        alert(data.error || "Failed to delete recipe!");
        console.error("Error response:", data);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Delete Recipe</h1>
      <p className="text-lg text-gray-700 mb-6">
        Are you sure you want to delete this recipe?
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-700"
          }`}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteRecipe;
