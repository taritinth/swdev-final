const mongoose = require("mongoose");
const secrets = require("./secrets");

const connectRealDB = () =>
  new Promise((resolve, reject) => {
    try {
      mongoose.connect(
        secrets.read("ATLAS_URI") ||
          "mongodb+srv://root:1234@cluster0.2456c.mongodb.net/swdev-db?retryWrites=true&w=majority"
      );
      mongoose.connection.once("open", () => {
        console.log("MongoDB connection established successfully");
        resolve();
      });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });

module.exports = { connectRealDB };
