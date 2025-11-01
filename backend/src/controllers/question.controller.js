const QuestionTemplate = require("../models/questionTemplate.model");
const Product = require("../models/product.model");

exports.getQuestionsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const template = await QuestionTemplate.findOne({ category: product.category });
    if (!template) return res.status(404).json({ error: "No template found for this category" });

    res.json(template.questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
