const express = require("express");
const router = express.Router();
const {
  createAssessment,
  getAssessments,
  downloadAssessmentsPdf,
} = require("../controllers/assessment.controller");

// Create assessments (expects array of {question, answer})
router.post("/", createAssessment);

// Get all assessments
router.get("/", getAssessments);

// Download all assessments as CSV
// router.get("/download", downloadAssessments);
router.get('/download-pdf', downloadAssessmentsPdf);

module.exports = router;
