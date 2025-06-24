const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const router = express.Router();

// POST /register route for user registration
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("reset-password", resetPassword);

module.exports = router;
