const Submission = require("../models/submission.model");
const Product = require("../models/product.model");

exports.createSubmission = async (req, res) => {
  try {
    const { productId } = req.params;
    const { answers, companyId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const submission = new Submission({
      productId,
      companyId,
      answers,
    });

    await submission.save();
    res.status(201).json({ message: "Submission saved", submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
