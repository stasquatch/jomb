import React, { Component } from "react";
import axios from "axios";
import Search from "../search/Search";
import { SUCCESS } from "../../helpers/constants";
import BookTile from "../bookTile/BookTile";

class BookList extends Component {
  state = {
    books: {}
  };

  addBookToApp = bookIsbn => {
    axios
      .post("/api/book", { isbn: bookIsbn })
      .then(res => {
        if (res.data && res.data.book) {
          this.setState({ books: [...this.state.books, res.data.book] });
        } else if (res.data && res.data.errorNumber !== SUCCESS) {
          // TODO: handle error notification
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.log("Error sending request", err);
      });
  };

  filterBooks = searchValue => {
    // TODO: add endpoint to search by title or author
    console.log(`Searching for ${searchValue}`);
  };

  renderBookInfo(book) {
    return <BookTile book={book} key={book._id} />;
  }

  componentDidMount() {
    axios
      .get("/api/book")
      .then(res => {
        if (res.data) {
          this.setState({ books: res.data });
        }
      })
      .catch(err => {
        console.log("catching an error : ", err);
      });
  }

  render() {
    return (
      <div id="BookList">
        <Search filterBooks={searchValue => this.filterBooks(searchValue)} />
        {this.state.books.length > 0
          ? this.state.books.map(book => this.renderBookInfo(book))
          : "Pending"}
      </div>
    );
  }
}

export default BookList;
