const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();

const router = express();
router.use(cors());
router.use(express.json());

router.use("/api/v1/auth", authRoutes);

// Global error handler
router.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
router.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
