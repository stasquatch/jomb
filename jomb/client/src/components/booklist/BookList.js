import React, { Component } from "react";
import BookTile from "../bookTile/BookTile";
import InlineInputGroup from "../inlineInputGroup/InlineInputGroup";

class BookList extends Component {
  addBookToApp = bookIsbn => {
    // axios
    //   .post("/api/book", { isbn: bookIsbn })
    //   .then(res => {
    //     if (res.data && res.data.book) {
    //       this.setState({ books: [...this.state.books, res.data.book] });
    //     } else if (res.data && res.data.errorNumber !== SUCCESS) {
    //       // TODO: handle error notification
    //       console.log(res.data.message);
    //     }
    //   })
    //   .catch(err => {
    //     console.log("Error sending request", err);
    //   });
  };

  filterBooks = searchValue => {
    // TODO: add endpoint to search by title or author
    console.log(`Searching for ${searchValue}`);
  };

  renderBookInfo(book) {
    return <BookTile book={book} key={book._id} />;
  }

  render() {
    return (
      <div id="BookList">
        <InlineInputGroup
          buttonEvent={searchValue => this.filterBooks(searchValue)}
          buttonText="Search"
          placeholderText="Search through your books.."
        />
        {this.props.books.length > 0
          ? this.props.books.map(book => this.renderBookInfo(book))
          : "Pending"}
      </div>
    );
  }
}

export default BookList;
