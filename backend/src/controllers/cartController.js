
const db = require("../config/db");

// Add a product to the logged-in customer's cart
const addToCart = (req, res) => {
  const userId = req.user.user_id;
  const { product_id, quantity = 1 } = req.body;

  const productId = Number(product_id);
  const qty = Number(quantity);

  if (
    !Number.isInteger(productId) ||
    productId <= 0 ||
    !Number.isInteger(qty) ||
    qty <= 0
  ) {
    return res.status(400).json({
      message: "Valid product_id and quantity are required",
    });
  }

  db.query(
    "SELECT product_id, price, stock_quantity FROM products WHERE product_id = ?",
    [productId],
    (error, products) => {
      if (error) {
        console.error("Product lookup failed:", error.message);
        return res.status(500).json({ message: "Server error" });
      }

      if (products.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (products[0].stock_quantity < qty) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      db.query(
        `INSERT INTO carts (user_id)
         VALUES (?)
         ON DUPLICATE KEY UPDATE cart_id = LAST_INSERT_ID(cart_id)`,
        [userId],
        (cartError, cartResult) => {
          if (cartError) {
            console.error("Cart creation failed:", cartError.message);
            return res.status(500).json({
              message: "Could not access cart",
            });
          }

          const cartId = cartResult.insertId;

          db.query(
            "SELECT quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
            [cartId, productId],
            (itemError, items) => {
              if (itemError) {
                console.error("Cart item lookup failed:", itemError.message);
                return res.status(500).json({ message: "Server error" });
              }

              const newQuantity =
                qty +
                (items.length > 0 ? Number(items[0].quantity) : 0);

              if (newQuantity > products[0].stock_quantity) {
                return res.status(400).json({
                  message: "Requested quantity exceeds available stock",
                });
              }

              const sql =
                items.length > 0
                  ? `UPDATE cart_items
                     SET quantity = ?
                     WHERE cart_id = ? AND product_id = ?`
                  : `INSERT INTO cart_items
                     (quantity, cart_id, product_id)
                     VALUES (?, ?, ?)`;

              db.query(
                sql,
                [newQuantity, cartId, productId],
                (saveError) => {
                  if (saveError) {
                    console.error(
                      "Saving cart item failed:",
                      saveError.message
                    );
                    return res.status(500).json({
                      message: "Could not add product to cart",
                    });
                  }

                  return res.status(200).json({
                    message: "Product added to cart",
                    product_id: productId,
                    quantity: newQuantity,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};

// View the logged-in customer's cart
const getCart = (req, res) => {
  const userId = req.user.user_id;

  const sql = `
    SELECT
      ci.product_id,
      p.product_name,
      p.price,
      p.image_url,
      ci.quantity,
      (p.price * ci.quantity) AS subtotal
    FROM carts c
    JOIN cart_items ci ON c.cart_id = ci.cart_id
    JOIN products p ON ci.product_id = p.product_id
    WHERE c.user_id = ?
    ORDER BY ci.cart_item_id DESC
  `;

  db.query(sql, [userId], (error, items) => {
    if (error) {
      console.error("Fetching cart failed:", error.message);
      return res.status(500).json({
        message: "Could not fetch cart",
      });
    }

    const total = items.reduce(
      (sum, item) => sum + Number(item.subtotal),
      0
    );

    return res.status(200).json({
      items,
      total: Number(total.toFixed(2)),
    });
  });
};

// Update a product quantity in the cart
const updateCartItem = (req, res) => {
  const userId = req.user.user_id;
  const productId = Number(req.params.productId);
  const quantity = Number(req.body.quantity);

  if (
    !Number.isInteger(productId) ||
    productId <= 0 ||
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {
    return res.status(400).json({
      message: "Valid product ID and positive quantity are required",
    });
  }

  const sql = `
    SELECT ci.cart_id, ci.quantity, p.stock_quantity
    FROM carts c
    JOIN cart_items ci ON c.cart_id = ci.cart_id
    JOIN products p ON ci.product_id = p.product_id
    WHERE c.user_id = ? AND ci.product_id = ?
  `;

  db.query(sql, [userId, productId], (error, items) => {
    if (error) {
      console.error("Cart item lookup failed:", error.message);
      return res.status(500).json({ message: "Server error" });
    }

    if (items.length === 0) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (quantity > items[0].stock_quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    db.query(
      `UPDATE cart_items
       SET quantity = ?
       WHERE cart_id = ? AND product_id = ?`,
      [quantity, items[0].cart_id, productId],
      (updateError) => {
        if (updateError) {
          console.error("Cart update failed:", updateError.message);
          return res.status(500).json({
            message: "Could not update cart",
          });
        }

        return res.status(200).json({
          message: "Cart quantity updated",
          product_id: productId,
          quantity,
        });
      }
    );
  });
};

// Remove a product from the logged-in customer's cart
const removeFromCart = (req, res) => {
  const userId = req.user.user_id;
  const productId = Number(req.params.productId);

  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      message: "Invalid product ID",
    });
  }

  const sql = `
    DELETE ci FROM cart_items ci
    JOIN carts c ON ci.cart_id = c.cart_id
    WHERE c.user_id = ? AND ci.product_id = ?
  `;

  db.query(sql, [userId, productId], (error, result) => {
    if (error) {
      console.error("Removing cart item failed:", error.message);
      return res.status(500).json({
        message: "Could not remove cart item",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      message: "Product removed from cart",
    });
  });
};

// Export only cart functions
module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
};