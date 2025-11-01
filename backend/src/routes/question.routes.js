const express = require("express");
const Question = require("../models/question.model");
const router = express.Router();

router.get("/:category", async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.category }).sort({ step: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to load questions" });
  }
});

module.exports = router;
