const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Recipe = require("../models/Recipe");
const router = express.Router();

// Create a Recipe
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      userId: req.user.userId,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error });
  }
});

// Get all Recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
});

// Get a Single Recipe
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
});

// Update a Recipe
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
});

// Delete a Recipe
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
});

module.exports = router;
