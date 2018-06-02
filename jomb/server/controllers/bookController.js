const mongoose = require("mongoose");
const Book = require("../models/book");

const getBooks = async (req, res) => {
  let books = await Book.find({}, (err, books) => {
    if (err) return res.send(err);
    res.json(books);
  });
};

const addBook = async (req, res) => {
  let book = await new Book(req.body).save((err, book) => {
    if (err) return res.send(err);
    res.json({ message: "Book successfully added!", book });
  });
};

module.exports = { getBooks, addBook };
