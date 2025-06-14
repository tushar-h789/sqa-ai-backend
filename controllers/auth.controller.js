const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser } = require("../models/user.model");  // Correct import
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const checkQuery = `SELECT * FROM users WHERE email = $1`;
    const checkResult = await db.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP for email verification
    const otp = generateOTP();

    // Create new user in PostgreSQL using the correct query and function
    const newUser = await createUser(name, email, hashedPassword, otp);

    // Send OTP via email to the user
    await sendEmail(email, "Verify your email", `Your OTP is: ${otp}`);

    // Respond with a success message
    res.status(201).json({
      message: "User registered successfully. OTP sent to your email",
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
