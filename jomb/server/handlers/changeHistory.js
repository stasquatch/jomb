const mongoose = require("mongoose");
const ChangeHistory = require("../models/changeHistory");
const { SUCCESS } = require("../models/constants");

exports.addChangeHistoryEvent = async (req, res) => {
  let bookId = req.changeHistoryData.bookid;
  let description = req.changeHistoryData.description;
  let detail = req.changeHistoryData.detail;

  new ChangeHistory({
    bookId,
    detail,
    description
  }).save((err, changeHistoryItem) => {
    if (err) {
      console.error("Error saving history", err);
      return res.json({
        changeHistory: {
          errorNumber: 3,
          message: `Error with change history [${description}] to book`
        },
        transportToUI: req.transportToUI
      });
    }

    return res.json({
      transportToUI: req.transportToUI,
      changeHistory: {
        errorNumber: SUCCESS,
        message: "Successfully added change history event to book"
      }
    });
  });
};
