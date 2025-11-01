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

    // Clean existing data
    await Answer.deleteMany();
    await Product.deleteMany();

    const questions = await Question.find();
    if (questions.length === 0) {
      console.log("⚠️ No questions found. Please seed questions first!");
      process.exit(0);
    }

    // Ensure company exists
    let company = await Company.findOne();
    if (!company) {
      company = await Company.create({
        name: "Eco Transparency Co.",
        email: "contact@eco-transparency.com",
        password: "hashed_password_here",
      });
      console.log("🏢 Created company:", company.name);
    }

    // Define categories to seed
    const categories = ["Food", "Electronics", "Cosmetics"];
    const products = [];

    // Create 3 products for each category
    for (const category of categories) {
      for (let i = 1; i <= 3; i++) {
        const product = await Product.create({
          name: `${category} Product ${i}`,
          description: `Sample ${category.toLowerCase()} product number ${i} to test transparency.`,
          category,
          companyId: company._id,
        });
        products.push(product);
      }
    }

    console.log(`📦 Created ${products.length} sample products.`);

    const answers = [];

    // Generate answers for each product based on its category
    for (const product of products) {
      const productQuestions = questions.filter(
        (q) => q.category === product.category
      );

      for (const q of productQuestions) {
        let answerText = "";

        // Slight randomization for realism
        const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

        switch (product.category) {
          case "Food":
            answerText = randomChoice([
              "Yes, it’s 100% organic and pesticide-free.",
              "No artificial preservatives or colors added.",
              "Locally sourced ingredients and recyclable packaging.",
              "Certified by FSSAI for quality and safety.",
            ]);
            break;

          case "Electronics":
            answerText = randomChoice([
              "Energy Star certified and designed for recyclability.",
              "Free from hazardous materials like lead or mercury.",
              "Includes repair options and modular upgrades.",
              "Produced under ethical labor conditions.",
            ]);
            break;

          case "Cosmetics":
            answerText = randomChoice([
              "Cruelty-free and not tested on animals.",
              "No parabens, sulfates, or microplastics.",
              "Recyclable and refillable packaging.",
              "Dermatologically tested and safe for sensitive skin.",
            ]);
            break;

          default:
            answerText = "General transparency standards met.";
        }

        answers.push({
          productId: product._id,
          questionId: q._id,
          value: answerText,
        });
      }
    }

    await Answer.insertMany(answers);
    console.log(`✅ Seeded ${answers.length} transparency answers.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding answers:", err);
    process.exit(1);
  }
});
