
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token is required",
    });
  }

  // Extract the token after "Bearer "
  const token = authHeader.split(" ")[1];

  // Check whether the token is valid
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Authentication is not configured",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make the authenticated user's information available to the route
    req.user = decoded;

    // Continue to the requested route
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;