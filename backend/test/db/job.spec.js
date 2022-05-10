const { expect } = require("chai");
const mongoose = require("mongoose");
const mongoUnit = require("mongo-unit");

const mockData = require("../__mock__/data");
const { findAllJobs } = require("../../repository/jobs.repository");

describe("jobs", () => {
  before(() => mongoose.connect(process.env.MONGO_TEST_URL));
  beforeEach(() => mongoUnit.load(mockData));
  afterEach(() => mongoUnit.drop());

  it(`should handle undefined query value`, () => {
    return findAllJobs({
      title: undefined,
      type: undefined,
    }).then((jobs) => {
      expect(jobs.length).to.equal(3);
    });
  });

  it(`should handle null query value`, () => {
    return findAllJobs({
      title: null,
      type: null,
    }).then((jobs) => {
      expect(jobs.length).to.equal(0);
    });
  });

  it(`should handle NaN query value`, () => {
    return findAllJobs({
      title: NaN,
      type: NaN,
    }).then((jobs) => {
      expect(jobs.length).to.equal(0);
    });
  });

  it("should find all jobs", () => {
    return findAllJobs({
      title: "",
      type: "",
    }).then((jobs) => {
      expect(jobs.length).to.equal(3);
    });
  });

  it(`should find only "internship" jobs`, () => {
    return findAllJobs({
      title: "",
      type: "internship",
    }).then((jobs) => {
      expect(jobs.length).to.equal(1);
    });
  });

  it(`should find only "parttime" jobs`, () => {
    return findAllJobs({
      title: "",
      type: "parttime",
    }).then((jobs) => {
      expect(jobs.length).to.equal(1);
    });
  });

  it(`should find only "fulltime" jobs`, () => {
    return findAllJobs({
      title: "",
      type: "fulltime",
    }).then((jobs) => {
      expect(jobs.length).to.equal(1);
    });
  });
});
