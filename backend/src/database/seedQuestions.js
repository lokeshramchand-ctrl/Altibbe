/**
 * Seed script for inserting question templates into MongoDB.
 * Run this ONCE to populate initial question templates.
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const QuestionTemplate = require("../models/questionTemplate.model");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/altibbe";

const templates = [
  {
    category: "Electronics",
    questions: [
      { text: "What is the power rating?", type: "text" },
      { text: "Does it have a warranty?", type: "boolean" },
      {
        text: "Energy efficiency rating?",
        type: "select",
        options: ["A", "B", "C", "D"],
      },
      {
        text: "Does it contain hazardous materials?",
        type: "boolean",
      },
      {
        text: "Expected lifespan (in years)?",
        type: "number",
      },
    ],
  },
  {
    category: "Food",
    questions: [
      { text: "Is it organic?", type: "boolean" },
      { text: "What is the expiry date?", type: "text" },
      { text: "List main ingredients", type: "text" },
      {
        text: "Does it contain allergens?",
        type: "select",
        options: ["Yes", "No", "Unsure"],
      },
      {
        text: "Country of origin",
        type: "text",
      },
    ],
  },
  {
    category: "Clothing",
    questions: [
      { text: "What material is it made of?", type: "text" },
      { text: "Is it machine washable?", type: "boolean" },
      { text: "Was it ethically produced?", type: "boolean" },
      {
        text: "Available sizes",
        type: "select",
        options: ["S", "M", "L", "XL"],
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await QuestionTemplate.deleteMany({});
    console.log("🧹 Cleared old templates");

    await QuestionTemplate.insertMany(templates);
    console.log("🌱 Inserted new question templates");

    mongoose.connection.close();
    console.log("✅ Seeding completed and connection closed");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
};

seed();
