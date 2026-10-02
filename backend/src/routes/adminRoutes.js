const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// Temporary dashboard route for testing access control
router.get(
  "/dashboard",
  authMiddleware,
  requireRole("ADMIN"),
  (req, res) => {
    res.json({
      message: "Admin dashboard access successful",
    });
  }
);

module.exports = router;