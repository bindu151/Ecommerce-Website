
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createPayment,
  getMyPayments
} = require("../controllers/paymentController");

router.post("/", authMiddleware, createPayment);
router.get("/my", authMiddleware, getMyPayments);

module.exports = router;