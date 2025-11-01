const Submission = require("../models/submission.model");
const QuestionTemplate = require("../models/questionTemplate.model");

exports.createSubmissionByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { answers } = req.body;

    if (!category) return res.status(400).json({ error: "Category required" });
    if (!answers || !Array.isArray(answers))
      return res.status(400).json({ error: "Answers must be an array" });

    // Optional: verify the category has a question template
    const template = await QuestionTemplate.findOne({ category });
    if (!template)
      return res.status(404).json({ error: "No question template found for this category" });

    const submission = new Submission({
      category,
      answers,
    });

    await submission.save();
    res.status(201).json({ message: "Submission saved successfully", submission });
  } catch (err) {
    console.error("❌ Submission error:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.getSubmissionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    console.log("📦 Fetching submissions for:", category);

    const submissions = await Submission.find({ category });

    if (!submissions.length) {
      return res.status(404).json({ message: `No submissions found for ${category}` });
    }

    res.status(200).json(submissions);
  } catch (err) {
    console.error("💥 Error in getSubmissionsByCategory:", err);
    res.status(500).json({ error: err.message });
  }
};
