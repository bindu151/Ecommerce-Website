
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

// All cart routes require customer authentication
router.use(authMiddleware);

// Add a product to the cart
router.post("/", addToCart);

// View the cart
router.get("/", getCart);

// Update a product's quantity
router.put("/:productId", updateCartItem);

// Remove a product from the cart
router.delete("/:productId", removeFromCart);

module.exports = router;