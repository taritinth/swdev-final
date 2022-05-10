const { Application } = require("../models/applications.model");
const { Job } = require("../models/jobs.model");
const { User } = require("../models/users.model");

const {
  findAllApplications,
  findApplicationById,
  findAndUpdateApplication,
} = require("../repository/applications.repository");

const getAllApps = async (req, res) => {
  const { status } = req.query;

  findAllApplications({
    status: status,
    userId: req.user.id,
  })
    .then((apps) => res.json(apps))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const getApp = async (req, res) => {
  let { id } = req.params;

  findApplicationById({ id })
    .then((apps) => res.json(apps))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const addApp = async (req, res) => {
  let { job, company } = req.body;
  let user = req.user.id;
  const check = await Application.find({
    userId: user,
    companyId: company,
    jobId: job,
    status: "pending",
  });

  if (check.length)
    return res.status(400).json({
      message:
        "Failed, You have already applied for this job to this company before",
      success: false,
    });

  const jobObj = await Job.findById(job).select("-password");
  const userObj = await User.findById(user).select("-password");
  const companyObj = await User.findById(company).select("-password");

  if (
    !userObj.fullname ||
    !userObj.email ||
    !userObj.phone ||
    !userObj.profileImg ||
    !userObj.resumeFile
  )
    return res.status(400).json({
      message: "Warning, Please complete your profile before submit the job.",
      success: false,
    });

  //   const newJob = new Job(jobObj);
  //   const newUser = new User(userObj);
  //   const newCompany = new User(companyObj);

  const newApps = new Application({
    jobId: job,
    userId: user,
    companyId: company,
    job: jobObj,
    user: userObj,
    company: companyObj,
  });
  newApps
    .save()
    .then(() =>
      res.json({
        message: "Successfully, Your application has been sent to company",
        success: true,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const updateApp = async (req, res) => {
  let { id } = req.params;
  let { status } = req.body;

  //let result = await User.where({ _id: id }).updateOne({phone})

  findAndUpdateApplication({ id, status })
    .then(() =>
      res.json({
        message: "Successfully, Application has updated",
        success: true,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = { getAllApps, getApp, addApp, updateApp };
