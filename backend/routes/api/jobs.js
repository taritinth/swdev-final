const express = require("express");
const router = express();
const jobController = require("../../controllers/jobs.controller");
const { isCompany, isAuth, isJobEmployer } = require("../../middleware");

router.get("/", jobController.getAllJobs);
router.post("/", isAuth, isCompany, jobController.addJob);
router.put("/:id", isAuth, isCompany, isJobEmployer, jobController.updateJob);
router.delete(
  "/:id",
  isAuth,
  isCompany,
  isJobEmployer,
  jobController.deleteJob
);

router.get("/announcements", isAuth, isCompany, jobController.getAnnouncements);
module.exports = router;
