
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
  getOrderDetails,
  cancelOrder,
} = require("../controllers/orderController");

router.use(authMiddleware);

router.post("/", placeOrder);
router.get("/my", getMyOrders);
router.get("/:orderId", getOrderDetails);
router.patch("/:orderId/cancel", cancelOrder);

module.exports = router;