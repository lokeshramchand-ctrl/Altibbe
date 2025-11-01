const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },   // e.g., Food, Electronics
  questionText: { type: String, required: true } // actual question
});

module.exports = mongoose.model("Question", questionSchema);
