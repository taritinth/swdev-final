const announcements = require("./announcements");
const express = require("express");
const router = express.Router();

// USE ROUTE HERE
router.use("/announcements", announcements);

module.exports = router;
