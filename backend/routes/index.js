const api = require("./api");
const express = require("express");
const router = express.Router();

router.use("/api", api);

module.exports = router;
