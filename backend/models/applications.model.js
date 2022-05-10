const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    company: {
      type: Object,
      required: true,
    },
    jobId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "hired", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Application: mongoose.model("Application", applicationSchema),
};
