
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// Admin dashboard - only authenticated ADMIN users can access
router.get(
  "/dashboard",
  authMiddleware,
  requireRole("ADMIN"),
  (req, res) => {
    res.json({
      message: "Admin dashboard access successful",
      admin: req.user
    });
  }
);

module.exports = router;