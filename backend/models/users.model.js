const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlenght: 100,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      maxlenght: 12,
      trim: true,
      default: null,
    },
    profileImg: {
      type: String,
      trim: true,
    },
    resumeFile: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["company", "user"],
      default: "user",
    },
    website: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    }, // For Normal User
    education: {
      type: String,
      default: "",
    }, // For Normal User
    jobType: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  User: mongoose.model("User", userSchema),
};
