import axios from "axios";
// TODO: make get by ISBN?

const getBookByGoogleId = googleId => {
  let book = {};

  // TODO: CORS error
  axios
    .get(`https://www.googleapis.com/books/v1/volumes/${googleId}`)
    .then(results => {
      console.log(results);
      return results.json();
    })
    .then(bookData => {
      if (!bookData.error && bookData.totalItems > 0) {
        // TODO: handle multiple publishers items[1]
        book.publisher = bookData.volumeInfo.publisher;
        book.publishedDate = bookData.volumeInfo.publishedDate;
        book.description = bookData.volumeInfo.description;
        book.pageCount = bookData.volumeInfo.printedPageCount;
      }
      console.log(book);
    });

  return book;
};

const getBookByIsbn = isbn => {
  let book = {};
  book.isbn = isbn;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`)
    .then(results => {
      return results.json();
    })
    .then(bookData => {
      if (!bookData.error && bookData.totalItems > 0) {
        // TODO: handle multiple publishers items[1]
        book.title = bookData.items[0].volumeInfo.title;
        book.authors = bookData.items[0].volumeInfo.authors;
        book.thumbnail = bookData.items[0].volumeInfo.imageLinks
          ? bookData.items[0].volumeInfo.imageLinks.smallThumbnail
          : "";
        book.description = bookData.items[0].description || "";
        book.googleId = bookData.items[0].id;
      }

      return book;
    });

  return null;
};

export { getBookByGoogleId };
export { getBookByIsbn };
