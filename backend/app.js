const express = require("express");
const app = express();
const { logger } = require("./middleware");
const { connectRealDB } = require("./config/database");

const PORT = process.env.PORT || 8081;

const router = require("./routes");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger);
app.use(router);

app.get("/", (req, res) => {
  res.send("OK");
});

console.log("NODE_ENV=", process.env.NODE_ENV);

connectRealDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});

module.exports = app;
