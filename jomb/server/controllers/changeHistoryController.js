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
        if (err) {
          console.error("Error saving history: ", err);
          return err;
        }
        return book;
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

const getChangesForBook = async (req, res) => {
  const changes = await ChangeHistory.find(
    { bookId: req.params.bookId },
    (err, changes) => {
      if (err) {
        return res.json({
          message: `Error retrieving all change histories for ${
            req.params.bookId
          }`
        });
      }
      res.json(changes);
    }
  );
};

module.exports = { addChangeHistoryToBook, getAllChanges, getChangesForBook };
