const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  value: mongoose.Mixed,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Answer", answerSchema);
