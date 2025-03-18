const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from request headers
  const token = req.header("Authorization");

  // If no token is found, deny access
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object
    req.user = decoded;

    // Move to the next middleware/route
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
