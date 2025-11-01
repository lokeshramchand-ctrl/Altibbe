const mongoose = require("mongoose");
const Question = require("../models/question.model");
require("dotenv").config();

const seedQuestions = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Question.deleteMany();
    console.log("🧹 Old questions cleared.");

    // Define questions
    const questions = [
      // 🌾 FOOD
      { category: "Food", questionText: "Is the product organic or pesticide-free?" },
      { category: "Food", questionText: "Does it contain any artificial preservatives or colors?" },
      { category: "Food", questionText: "Is it gluten-free, vegan, or allergen-safe?" },
      { category: "Food", questionText: "What is the source of the main ingredients?" },
      { category: "Food", questionText: "Is the packaging recyclable or biodegradable?" },
      { category: "Food", questionText: "Was it locally produced to reduce carbon footprint?" },
      { category: "Food", questionText: "Is there clear nutritional labeling on the package?" },
      { category: "Food", questionText: "Does it meet any health certification standards (FSSAI, USDA, etc.)?" },

      // ⚡ ELECTRONICS
      { category: "Electronics", questionText: "Is the product energy-efficient or certified by Energy Star?" },
      { category: "Electronics", questionText: "Does it contain hazardous substances like lead or mercury?" },
      { category: "Electronics", questionText: "Are spare parts and repair options available?" },
      { category: "Electronics", questionText: "Is the device designed for recyclability or modular upgrades?" },
      { category: "Electronics", questionText: "Was it manufactured under fair labor conditions?" },
      { category: "Electronics", questionText: "Does it have any environmental or ethical certifications?" },
      { category: "Electronics", questionText: "What is its expected lifespan or warranty period?" },
      { category: "Electronics", questionText: "Is e-waste disposal supported by the company?" },

      // 👕 CLOTHING
      { category: "Clothing", questionText: "Is the fabric sustainably sourced (organic cotton, bamboo, etc.)?" },
      { category: "Clothing", questionText: "Does the production process use eco-friendly dyes?" },
      { category: "Clothing", questionText: "Are the workers paid fair wages?" },
      { category: "Clothing", questionText: "Is the product designed for durability and long-term use?" },
      { category: "Clothing", questionText: "Does the brand support recycling or upcycling programs?" },
      { category: "Clothing", questionText: "Is the packaging plastic-free?" },
      { category: "Clothing", questionText: "Does it meet any ethical fashion certifications?" },

      // 💄 COSMETICS
      { category: "Cosmetics", questionText: "Is the product cruelty-free and not tested on animals?" },
      { category: "Cosmetics", questionText: "Does it contain parabens, sulfates, or microplastics?" },
      { category: "Cosmetics", questionText: "Is the packaging recyclable or refillable?" },
      { category: "Cosmetics", questionText: "Is the product dermatologically or clinically tested?" },
      { category: "Cosmetics", questionText: "Is it suitable for sensitive skin?" },
      { category: "Cosmetics", questionText: "Does it contain any natural or plant-based ingredients?" },
      { category: "Cosmetics", questionText: "Is it certified organic by any authority?" },
    ];

    // Insert new
    await Question.insertMany(questions);
    console.log(`✅ Seeded ${questions.length} transparency questions.`);

  } catch (err) {
    console.error("❌ Error seeding questions:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedQuestions();
