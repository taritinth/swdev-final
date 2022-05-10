const { expect } = require("chai");
const mongoose = require("mongoose");
const mongoUnit = require("mongo-unit");
const { ObjectId } = require("mongoose").Types;

const {
  findAllApplications,
  findApplicationById,
  findAndUpdateApplication,
} = require("../../repository/applications.repository");

const mockData = require("../__mock__/data");

describe("apps", () => {
  before(() => mongoose.connect(process.env.MONGO_TEST_URL));
  beforeEach(() => mongoUnit.load(mockData));
  afterEach(() => mongoUnit.drop());

  it(`should find all applications of logged in user`, () =>
    findAllApplications({
      status: "",
      userId: "620948092ad991e73d2f6011",
    }).then((apps) => {
      expect(apps.length).to.equal(1);
    }));

  it(`should find applications by id`, () =>
    findApplicationById({
      id: "621f4e0ce634d23ac1bd7b3b",
    }).then((apps) => {
      expect(apps._id).to.eql(new ObjectId("621f4e0ce634d23ac1bd7b3b"));
    }));

  it(`should handle update application`, () =>
    findAndUpdateApplication({
      id: new ObjectId("621f4e0ce634d23ac1bd7b3b"),
      status: "hired",
    }).then(() => {
      findApplicationById({
        id: "621f4e0ce634d23ac1bd7b3b",
      }).then((apps) => {
        expect(apps.status).to.equal("hired");
      });
    }));
});
