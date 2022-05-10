const { Announcement } = require("../models/announcement.model");

const findAnnouncements = ({ title, type }) =>
  Announcement.find({
    $or: [
      {
        title: new RegExp(title, "i"),
        type: new RegExp(type, "i"),
      },
    ],
  })
    .populate("company", "-password")
    .sort({ createdAt: -1 });

module.exports = {
  findAnnouncements,
};
