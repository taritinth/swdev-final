const { Application } = require("../models/applications.model");

const isApplicationEmployer = async (req, res, next) => {
  let { id } = req.params;

  Application.findById(id)
    .then((application) => {
      if (req.user.id == application?.companyId.toString()) {
        return next();
      }
      res.status(401).send("Unauthorized");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const isApplicationOwner = async (req, res, next) => {
  let { id } = req.params;

  Application.findById(id)
    .then((application) => {
      if (req.user.id == application?.userId.toString()) {
        return next();
      }
      res.status(401).send("Unauthorized");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = {
  isApplicationEmployer,
  isApplicationOwner,
};
