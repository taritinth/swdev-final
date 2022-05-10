const express = require("express");
const router = express();
const appController = require("../../controllers/applications.controller");
const {
  isAuth,
  isApplicationEmployer,
  isApplicationOwner,
} = require("../../middleware");

router.get("/", isAuth, appController.getAllApps);
router.get("/:id", isAuth, isApplicationOwner, appController.getApp);
router.post("/", isAuth, appController.addApp);
router.put("/:id", isAuth, isApplicationEmployer, appController.updateApp);

module.exports = router;
