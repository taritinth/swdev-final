const { Job } = require("../models/jobs.model");
const { findAllJobs } = require("../repository/jobs.repository");

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

const addJob = async (req, res) => {
  let { title, overview, description, type, dueDate, salary } = req.body;
  let company = req.user.id;

  const newJob = new Job({
    company,
    title,
    overview,
    description,
    type,
    dueDate,
    salary,
  });
  newJob
    .save()
    .then(() =>
      res.json({
        message: "Successfully, New job has been added",
        success: true,
      })
    )
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

const updateJob = async (req, res) => {
  let { status, title, overview, description, type, dueDate, salary } =
    req.body;
  let id = req.params.id;
  Job.where({ _id: id })
    .updateOne({
      title,
      overview,
      description,
      type,
      dueDate,
      salary,
      status,
    })
    .then(() =>
      res.json({
        message: "Job updated",
        success: true,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const deleteJob = async (req, res) => {
  let id = req.params.id;
  const data = await Job.findById(id).catch((err) =>
    res.status(400).json("Error: " + err)
  );

  if (data) {
    const result = await Job.deleteOne({ _id: id });
    return res.json({
      message: "Job deleted",
      success: true,
    });
  }

  return res.json({
    message: "Job doesn't exist",
    success: true,
  });
};

module.exports = { getAllJobs, addJob, getAnnouncements, updateJob, deleteJob };
