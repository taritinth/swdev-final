require("dotenv").config();
const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");
const accessTokenSecret = secrets.read("JWT_SECRET") || process.env.JWT_SECRET;

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.includes("Bearer ")) {
    return res.status(401).json({
      requireAuth: true,
      message: "Invalid token",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, accessTokenSecret, async (err, user) => {
    if (err) {
      return res.status(403).json({
        message: err.message,
      });
    }
    req.user = user;
    return next();
  });
};

module.exports = { isAuth };
