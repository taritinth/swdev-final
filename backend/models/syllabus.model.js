const mongoose = require("mongoose");

const syllabusSchema = new mongoose.Schema(
  {
    syllabus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Syllabus: mongoose.model("Syllabus", syllabusSchema),
};
