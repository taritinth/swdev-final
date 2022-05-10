const jwt = require("jsonwebtoken");
require("dotenv").config();
const secrets = require("../config/secrets");

const secretKey = secrets.read("JWT_SECRET") || process.env.JWT_SECRET;

const generateToken = (data) => {
  return jwt.sign(data, secretKey);
};

module.exports = { generateToken };
