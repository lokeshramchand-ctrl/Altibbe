const QuestionTemplate = require("../models/questionTemplate.model");

exports.getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const template = await QuestionTemplate.findOne({ category });

    if (!template) return res.status(404).json({ error: "No template found for this category" });

    res.json(template.questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
