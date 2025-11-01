const express = require("express");
const router = express.Router();
const { getQuestionsByProduct } = require("../controllers/question.controller");

router.get("/:productId", getQuestionsByProduct);

module.exports = router;
