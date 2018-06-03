const mongoose = require("mongoose");
const Book = require("../models/book");
const ChangeHistory = require("../models/changeHistory");
const changeHistoryController = require("./changeHistoryController");
const { ADD, DELETE, UPDATE } = require("../models/constants");
const { getBookByIsbn } = require("../service/GoogleBookServiceCaller");

exports.getBooks = async (req, res) => {
  let books = await Book.find({}, (err, books) => {
    if (err) return res.json(err);
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
  let googleBookInfo = getBookByIsbn(isbn)
    .then(data => {
      if (!data.data || !data.data.items[0]) return res.json(err);

      let bookInfo = data.data.items[0].volumeInfo;
      let book = new Book(req.body);

      book.title = bookInfo.title || "";
      book.authors = bookInfo.authors || [];

      book.save((err, book) => {
        if (err) {
          if (err.code === 11000) {
            return res.json({
              message: "You've already added a book with that ISBN"
            });
          } else {
            return res.json({ message: "There was an error adding your book" });
          }
        }
        changeHistoryController.addChangeHistoryToBook(book._id, ADD);
        res.json({ message: "Book successfully added!", book });
      });
    })
    .catch(err => {
      console.error(`Error adding book [${isbn}]: ${err}`);
      res.send(err);
    });
};

exports.deleteBook = async (req, res) => {
  let book = await Book.deleteOne({ _id: req.params.id }, (err, book) => {
    if (err) {
      console.error(`Error deleting book [${req.params.id}]: ${err}`);
      return res.json(
        "There was an error deleting this book. Please try again."
      );
    }
    changeHistoryController.addChangeHistoryToBook(req.params.id, DELETE);
    res.json({ message: "Book successfully deleted!" });
  });
};

exports.updateBook = async (req, res) => {
  let book = await Book.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, book) => {
      if (err) {
        console.error(`Error updating book [${req.params.id}]: ${err}`);
        return res.json(
          "Sorry, there was an error updating this book. Please try again."
        );
      }
      changeHistoryController.addChangeHistoryToBook(req.params.id, UPDATE);
      res.json({ message: "Book successfully updated!", book });
    }
  );
};
