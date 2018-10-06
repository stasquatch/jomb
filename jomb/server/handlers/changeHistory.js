const mongoose = require("mongoose");
const ChangeHistory = require("../models/changeHistory");
const { SUCCESS, GENERAL_ERROR } = require("../models/constants");

/* 
 bookId is book._id from the book that was updated
 description is the action performed, ADD, DELETE (constants file)
 detail is the message to be logged in the UI, includes tag info if applicable
*/
exports.addChangeHistoryEvent = async (req, res) => {
  let bookId = req.changeHistoryData.bookId;
  let description = req.changeHistoryData.description;
  let detail = req.changeHistoryData.detail;

  let changeHistoryItem = new ChangeHistory({
    bookId,
    description,
    detail
  });

  await changeHistoryItem.save((err, changeHistoryItem) => {
    if (err) {
      console.error("Error saving history", err);
      return res.json({
        changeHistory: {
          errorNumber: GENERAL_ERROR,
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
