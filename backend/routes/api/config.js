const express = require("express");
const router = express();
const configController = require("../../controllers/configs.controller");

router.get("/", configController.getConfig);
//router.post("/", configController.addConfig);

module.exports = router;
