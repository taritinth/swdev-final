const { expect } = require("chai");
const request = require("supertest");
const app = require("../../app");

const mongoose = require("mongoose");
const mongoUnit = require("mongo-unit");

const mockData = require("../__mock__/data");
const token = require("../__mock__/token");

describe("applications", () => {
  before(() => mongoose.connect(process.env.MONGO_TEST_URL));
  beforeEach(() => mongoUnit.load(mockData));
  afterEach(() => mongoUnit.drop());

  it("should response status 401 unauthorized", async () => {
    const response = await request(app).get("/api/applications?status=");
    expect(response.statusCode).to.equal(401);
  });

  it("should response status 200 ok and list of applications", async () => {
    const response = await request(app)
      .get("/api/applications?status=")
      .set("Authorization", token.APPLICANT1);
    expect(response.body.length).to.equal(1);
    expect(response.statusCode).to.equal(200);
  });

  it("should response status 200 and application detail for owner (user, company)", async () => {
    const response = await request(app)
      .get("/api/applications/621fa436e634d23ac1bd7b78")
      .set("Authorization", token.APPLICANT2);
    expect(response.body._id).to.equal("621fa436e634d23ac1bd7b78");
    expect(response.statusCode).to.equal(200);
  });

  it("should response status 401 for anyone not owner (user, company)", async () => {
    const response = await request(app)
      .get("/api/applications/621f4e0ce634d23ac1bd7b3b")
      .set("Authorization", token.APPLICANT2);
    expect(response.statusCode).to.equal(401);
  });

  it("should handle applicant send valid application", async () => {
    const response = await request(app)
      .post("/api/applications")
      .set("Authorization", token.APPLICANT2)
      .send({
        job: "62091a6ea3f9106fed159b71",
        company: "620919f7a3f9106fed159b50",
      });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.eql({
      message: "Successfully, Your application has been sent to company",
      success: true,
    });
  });

  it("should handle applicant send duplicate application", async () => {
    const response = await request(app)
      .post("/api/applications")
      .set("Authorization", token.APPLICANT2)
      .send({
        job: "62091985a3f9106fed159b31",
        company: "62091715a3f9106fed159ae6",
      });
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.eql({
      message:
        "Failed, You have already applied for this job to this company before",
      success: false,
    });
  });

  it("should handle applicant who not complete their profile", async () => {
    const response = await request(app)
      .post("/api/applications")
      .set("Authorization", token.APPLICANT3)
      .send({
        job: "62091985a3f9106fed159b31",
        company: "62091715a3f9106fed159ae6",
      });
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.eql({
      message: "Warning, Please complete your profile before submit the job.",
      success: false,
    });
  });

  it("should handle update application status for owner company", async () => {
    const response = await request(app)
      .put("/api/applications/621f4e0ce634d23ac1bd7b3b")
      .set("Authorization", token.EMPLOYER1)
      .send({
        status: "hired",
      });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.eql({
      message: "Successfully, Application has updated",
      success: true,
    });
  });

  it("should handle update application status for not owner company", async () => {
    const response = await request(app)
      .put("/api/applications/621f4e0ce634d23ac1bd7b3b")
      .set("Authorization", token.EMPLOYER2)
      .send({
        status: "hired",
      });
    expect(response.statusCode).to.equal(401);
  });

  it("should handle update application with invalid application id", async () => {
    const response = await request(app)
      .put("/api/applications/_id")
      .set("Authorization", token.EMPLOYER1)
      .send({
        status: "hired",
      });
    expect(response.statusCode).to.equal(400);
  });
});
