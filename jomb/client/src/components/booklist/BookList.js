import React, { Component } from "react";
import InlineInputGroup from "../inlineInputGroup/InlineInputGroup";
import { NavLink } from "react-router-dom";

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
    return (
      <div className="book-tile-container" key={book._id}>
        <NavLink
          to={`/book/${book._id}`}
          activeClassName="selected"
          className="book-tile"
        >
          <div>
            <span className="book-title">{book.title}</span>
            <span className="book-author">
              {book.authors ? book.authors.join(", ") : ""}
            </span>
          </div>
        </NavLink>
      </div>
    );
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
          ? this.props.books
              .sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase())
              .map(book => this.renderBookInfo(book))
          : "Pending"}
      </div>
    );
  }
}

export default BookList;
