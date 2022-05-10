const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    program: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Program: mongoose.model("Program", programSchema),
};
