
const db = require("../config/db");

// Place an order using the logged-in customer's cart
const placeOrder = (req, res) => {
  const userId = req.user.user_id;
  const { shipping_address } = req.body;

  if (
    typeof shipping_address !== "string" ||
    !shipping_address.trim()
  ) {
    return res.status(400).json({
      message: "Shipping address is required",
    });
  }

  // Start a database transaction
  db.beginTransaction((transactionError) => {
    if (transactionError) {
      console.error(transactionError.message);
      return res.status(500).json({
        message: "Could not start order transaction",
      });
    }

    // Lock this customer's cart rows while processing the order
    const cartSql = `
      SELECT
        c.cart_id,
        ci.product_id,
        ci.quantity,
        p.product_name,
        p.price,
        p.stock_quantity
      FROM carts c
      JOIN cart_items ci ON c.cart_id = ci.cart_id
      JOIN products p ON ci.product_id = p.product_id
      WHERE c.user_id = ?
      FOR UPDATE
    `;

    db.query(cartSql, [userId], (cartError, items) => {
      if (cartError) {
        return rollback("Could not read cart", cartError);
      }

      if (items.length === 0) {
        return rollback("Your cart is empty", null, 400);
      }

      // Check stock and calculate total on the server
      let total = 0;

      for (const item of items) {
        if (
          !Number.isInteger(Number(item.quantity)) ||
          Number(item.quantity) <= 0 ||
          Number(item.stock_quantity) < Number(item.quantity)
        ) {
          return rollback(
            `Insufficient stock for ${item.product_name}`,
            null,
            400
          );
        }

        total += Number(item.price) * Number(item.quantity);
      }

      total = Number(total.toFixed(2));

      // Save the order
      db.query(
        `INSERT INTO orders
         (user_id, total_amount, status, shipping_address)
         VALUES (?, ?, 'PENDING', ?)`,
        [userId, total, shipping_address.trim()],
        (orderError, orderResult) => {
          if (orderError) {
            return rollback("Could not create order", orderError);
          }

          const orderId = orderResult.insertId;
          let index = 0;

          // Save each product in order_items
          const saveNextItem = () => {
            if (index >= items.length) {
              return reduceStock();
            }

            const item = items[index++];

            db.query(
              `INSERT INTO order_items
               (order_id, product_id, quantity, price)
               VALUES (?, ?, ?, ?)`,
              [
                orderId,
                item.product_id,
                item.quantity,
                item.price,
              ],
              (itemError) => {
                if (itemError) {
                  return rollback(
                    "Could not save order items",
                    itemError
                  );
                }

                saveNextItem();
              }
            );
          };

          // Reduce stock only if enough stock remains
          const reduceStock = () => {
            let stockIndex = 0;

            const updateNextStock = () => {
              if (stockIndex >= items.length) {
                return clearCart();
              }

              const item = items[stockIndex++];

              db.query(
                `UPDATE products
                 SET stock_quantity = stock_quantity - ?
                 WHERE product_id = ? AND stock_quantity >= ?`,
                [
                  item.quantity,
                  item.product_id,
                  item.quantity,
                ],
                (stockError, stockResult) => {
                  if (stockError) {
                    return rollback("Could not update stock", stockError);
                  }

                  if (stockResult.affectedRows !== 1) {
                    return rollback(
                      `Insufficient stock for ${item.product_name}`,
                      null,
                      400
                    );
                  }

                  updateNextStock();
                }
              );
            };

            updateNextStock();
          };

          // Clear cart items after order and stock updates succeed
          const clearCart = () => {
            db.query(
              `DELETE ci FROM cart_items ci
               JOIN carts c ON ci.cart_id = c.cart_id
               WHERE c.user_id = ?`,
              [userId],
              (clearError) => {
                if (clearError) {
                  return rollback("Could not clear cart", clearError);
                }

                db.commit((commitError) => {
                  if (commitError) {
                    return rollback("Could not finalize order", commitError);
                  }

                  return res.status(201).json({
                    message: "Order placed successfully",
                    order_id: orderId,
                    total_amount: total,
                    status: "PENDING",
                  });
                });
              }
            );
          };

          saveNextItem();
        }
      );
    });

    function rollback(message, error, statusCode = 500) {
      if (error) {
        console.error(message + ":", error.message);
      }

      db.rollback(() => {
        return res.status(statusCode).json({ message });
      });
    }
  });
};


const getMyOrders = (req, res) => {
  const userId = req.user.user_id;

  const sql = `
    SELECT
      order_id,
      total_amount,
      status,
      shipping_address,
      created_at
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (error, orders) => {
    if (error) {
      console.error("Fetching orders failed:", error.message);

      return res.status(500).json({
        message: "Could not fetch your orders",
      });
    }

    return res.status(200).json({ orders });
  });
};


const getOrderDetails = (req, res) => {
  const userId = req.user.user_id;
  const orderId = Number(req.params.orderId);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({
      message: "Invalid order ID",
    });
  }

  const sql = `
    SELECT
      o.order_id,
      o.total_amount,
      o.status,
      o.shipping_address,
      o.created_at,
      oi.product_id,
      p.product_name,
      oi.quantity,
      oi.price,
      (oi.quantity * oi.price) AS subtotal
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    WHERE o.order_id = ? AND o.user_id = ?
  `;

  db.query(sql, [orderId, userId], (error, items) => {
    if (error) {
      console.error("Fetching order details failed:", error.message);

      return res.status(500).json({
        message: "Could not fetch order details",
      });
    }

    if (items.length === 0) {
      return res.status(404).json({
        message: "Order not found or has no items",
      });
    }

    const firstItem = items[0];

    return res.status(200).json({
      order: {
        order_id: firstItem.order_id,
        total_amount: firstItem.total_amount,
        status: firstItem.status,
        shipping_address: firstItem.shipping_address,
        created_at: firstItem.created_at,
        items: items.map((item) => ({
          product_id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal,
        })),
      },
    });
  });
};


const cancelOrder = (req, res) => {
  const userId = req.user.user_id;
  const orderId = Number(req.params.orderId);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({
      message: "Invalid order ID",
    });
  }

  db.beginTransaction((transactionError) => {
    if (transactionError) {
      return res.status(500).json({
        message: "Could not start cancellation",
      });
    }

    const rollback = (statusCode, message) => {
      return db.rollback(() => {
        res.status(statusCode).json({ message });
      });
    };

    const orderSql = `
      SELECT order_id, status
      FROM orders
      WHERE order_id = ? AND user_id = ?
      FOR UPDATE
    `;

    db.query(orderSql, [orderId, userId], (error, orders) => {
      if (error) {
        return rollback(500, "Could not fetch order");
      }

      if (orders.length === 0) {
        return rollback(404, "Order not found");
      }

      if (orders[0].status !== "PENDING") {
        return rollback(400, "Only pending orders can be cancelled");
      }

      const itemsSql = `
        SELECT product_id, quantity
        FROM order_items
        WHERE order_id = ?
      `;

      db.query(itemsSql, [orderId], (itemsError, items) => {
        if (itemsError) {
          return rollback(500, "Could not fetch order items");
        }

        if (items.length === 0) {
          return rollback(400, "Order has no items");
        }

        let index = 0;

        const restoreNextProduct = () => {
          if (index >= items.length) {
            const updateSql = `
              UPDATE orders
              SET status = 'CANCELLED'
              WHERE order_id = ? AND user_id = ?
                AND status = 'PENDING'
            `;

            return db.query(
              updateSql,
              [orderId, userId],
              (updateError, result) => {
                if (updateError) {
                  return rollback(500, "Could not cancel order");
                }

                if (result.affectedRows !== 1) {
                  return rollback(400, "Order status changed");
                }

                db.commit((commitError) => {
                  if (commitError) {
                    return db.rollback(() => {
                      res.status(500).json({
                        message: "Could not complete cancellation",
                      });
                    });
                  }

                  return res.status(200).json({
                    message: "Order cancelled successfully",
                    order_id: orderId,
                    status: "CANCELLED",
                  });
                });
              }
            );
          }

          const item = items[index];

          db.query(
            `UPDATE products
             SET stock_quantity = stock_quantity + ?
             WHERE product_id = ?`,
            [item.quantity, item.product_id],
            (stockError, result) => {
              if (stockError) {
                return rollback(500, "Could not restore product stock");
              }

              if (result.affectedRows !== 1) {
                return rollback(400, "Product not found");
              }

              index++;
              restoreNextProduct();
            }
          );
        };

        restoreNextProduct();
      });
    });
  });
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderDetails,
  cancelOrder,
};