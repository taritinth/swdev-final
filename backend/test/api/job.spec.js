const { expect } = require("chai");
const request = require("supertest");
const app = require("../../app");
const _sum = require("../../controllers/sum.js");

const mongoose = require("mongoose");
const mongoUnit = require("mongo-unit");

const mockData = require("../__mock__/data");

describe("jobs", () => {
  before(() => mongoose.connect(process.env.MONGO_TEST_URL));
  beforeEach(() => mongoUnit.load(mockData));
  afterEach(() => mongoUnit.drop());

  it("should response status 200 and all jobs ", async () => {
    const response = await request(app).get("/api/jobs/?query=&type=");
    expect(response.body.length).to.equal(3);
    expect(response.statusCode).to.equal(200);
  });

  it("should response status 200 and only internship jobs ", async () => {
    const response = await request(app).get(
      "/api/jobs/?query=&type=internship"
    );
    expect(response.body[0].type).to.equal("internship");
    expect(response.statusCode).to.equal(200);
  });

  it("should response status 200 and only parttime jobs ", async () => {
    const response = await request(app).get("/api/jobs/?query=&type=parttime");
    expect(response.body[0].type).to.equal("parttime");
    expect(response.statusCode).to.equal(200);
  });

  it("should response status 200 and only fulltime jobs ", async () => {
    const response = await request(app).get("/api/jobs/?query=&type=fulltime");
    expect(response.body[0].type).to.equal("fulltime");
    expect(response.statusCode).to.equal(200);
  });

  it("adds 1 + 2 to equal 3", () => {
    expect(_sum.add(1, 2)).to.equal(3);
  });
});
