const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const { getMe } = require("../controllers/me.controller");

// GET /api/me - get current user info
router.get("/", validateToken, getMe);

module.exports = router;
