const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    faculty: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Faculty: mongoose.model("Faculty", facultySchema),
};
