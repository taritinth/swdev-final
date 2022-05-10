const mongoose = require("mongoose");

const applicationRoundSchema = new mongoose.Schema(
  {
    applicationRound: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  ApplicationRound: mongoose.model("ApplicationRound", applicationRoundSchema),
};
