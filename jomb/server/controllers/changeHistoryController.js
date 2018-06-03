const mongoose = require("mongoose");
const ChangeHistory = require("../models/changeHistory");
const Book = require("../models/book");

exports.addChangeHistoryToBook = async (bookId, changeDescription) => {
  const changeHistoryItem = new ChangeHistory({
    description: changeDescription,
    bookId
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

exports.getAllChanges = async (req, res) => {
  const changes = ChangeHistory.find({}, (err, changes) => {
    if (err) {
      console.error("Error trying to retrieve all histories: ", err);
      return res.send(err);
    }
    res.json(changes);
  });
};
