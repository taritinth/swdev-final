const chai = require("chai");
const expect = chai.expect;
const spies = require("chai-spies");

const request = require("supertest");
const app = require("../../app");

const mongoose = require("mongoose");
const mongoUnit = require("mongo-unit");

const mockData = require("../__mock__/data");
const token = require("../__mock__/token");

chai.use(spies);

const methods = {
  add: (a, b) => a + b,
};

describe("user", () => {
  before(() => mongoose.connect(process.env.MONGO_TEST_URL));
  beforeEach(() => mongoUnit.load(mockData));
  afterEach(() => mongoUnit.drop());

  it("should mock return value of function", async () => {
    chai.spy.on(methods, "add", () => 6);
    expect(methods.add(7, 5)).to.equal(6);
  });
});
