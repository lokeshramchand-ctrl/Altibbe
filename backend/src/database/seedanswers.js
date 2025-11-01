const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("../models/question.model");
const Answer = require("../models/answer.model");
const Product = require("../models/product.model");
const Company = require("../models/company.model");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    console.log("✅ Connected to MongoDB");

    await Answer.deleteMany();

    const questions = await Question.find();
    if (questions.length === 0) {
      console.log("⚠️ No questions found. Please seed questions first!");
      process.exit(0);
    }

    // Ensure one company exists
    let company = await Company.findOne();
    if (!company) {
      company = await Company.create({
        name: "Eco Transparency Co.",
        email: "contact@eco-transparency.com",
        password: "hashed_password_here", // if needed, dummy for seeding
      });
      console.log("🏢 Created sample company:", company.name);
    }

    // Create or find sample products for each category
    const categories = ["Food", "Electronics", "Clothing", "Cosmetics"];
    const productMap = {};

    for (const category of categories) {
      let product = await Product.findOne({ name: `${category} Sample Product` });
      if (!product) {
        product = await Product.create({
          name: `${category} Sample Product`,
          description: `A sample ${category.toLowerCase()} product for transparency.`,
          category,
          companyId: company._id, // ✅ Fix: add companyId
        });
      }
      productMap[category] = product._id;
    }

    const answers = [];

    for (const q of questions) {
      let answerText = "";

      switch (q.category) {
        case "Food":
          if (q.questionText.includes("organic")) answerText = "Yes, it’s 100% organic and pesticide-free.";
          else if (q.questionText.includes("preservatives")) answerText = "No artificial preservatives are added.";
          else if (q.questionText.includes("gluten")) answerText = "Gluten-free and vegan-friendly.";
          else if (q.questionText.includes("source")) answerText = "Ingredients sourced locally from organic farms.";
          else if (q.questionText.includes("packaging")) answerText = "Biodegradable and eco-friendly packaging.";
          else answerText = "Product follows all food transparency standards.";
          break;

        case "Electronics":
          if (q.questionText.includes("energy")) answerText = "Energy-efficient and Energy Star certified.";
          else if (q.questionText.includes("hazardous")) answerText = "No lead or mercury used.";
          else if (q.questionText.includes("spare")) answerText = "Spare parts available for 5 years.";
          else if (q.questionText.includes("recyclability")) answerText = "Device designed for recycling.";
          else if (q.questionText.includes("labor")) answerText = "Manufactured under fair labor practices.";
          else answerText = "Complies with ethical production standards.";
          break;

        case "Clothing":
          if (q.questionText.includes("fabric")) answerText = "Made from organic cotton and bamboo.";
          else if (q.questionText.includes("dyes")) answerText = "Uses eco-friendly, non-toxic dyes.";
          else if (q.questionText.includes("wages")) answerText = "Fair wages ensured for workers.";
          else answerText = "Certified ethical fashion product.";
          break;

        case "Cosmetics":
          if (q.questionText.includes("cruelty")) answerText = "Cruelty-free, not tested on animals.";
          else if (q.questionText.includes("parabens")) answerText = "No parabens or microplastics used.";
          else if (q.questionText.includes("recyclable")) answerText = "Refillable and recyclable packaging.";
          else if (q.questionText.includes("sensitive")) answerText = "Safe for all skin types.";
          else answerText = "Dermatologically tested and organic-certified.";
          break;

        default:
          answerText = "General transparency compliance verified.";
      }

      answers.push({
        productId: productMap[q.category],
        questionId: q._id,
        value: answerText,
      });
    }

    await Answer.insertMany(answers);
    console.log(`✅ Successfully seeded ${answers.length} answers.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding answers:", err);
    process.exit(1);
  }
});
