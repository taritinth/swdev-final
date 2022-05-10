const { User } = require("../models/users.model");
const { filesUpload, resizeImage, uploadFile } = require("../helper");
const fs = require("fs");

const getAllUsers = async (req, res) => {
  User.find()
    //.select("email -_id type ")
    // .select({ email: 1, type: 1 })
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const getUser = async (req, res) => {
  let { id } = req.params;

  User.findById(id)
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const deleteUser = async (req, res) => {
  let { id } = req.body;
  const data = await User.findById(id).catch((err) =>
    res.status(400).json("Error: " + err)
  );

  if (data) {
    const result = await User.deleteOne({ _id: id });
    return res.json({
      success: true,
      message: "User deleted",
    });
  }

  return res.json({
    success: false,
    message: "User doesn't exist",
  });
};

const updateUser = async (req, res) => {
  filesUpload(req, res, async (err) => {
    if (err) res.status(400).json("Invalid file");
    else {
      console.log(req.files);
      let profile = req.files.profile;
      let resume = req.files.resume;
      let profileImg, resumeFile;
      if (profile) {
        profile = profile[0];
        const resized = await resizeImage(profile, req.user.id);
        resizedProfile = resized;
        profileImg = await uploadFile(resizedProfile, "profile", req.user.id);

        fs.unlink(profile.path, (err) => {
          if (err) console.log("unlinked profile_original failed");
          console.log("unlinked profile_original success");
        });
      }

      if (resume) {
        resume = resume[0];

        var typeArray = resume.mimetype.split("/");
        var fileType = typeArray.pop();
        resume.format = fileType;
        resumeFile = await uploadFile(resume, "resume", req.user.id);
      }

      //mongo db
      //console.log(req.body);
      let { fullname, phone, education, position, jobType } = req.body;
      //let result = await User.where({ _id: id }).updateOne({phone})
      let result = await User.where({ _id: req.user.id })
        .updateOne({
          fullname,
          phone,
          education,
          position,
          jobType,
          profileImg,
          resumeFile,
        })
        .then(() =>
          res.json({
            message: "User updated",
            success: true,
          })
        )
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });
};

function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString("base64");
  return base64;
}

const getUserFile = async (req, res) => {
  const fileName = req.params.fileName;
  const folder = req.params.folder;
  const data = await downloadS3(folder + "/" + fileName);

  //   res.writeHead(200, { "Content-Type": "image/webp" });
  //   res.write(data.Body, "binary");
  //   res.end(null, "binary");

  res.send(Buffer.from(data.Body).toString("base64"));
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
  getUserFile,
  getUser,
};
