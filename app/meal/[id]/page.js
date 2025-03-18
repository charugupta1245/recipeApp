"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MealDetails from "@/Components/MealDetails";

const MealPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(false);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setMeal(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (!meal) return <p className="text-white text-center">Loading...</p>;

  return <MealDetails meal={meal} onClose={() => {}} />;
};

export default MealPage;
