const mongoose = require("mongoose");
const ChangeHistory = require("../models/changeHistory");
const Book = require("../models/book");

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
