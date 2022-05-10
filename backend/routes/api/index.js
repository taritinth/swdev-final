const jobs = require("./jobs");
const applications = require("./applications");
const users = require("./users");
const auth = require("./auth");
const config = require("./config");
const express = require("express");
const router = express.Router();

// USE ROUTE HERE
router.use("/auth", auth);
router.use("/jobs", jobs);
router.use("/applications", applications);
router.use("/users", users);
router.use("/configs", config);

module.exports = router;
