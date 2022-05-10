const mongoose = require("mongoose");
const configSchema = new mongoose.Schema(
  {
    home: {
      type: Boolean,
      required: true,
      default: true,
    },
    applicationsList: {
      type: Boolean,
      required: true,
      default: true,
    },
    companySignup: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Config: mongoose.model("Config", configSchema),
};
