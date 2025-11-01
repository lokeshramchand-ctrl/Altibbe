const express = require("express");
const router = express.Router();
const { getQuestionsByCategory } = require("../controllers/question.controller");

router.get("/:category", getQuestionsByCategory);

module.exports = router;
