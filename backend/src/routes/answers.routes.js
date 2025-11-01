const express = require("express");
const Answer = require("../models/Answer");
const router = express.Router();

// Save multiple answers for a product
router.post("/", async (req, res) => {
  try {
    const { productId, answers } = req.body;

    if (!productId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    // remove previous answers for that product (in case of re-submission)
    await Answer.deleteMany({ productId });

    // insert all answers
    const saved = await Answer.insertMany(
      answers.map((a) => ({
        productId,
        questionId: a.questionId,
        value: a.value,
      }))
    );

    res.json({ message: "✅ Answers saved successfully", saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to save answers" });
  }
});

// Get answers for a specific product
router.get("/:productId", async (req, res) => {
  try {
    const answers = await Answer.find({ productId: req.params.productId }).populate("questionId");
    res.json(answers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to fetch answers" });
  }
});

module.exports = router;
