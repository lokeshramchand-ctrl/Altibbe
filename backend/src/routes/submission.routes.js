const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submission.controller");

// Submit answers for a category
router.post("/:category", submissionController.createSubmissionByCategory);

// Get all submissions for a specific category
router.get("/:category", submissionController.getSubmissionsByCategory);

module.exports = router;
