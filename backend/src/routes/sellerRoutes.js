
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  registerSeller,
  getSellerProfile
} = require("../controllers/sellerController");

// Both routes require a logged-in user
router.post("/register", authMiddleware, registerSeller);
router.get("/profile", authMiddleware, getSellerProfile);

module.exports = router;