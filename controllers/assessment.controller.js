const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

// Create a new assessment (expects array of {question, answer})
const createAssessment = async (req, res) => {
  try {
    const { assessments } = req.body; // [{question, answer}, ...]
    if (!Array.isArray(assessments) || assessments.length === 0) {
      return res.status(400).json({ message: "No assessment data provided." });
    }
    const created = await prisma.assessment.createMany({ data: assessments });
    res
      .status(201)
      .json({ message: "Assessment(s) created.", count: created.count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating assessment.", error: error.message });
  }
};

// Get all assessments
const getAssessments = async (req, res) => {
  try {
    const assessments = await prisma.assessment.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(assessments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching assessments.", error: error.message });
  }
};

// Download all assessments as CSV
// const downloadAssessments = async (req, res) => {
//   try {
//     const assessments = await prisma.assessment.findMany();
//     if (!assessments.length)
//       return res.status(404).json({ message: "No assessments found." });
//     const parser = new Parser({
//       fields: ["id", "question", "answer", "createdAt", "updatedAt"],
//     });
//     const csv = parser.parse(assessments);
//     res.header("Content-Type", "text/csv");
//     res.attachment("assessments.csv");
//     return res.send(csv);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error downloading assessments.",
//       error: error.message,
//     });
//   }
// };
const downloadAssessmentsPdf = async (req, res) => {
  const assessments = await prisma.assessment.findMany();
  if (!assessments.length)
    return res.status(404).json({ message: "No assessments found." });

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=assessments.pdf");
  doc.pipe(res);

  doc.fontSize(18).text("Assessment List", { align: "center" });
  doc.moveDown();

  assessments.forEach((a, i) => {
    doc.fontSize(12).text(`Q${i + 1}: ${a.question}`);
    doc.fontSize(12).text(`A${i + 1}: ${a.answer}`);
    doc.moveDown();
  });

  doc.end();
};

module.exports = { createAssessment, getAssessments, downloadAssessmentsPdf };
