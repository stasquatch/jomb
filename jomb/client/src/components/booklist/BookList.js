import React, { Component } from "react";
import axios from "axios";
import Search from "../search/Search";
import { SUCCESS } from "../../helpers/constants";

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

  renderBookInfo(book) {
    return <p key={book.isbn}>{book.title}</p>;
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
        <Search addBook={book => this.addBookToApp(book)} />
        {this.state.books.length > 0
          ? this.state.books.map(book => this.renderBookInfo(book))
          : "Pending"}
      </div>
    );
  }
}

export default BookList;
