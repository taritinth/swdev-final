const { uploadS3 } = require("./s3");
const sharp = require("sharp");
const fs = require("fs");

const uploadFile = async (file, folder, userId) => {
  if (file) {
    file_type = file.format;
    //s3_path = folder + "/" + userId + "_" + folder + "." + file_type;
    s3_path = `${folder}/${userId}_${Date.now()}.${file_type}`;
    result = await uploadS3(file, s3_path);
    console.log(`upload '${folder}' to S3 completed`);

    fs.unlink(file.path, (err) => {
      if (err) console.log(`${file.path} - ${folder} unlinked failed`);
      console.log(`${file.path} - ${folder} unlinked success`);
    });
    return result.Location;
    //return userId + "_" + folder + "." + file_type;
  }
  return null;
};

const resizeImage = async (profile, userId) => {
  //const data = await sharp(profile.path).metadata();
  const resized = await sharp(profile.path)
    .resize(1024, 1024, {
      fit: sharp.fit.inside,
    })
    .webp({ quality: 90 })
    .toFile(profile.path + ".webp");
  console.log("resizedImg completed");
  resized.path = profile.path + ".webp";
  return resized;
};

module.exports = { uploadFile, resizeImage };
