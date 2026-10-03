
const db = require("../config/db");

// Create a payment record for an order
const createPayment = (req, res) => {
  const userId = req.user.user_id;
  const { order_id, payment_method } = req.body;

  const allowedMethods = ["UPI", "CARD", "NET_BANKING", "COD"];

  if (!order_id || !Number.isInteger(Number(order_id)) ||
      Number(order_id) <= 0) {
    return res.status(400).json({
      message: "A valid order_id is required"
    });
  }

  if (!allowedMethods.includes(payment_method)) {
    return res.status(400).json({
      message: "Payment method must be UPI, CARD, NET_BANKING, or COD"
    });
  }

  // Get the order amount from the database.
  // Never trust an amount sent by the frontend.
  const orderSql = `
    SELECT order_id, user_id, total_amount, status
    FROM orders
    WHERE order_id = ? AND user_id = ?
  `;

  db.query(orderSql, [Number(order_id), userId], (orderError, orders) => {
    if (orderError) {
      console.error("Order lookup failed:", orderError.message);
      return res.status(500).json({
        message: "Unable to verify order"
      });
    }

    if (orders.length === 0) {
      return res.status(404).json({
        message: "Order not found for this user"
      });
    }

    const order = orders[0];

    if (order.status === "CANCELLED") {
      return res.status(400).json({
        message: "Payment cannot be created for a cancelled order"
      });
    }

    const paymentSql = `
      INSERT INTO payments
        (order_id, payment_method, amount, payment_status)
      VALUES (?, ?, ?, 'PENDING')
    `;

    db.query(
      paymentSql,
      [order.order_id, payment_method, order.total_amount],
      (paymentError, result) => {
        if (paymentError) {
          console.error("Payment creation failed:", paymentError.message);
          return res.status(500).json({
            message: "Unable to create payment record"
          });
        }

        return res.status(201).json({
          message: "Payment record created with pending status",
          payment: {
            payment_id: result.insertId,
            order_id: order.order_id,
            payment_method,
            amount: order.total_amount,
            payment_status: "PENDING"
          }
        });
      }
    );
  });
};

// Get payments for the logged-in user's orders
const getMyPayments = (req, res) => {
  const userId = req.user.user_id;

  const sql = `
    SELECT p.payment_id, p.order_id, p.payment_method,
           p.amount, p.payment_status, p.transaction_reference,
           p.created_at, p.updated_at
    FROM payments p
    INNER JOIN orders o ON o.order_id = p.order_id
    WHERE o.user_id = ?
    ORDER BY p.created_at DESC
  `;

  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Payment history failed:", error.message);
      return res.status(500).json({
        message: "Unable to retrieve payment history"
      });
    }

    return res.status(200).json({
      payments: results
    });
  });
};

module.exports = {
  createPayment,
  getMyPayments
};