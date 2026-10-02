
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new customer
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check whether all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Basic password validation
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters",
      });
    }

    // Check whether the email already exists
    db.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          console.error("Registration query failed:", error.message);
          return res.status(500).json({
            message: "Server error during registration",
          });
        }

        if (results.length > 0) {
          return res.status(409).json({
            message: "Email is already registered",
          });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert a customer account into the existing users table
        db.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          [name.trim(), email.trim().toLowerCase(), hashedPassword, "CUSTOMER"],
          (insertError, result) => {
            if (insertError) {
              console.error("User creation failed:", insertError.message);
              return res.status(500).json({
                message: "Could not create account",
              });
            }

            return res.status(201).json({
              message: "Registration successful",
              user: {
                user_id: result.insertId,
                name: name.trim(),
                email: email.trim().toLowerCase(),
                role: "CUSTOMER",
              },
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Registration failed:", error.message);
    return res.status(500).json({
      message: "Server error during registration",
    });
  }
};

// Login an existing customer or admin
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  db.query(
    "SELECT user_id, name, email, password, role FROM users WHERE email = ?",
    [email.trim().toLowerCase()],
    async (error, results) => {
      if (error) {
        console.error("Login query failed:", error.message);
        return res.status(500).json({
          message: "Server error during login",
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const user = results[0];

      try {
        const passwordMatches = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatches) {
          return res.status(401).json({
            message: "Invalid email or password",
          });
        }

        if (!process.env.JWT_SECRET) {
          console.error("JWT_SECRET is missing from the environment");
          return res.status(500).json({
            message: "Authentication is not configured",
          });
        }

        const token = jwt.sign(
          {
            user_id: user.user_id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );

        return res.status(200).json({
          message: "Login successful",
          token,
          user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } catch (compareError) {
        console.error("Password verification failed:", compareError.message);
        return res.status(500).json({
          message: "Server error during login",
        });
      }
    }
  );
};

module.exports = { register, login };