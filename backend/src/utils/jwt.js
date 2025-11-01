const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

exports.signToken = (payload) => jwt.sign(payload, secret, { expiresIn: "8h" });
exports.verifyToken = (token) => jwt.verify(token, secret);
