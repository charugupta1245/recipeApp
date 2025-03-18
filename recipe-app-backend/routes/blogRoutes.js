const express = require("express");
const {
  getBlogs,
  createBlog,
  likeBlog,
  dislikeBlog,
} = require("../controllers/blogController"); // Correct path

const authMiddleware = require("../middleware/authMiddleware"); // Ensure middleware exists

const router = express.Router();

router.get("/", getBlogs);
router.post("/", authMiddleware, createBlog);
router.post("/:id/like", authMiddleware, likeBlog);
router.post("/:id/dislike", authMiddleware, dislikeBlog);

module.exports = router;
