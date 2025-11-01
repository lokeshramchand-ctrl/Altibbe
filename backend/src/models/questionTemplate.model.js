const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ["text", "number", "select", "boolean"], default: "text" },
  options: [String], // for select type
  condition: {
    field: String, // optional — show this only if another answer matches
    value: mongoose.Schema.Types.Mixed,
  },
});

const questionTemplateSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  questions: [questionSchema],
});

module.exports = mongoose.model("QuestionTemplate", questionTemplateSchema);
