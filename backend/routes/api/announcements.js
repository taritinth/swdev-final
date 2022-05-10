const express = require("express");
const router = express();
const announcementController = require("../../controllers/announcement.controller");

router.get("/", announcementController.getAnnouncements);

module.exports = router;
