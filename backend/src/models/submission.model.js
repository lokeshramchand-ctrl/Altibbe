const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  answers: [
    {
      question: String,
      answer: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", submissionSchema);
