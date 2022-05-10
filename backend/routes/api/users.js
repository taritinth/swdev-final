const express = require("express");
const router = express();
const userController = require("../../controllers/users.controller");
const { isAuth } = require("../../middleware");

router.get("/", userController.getAllUsers);
//router.delete("/", userController.deleteUser);
router.put("/", isAuth, userController.updateUser);

router.get("/:id", isAuth, userController.getUser);
//router.get("/:folder/:fileName", userController.getUserFile);

module.exports = router;
