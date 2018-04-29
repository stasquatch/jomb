import React from "react";
import { getBookByIsbn } from "../service/getBookData";

class AddBookForm extends React.Component {
  isbnRef = React.createRef();

  createBook = event => {
    event.preventDefault();

    let book = getBookByIsbn(this.isbnRef.current.value);

    if (book !== null) {
      this.props.addBook(book);
    } else {
      console.log(
        `Could not retrieve data for new book ISBN[${
          this.isbnRef.current.value
        }]`
      );
      return;
    }

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
