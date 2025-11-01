const express = require("express");
const router = express.Router();
const { createSubmission } = require("../controllers/submission.controller");

router.post("/:productId", createSubmission);

module.exports = router;
