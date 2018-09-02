import React, { Component } from "react";
import axios from "axios";
import Search from "./Search";

class BookList extends Component {
  state = {
    books: {}
  };

  addBookToApp(book) {
    console.log("clicked", book);
  }

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
