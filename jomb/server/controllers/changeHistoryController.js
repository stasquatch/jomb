const mongoose = require("mongoose");
const ChangeHistory = require("../models/changeHistory");
const Book = require("../models/book");

const addChangeHistoryToBook = async (
  bookId,
  changeDescription,
  changeDetail
) => {
  const changeHistoryItem = new ChangeHistory({
    description: changeDescription,
    detail: changeDetail,
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

const getAllChanges = async (req, res) => {
  const changes = ChangeHistory.find({}, (err, changes) => {
    if (err) {
      return res.json({ message: "Error retrieving all change histories" });
    }
    res.json(changes);
  });
};

module.exports = { addChangeHistoryToBook, getAllChanges };
