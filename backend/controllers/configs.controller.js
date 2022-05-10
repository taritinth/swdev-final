const { Config } = require("../models/config.model");

const getConfig = async (req, res) => {
  Config.findOne()
    .then((configs) => res.json(configs))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const addConfig = async (req, res) => {
  const newConfig = new Config();
  newConfig
    .save()
    .then(() =>
      res.json({
        message: "Config added",
        success: true,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = { getConfig, addConfig };
