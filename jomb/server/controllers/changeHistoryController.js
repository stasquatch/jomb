const mongoose = require("mongoose");
const ChangeHistory = require("../models/changeHistory");
const Book = require("../models/book");

const addChangeHistoryToBook = async (bookId, changeDescription) => {
  const changeHistoryItem = new ChangeHistory({
    description: changeDescription
  }).save((err, changeHistoryItem) => {
    let result = Book.findByIdAndUpdate(
      bookId,
      { $push: { changeHistory: changeHistoryItem } },
      (err, book) => {
        if (err) console.error("Error saving history: ", err);
      }
    );
  });
};

module.exports = { addChangeHistoryToBook };
