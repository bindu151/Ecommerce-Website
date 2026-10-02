
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET: Display all products
router.get("/", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to fetch products",
        error: error.message,
      });
    }

    res.json(results);
  });
});

// POST: Add a new product
router.post("/", (req, res) => {
  const {
    category_id,
    product_name,
    description,
    price,
    stock_quantity,
    image_url,
  } = req.body;

  if (!category_id || !product_name || price == null) {
    return res.status(400).json({
      message: "Category, product name, and price are required",
    });
  }

  const sql = `
    INSERT INTO products
    (category_id, product_name, description, price, stock_quantity, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    category_id,
    product_name,
    description || null,
    price,
    stock_quantity ?? 0,
    image_url || null,
  ];

  db.query(sql, values, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to add product",
        error: error.message,
      });
    }

    res.status(201).json({
      message: "Product added successfully!",
      product_id: result.insertId,
    });
  });
});

module.exports = router;