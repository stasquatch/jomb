const mongoose = require("mongoose");
const Book = require("../models/book");
const ChangeHistory = require("../models/changeHistory");
const changeHistoryController = require("./changeHistoryController");
const tagController = require("./tagController");
const {
  ADD,
  DELETE,
  UPDATE,
  RATE,
  DUPLICATE_KEY_ERROR,
  NO_DATA,
  GENERAL_ERROR,
  SUCCESS
} = require("../models/constants");
const axios = require("axios");

exports.getBooks = async (req, res) => {
  let books = await Book.find({}, (err, books) => {
    if (err) return res.json({ message: "Error retrieving all books." });
    res.json(books);
  });
};

exports.getBook = async (req, res) => {
  let book = await Book.findOne({ _id: req.params.id }, (err, book) => {
    if (err) {
      return res.json({
        message: "Sorry, we could not find that book. Please try again."
      });
    }
    return res.json(book);
  });
};

exports.addBook = async (req, res) => {
  let isbn = req.body.isbn;
  axios(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then(data => {
      if (data.data.totalItems === 0) {
        return res.json({
          errorNumber: NO_DATA,
          message: "We can't find that book, try another IBSN"
        });
      }

      let bookInfo = data.data.items[0].volumeInfo;
      let book = new Book(req.body);

      book.title = bookInfo.title || "";
      book.authors = bookInfo.authors || [];

      book.save((err, book) => {
        if (err) {
          if (err.code === DUPLICATE_KEY_ERROR) {
            return res.json({
              errorNumber: DUPLICATE_KEY_ERROR,
              message: "You've already added a book with that ISBN"
            });
          } else {
            return res.json({
              errorNumber: GENERAL_ERROR,
              message: "There was an error adding that book."
            });
          }
        }
        changeHistoryController.addChangeHistoryToBook(
          book._id,
          ADD,
          "Added book to library"
        );
        res.json({
          errorNumber: SUCCESS,
          message: "Book successfully added!",
          book
        });
      });
    })
    .catch(err => {
      return err;
    });
};

exports.deleteBook = async (req, res) => {
  let book = await Book.deleteOne({ _id: req.params.id }, (err, book) => {
    if (err) {
      return res.json({
        message: "There was an error deleting this book. Please try again."
      });
    }
    changeHistoryController.addChangeHistoryToBook(
      req.params.id,
      DELETE,
      "Deleted book from library"
    );
    res.json({ message: "Book successfully deleted!" });
  });
};

exports.updateBook = async (req, res) => {
  const currentBook = await Book.findOne({ _id: req.params.id });
  const book = await Book.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, book) => {
      // REFACTOR THIS

      if (err) {
        return res.json({
          message:
            "Sorry, there was an error updating this book. Please try again."
        });
      }
      changeHistoryController.addChangeHistoryToBook(req.params.id, UPDATE);
      res.json({ message: "Book successfully updated!", book });
    }
  ).catch(err => {});
};

exports.addTagToBook = async (req, res) => {
  // check if tag already exists
  // create tag if it doesn't exist
  // add tag to book
  if (req.body.tag && req.body.tag.name) {
    const tag = await tagController.findOrCreateTag(req.body.tag.name);
  }
};

exports.rateBook = async (req, res) => {
  const bookId = req.params.id;
  const rating = req.params.rating;

  let book = await Book.findOneAndUpdate(
    { _id: bookId },
    { rating },
    { new: true, runValidators: true },
    (err, book) => {
      if (err) {
        return res.json({ message: "Error rating book." });
      }
      changeHistoryController.addChangeHistoryToBook(bookId, RATE);
      res.json({ message: "Book successfully rated!", book });
    }
  ).catch(err => {});
};
