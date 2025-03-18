"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    gsap.from(".dashboard-card", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await fetch("http://localhost:5000/api/recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 4bda29dd439981d033bcd81657c45d680457588e18cfb266831f7b5b4aa4ece1c067b58267e0e7aa1432c69aafc1cfe49546a14a8c03fbfdf60bfbc2f796f7b6`, // Attach token
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen p-6 bg-[#ece9e3]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-[#8C1C1C] mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Dashboard
      </motion.h1>

      {/* Dashboard Stats Card */}
      <motion.div
        className="dashboard-card p-6 bg-[#8C2F39] shadow-lg rounded-xl border-l-8 border-[#701919] text-white"
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 className="text-xl font-semibold">Total Recipes</h2>
        <motion.p
          className="text-3xl font-bold text-[#FF7300]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {recipes.length}
        </motion.p>
      </motion.div>

      {/* Recipe List */}
      <motion.h2
        className="text-3xl font-bold text-[#8C1C1C] mt-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Recipes
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full max-w-6xl">
        {recipes.length ? (
          recipes.map((recipe, index) => (
            <motion.div
              key={recipe._id}
              className="dashboard-card p-6 bg-[#8C2F39] shadow-lg rounded-xl overflow-hidden border border-[#701919] text-white flex flex-col justify-between"
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-[#FF4500]">
                {recipe.title}
              </h3>
              <motion.img
                src={recipe.imgurl}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-lg mt-3"
                whileHover={{ opacity: 0.8 }}
              />
              <h4 className="text-lg font-semibold mt-4 text-[#FF7300]">
                Instructions:
              </h4>
              <p className="text-sm leading-relaxed p-3 bg-[#D3D3D3] rounded-md text-black">
                🔹 {recipe.ist}
              </p>

              <h4 className="text-lg font-semibold mt-4 text-[#FF7300]">
                Ingredients & Quantity:
              </h4>
              <ul className="mt-2 text-sm p-3 bg-[#D3D3D3] rounded-md text-black">
                {recipe.ingredients.map((ing, index) => (
                  <li key={index} className="font-medium">
                    🔹 <strong>{ing.name}</strong> - {ing.quantity}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="mt-4 flex justify-between items-center w-full">
                <motion.button
                  onClick={() => router.push(`/dashboard/edit/${recipe._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.1 }}
                >
                  ✏️ Edit
                </motion.button>
                <motion.button
                  onClick={() => router.push(`/dashboard/delete/${recipe._id}`)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  whileHover={{ scale: 1.1 }}
                >
                  🗑️ Delete
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-gray-400 text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            No recipes added yet.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
