require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const assessmentRoutes = require("./routes/assessment.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/assessments", assessmentRoutes);

console.log("DATABASE_URL:", process.env.DATABASE_URL);

module.exports = app;
