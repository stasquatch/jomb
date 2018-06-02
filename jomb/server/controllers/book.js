const mongoose = require("mongoose");
const Book = require("../models/book");

function getBooks(req, res) {
  let query = Book.find({});
  query.exec((err, books) => {
    if (err) {
      return res.send(err);
    }
    res.json(books);
  });
}

function addBook(req, res) {
  var newBook = new Book(req.body);
  newBook.save((err, book) => {
    if (err) {
      return res.send(err);
    }
    res.json({ message: "Book successfully added!", book });
  });
}

module.exports = { getBooks, addBook };
