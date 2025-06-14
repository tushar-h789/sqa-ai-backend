const express = require("express");
const { register } = require("../controllers/auth.controller");

const router = express.Router();

// POST /register route for user registration
router.post("/register", register);

module.exports = router;
