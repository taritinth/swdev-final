const { Announcement } = require("../models/announcement.model");
const { findAnnouncements } = require("../repository/announcement.repository");

const getAllJobs = async (req, res) => {
  let { query, type } = req.query;

  findAllJobs({
    title: query,
    type: type,
  })
    .then((jobs) => res.json(jobs))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const getAnnouncements = async (req, res) => {
  let user = req.user.id;
  Job.find({ company: user })
    .populate("company", "-password")
    .sort({ createdAt: -1 })
    .then((jobs) => res.json(jobs))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = { getAllJobs, getAnnouncements };
