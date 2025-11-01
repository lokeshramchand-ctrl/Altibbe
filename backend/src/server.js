require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const questionRoutes = require("./routes/question.routes");
const submissionRoutes =  require("./routes/submission.routes");
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/submissions", submissionRoutes);



app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
