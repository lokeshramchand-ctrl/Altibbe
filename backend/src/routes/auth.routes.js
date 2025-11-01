const express = require("express");
const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/jwt");
const Company = require("../models/company.model");
const User = require("../models/user.model");

const router = express.Router();

// Register company + admin
router.post("/register", async (req, res) => {
  try {
    const { companyName, email, password, name } = req.body;

    if (!companyName || !email || !password)
      return res.status(400).json({ error: "Missing required fields" });

    const company = await Company.create({ name: companyName });
    const user = await User.create({
      email,
      password,
      name,
      role: "admin",
      companyId: company._id
    });

    const token = signToken({
      userId: user._id,
      companyId: company._id,
      role: user.role
    });

    res.json({ token, company, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("companyId");
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = signToken({
    userId: user._id,
    companyId: user.companyId,
    role: user.role
  });

  res.json({
    token,
    user: { id: user._id, email: user.email, name: user.name },
    company: { id: user.companyId._id, name: user.companyId.name }
  });
});

module.exports = router;
