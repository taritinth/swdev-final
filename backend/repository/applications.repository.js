const { Application } = require("../models/applications.model");
const { ObjectId } = require("mongoose").Types;

const findAllApplications = ({ status, userId }) =>
  Application.find({
    $or: [
      {
        companyId: new ObjectId(userId),
      },
      {
        userId: new ObjectId(userId),
      },
    ],
    $and: [{ status: new RegExp(status, "i") }],
  })
    .populate("job")
    .populate("company", "-password -createdAt -updatedAt")
    .populate("user", "-password -createdAt -updatedAt")
    .sort({ createdAt: -1 });

const findApplicationById = ({ id }) =>
  Application.findById(id)
    .populate("job")
    .populate("company", "-password -createdAt -updatedAt")
    .populate("user", "-password -createdAt -updatedAt");

const findAndUpdateApplication = ({ id, status }) =>
  Application.where({ _id: id }).updateOne({
    status,
  });

module.exports = {
  findAllApplications,
  findApplicationById,
  findAndUpdateApplication,
};
