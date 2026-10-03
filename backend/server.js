
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./src/config/db");
const productRoutes = require("./src/routes/productRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const authRoutes = require("./src/routes/authRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const sellerRoutes = require("./src/routes/sellerRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect Product API
app.use("/api/products", productRoutes);
// Connect Category API
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/auth-test", authMiddleware, (req, res) => {
  res.json({
    message: "Authentication successful",
    user: req.user
  });
});

app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/payments", paymentRoutes);


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Backend is running successfully!"
  });
});

// Test database route
app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1 AS result", (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Database query failed",
        error: error.message
      });
    }

    res.json({
      message: "Database connected successfully!",
      result: results[0].result
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});