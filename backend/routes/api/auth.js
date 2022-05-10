const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auths.controller");
const { isAuth } = require("../../middleware");

router.post("/signin", authController.authLogin);
router.post("/signup", authController.authSignup);
router.get("/me", isAuth, authController.authMe);

module.exports = router;
