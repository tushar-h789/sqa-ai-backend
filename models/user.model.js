const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};

const createUser = async (name, email, hashedPassword) => {
  const res = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING",
    [name, email, hashedPassword]
  );
  return res.rows[0];
};

const sendOtpForUser = async (email, options, expiry) => {
  await pool.query(
    "UPDATE  users SET otp = $1, otp_expiry = $2 WHERE email = $3",
    [otp, expiry, email]
  );
};

const verifyOtp = async (email, otp) => {
  const res = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND otp = $2 AND otp_expiry > NOW()",
    [email, otp]
  );
  return res.rows[0];
};

module.exports = { findUserByEmail, createUser, sendOtpForUser, verifyOtp };
