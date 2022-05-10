// IMPORT HELPER HERE
const auth = require("./auth");
const multer = require("./multer");
const s3 = require("./s3");
const file = require("./file");

module.exports = { ...auth, ...multer, ...s3, ...file }; // EXPORT USING SPREAD SYNTAX
