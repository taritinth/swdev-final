const mongoose = require("mongoose");

const annoucementSchema = new mongoose.Schema(
  {
    annoucement: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Annoucement: mongoose.model("Annoucement", annoucementSchema),
};
