// TODO: make get by ISBN?

const getBookByGoogleId = googleId => {
  let book = {};

  // TODO: CORS error
  fetch(`https://www.googleapis.com/books/v1/volumes/${googleId}`)
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

export default getBookByGoogleId;
