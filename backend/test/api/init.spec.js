const mongoose = require("mongoose");
const mongoUnit = require("mongo-unit");

console.log = function () {};
console.error = function () {};

console.log("Waiting for mock database...");

mongoUnit.start().then(() => {
  console.log("Mock MongoDB is connected: ", mongoUnit.getUrl());
  process.env.MONGO_TEST_URL = mongoUnit.getUrl();
  console.log("NODE_ENV=", process.env.NODE_ENV);
  run();
});

after(() => {
  console.log("Disconnected from mock MongoDB");
  mongoose.disconnect();
  return mongoUnit.stop();
});
