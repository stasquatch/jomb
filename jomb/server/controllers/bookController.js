const mongoose = require("mongoose");
const Book = require("../models/book");
const ChangeHistory = require("../models/changeHistory");
const changeHistoryController = require("./changeHistoryController");
const { ADD, DELETE } = require("../models/constants");

const getBooks = async (req, res) => {
  let books = await Book.find({}, (err, books) => {
    if (err) return res.send(err);
    res.json(books);
  });
};

const addBook = async (req, res) => {
  let book = await new Book(req.body).save((err, book) => {
    if (err) return res.send(err);
    changeHistoryController.addChangeHistoryToBook(book._id, ADD);
    res.json({ message: "Book successfully added!", book });
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

// const updateBook = async (req, res) => {

// }

module.exports = { getBooks, addBook, deleteBook };
