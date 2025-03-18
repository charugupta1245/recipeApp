const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();
const cors = require("cors");

const app = express();

// ✅ Middleware (Order Matters!)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ], // ✅ Allow both ports
    credentials: true, // ✅ Important for authentication
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // 🛑 Ensure JSON body parsing is enabled

// ✅ Routes
app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);

// ✅ Connect to DB
connectDB();

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
