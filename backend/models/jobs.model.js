const mongoose = require("mongoose");
const { User } = require("./users.model");
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: User,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    overview: {
      type: String,
      required: true,
      maxlenght: 255,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["internship", "fulltime", "parttime"],
      default: "fulltime",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    salary: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Job: mongoose.model("Job", jobSchema),
};
