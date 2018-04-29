import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../css/App.css";
import Book from "./Book";
import AddBookForm from "./AddBookForm";
import BookDetail from "./BookDetail";
import base from "../base";
import getBookByISBN from "../service/getBookData";

class App extends Component {
  state = {
    books: {}
  };

  componentDidMount() {
    this.ref = base.syncState("books", {
      context: this,
      state: "books"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addBook = book => {
    const books = { ...this.state.books };
    if (!books[book.googleId]) {
      books[book.googleId] = book;
      this.setState({ books });
    } else {
      console.log("That book was already added.");
      return;
    }
  };

  render() {
    return (
      <div className="grid">
        <header>
          <h1>just organize my books</h1>
        </header>
        <section className="book-list">
          <div className="add-book">
            <AddBookForm addBook={this.addBook} />
          </div>
          <ul className="books">
            {Object.keys(this.state.books).map(key => (
              <Book key={key} book={this.state.books[key]} />
            ))}
          </ul>
        </section>
        <section className="book-detail">
          <Route
            path="/:bookId"
            render={props => <BookDetail {...props} books={this.state.books} />}
          />
        </section>
        <footer>
          <p>footer</p>
        </footer>
      </div>
    );
  }
}

export default App;
