const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
    category: {
    type: String,
    required: true,
    enum: ["Electronics", "Food", "Clothing", "Other"], // optional, or make it dynamic
  },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
