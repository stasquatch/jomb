import React from "react";

class AddBookForm extends React.Component {
  isbnRef = React.createRef();

  createBook = event => {
    event.preventDefault();
    let book = {};
    book.isbn = this.isbnRef.current.value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`)
      .then(results => {
        return results.json();
      })
      .then(bookData => {
        if (!bookData.error && bookData.totalItems > 0) {
          // TODO: handle multiple publishers items[1]
          book.title = bookData.items[0].volumeInfo.title;
          book.authors = bookData.items[0].volumeInfo.authors;
          book.thumbnail =
            bookData.items[0].volumeInfo.imageLinks.smallThumbnail;
          book.googleId = bookData.items[0].id;
        }

        if (book !== null) {
          this.props.addBook(book);
        } else {
          console.log(
            `Could not retrieve data for new book ISBN[${this.isbnRef}]`
          );
          return;
        }
      });
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="book-add" onSubmit={this.createBook}>
        <input
          name="isbn"
          ref={this.isbnRef}
          type="text"
          placeholder="ISBN Number"
        />
        <button type="submit">Add Book</button>
      </form>
    );
  }
}

export default AddBookForm;
