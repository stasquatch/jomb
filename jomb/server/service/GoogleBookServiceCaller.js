const axios = require("axios");

exports.getBookByIsbn = isbn => {
  return axios(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`
  );
};
