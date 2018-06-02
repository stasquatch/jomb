const mongoose = require("mongoose");
const Book = require("../models/book");
const ChangeHistory = require("../models/changeHistory");
const changeHistoryController = require("./changeHistoryController");
const { ADD, DELETE } = require("../models/constants");
const { getBookByIsbn } = require("../service/GoogleBookServiceCaller");

const getBooks = async (req, res) => {
  let books = await Book.find({}, (err, books) => {
    if (err) return res.send(err);
    res.json(books);
  });
};

const addBook = async (req, res) => {
  let isbn = req.body.isbn;
  let googleBookInfo = getBookByIsbn(isbn)
    .then(data => {
      if (!data.data.items[0]) return res.send(err);

      let bookInfo = data.data.items[0].volumeInfo;
      let book = new Book(req.body);

      book.title = bookInfo.title || "";
      book.authors = bookInfo.authors || [];

      book.save((err, book) => {
        if (err) return res.send(err);
        changeHistoryController.addChangeHistoryToBook(book._id, ADD);
        res.json({ message: "Book successfully added!", book });
      });
    })
    .catch(err => {
      console.error(`Error adding book [${isbn}]: ${err}`);
      res.send(err);
    });
};

const deleteBook = async (req, res) => {
  let book = await Book.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.error("Error deleting book [req.params.id]: ", err);
      return res.send(err);
    }
    changeHistoryController.addChangeHistoryToBook(book._id, DELETE);
    res.json({ message: "Book successfully deleted!" });
  });
};

// UPDATE BOOK

module.exports = { getBooks, addBook, deleteBook };
