const multer = require("multer");

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, callback) => {
    var typeArray = file.mimetype.split("/");
    var fileType = typeArray.pop();
    if (file.fieldname === "resume") {
      const acceptFile = ["pdf"];
      const isAccept = acceptFile.includes(fileType);
      callback(null, isAccept);
    } else if (file.fieldname === "profile") {
      const acceptFile = ["jpeg", "jpg", "png", "webp"];
      const isAccept = acceptFile.includes(fileType);
      callback(null, isAccept);
    }
  },
  limits: {
    fileSize: 15000000,
  },
});

let filesUpload = upload.fields([
  { name: "profile", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

module.exports = { filesUpload };
