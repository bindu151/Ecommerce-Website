
const db = require("../config/db");

// Register a seller
const registerSeller = (req, res) => {
  const userId = req.user.user_id;
  const { store_name, phone, address } = req.body;

  if (!store_name || !store_name.trim()) {
    return res.status(400).json({
      message: "Store name is required"
    });
  }

  const sql = `
    INSERT INTO sellers
      (user_id, store_name, phone, address)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      userId,
      store_name.trim(),
      phone || null,
      address || null
    ],
    (error, result) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            message: "You already have a seller account"
          });
        }

        if (
          error.code === "ER_NO_SUCH_TABLE" ||
          error.code === "ER_BAD_FIELD_ERROR"
        ) {
          return res.status(503).json({
            message: "Seller database is not ready yet"
          });
        }

        console.error("Seller registration error:", error.message);
        return res.status(500).json({
          message: "Unable to register seller"
        });
      }

      return res.status(201).json({
        message: "Seller registration submitted successfully",
        seller: {
          seller_id: result.insertId,
          user_id: userId,
          store_name: store_name.trim(),
          phone: phone || null,
          address: address || null,
          approval_status: "PENDING"
        }
      });
    }
  );
};

// Get the logged-in user's seller profile
const getSellerProfile = (req, res) => {
  const userId = req.user.user_id;

  const sql = `
    SELECT seller_id, user_id, store_name, phone,
           address, approval_status, created_at
    FROM sellers
    WHERE user_id = ?
  `;

  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Seller profile error:", error.message);
      return res.status(500).json({
        message: "Unable to retrieve seller profile"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Seller account not found"
      });
    }

    return res.status(200).json({
      seller: results[0]
    });
  });
};

module.exports = {
  registerSeller,
  getSellerProfile
};