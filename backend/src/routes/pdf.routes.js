const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdf.controller");

// Generate category PDF
router.get("/:category/pdf", pdfController.generateSubmissionPDF);

module.exports = router;
