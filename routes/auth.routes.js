const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  otpVerify,
  resendOtp,
  logout,
} = require("../controllers/auth.controller");

// POST /register route for user registration
router.post("/register", register);
router.post("/verify-otp", otpVerify);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("reset-password", resetPassword);

module.exports = router;
