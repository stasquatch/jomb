import React, { Component } from "react";
import "../css/App.css";
import Book from "./Book";
import AddBookForm from "./AddBookForm";
import BookDetail from "./BookDetail";
import base from "../base";
import getBookByISBN from "../service/getBookData";

class App extends Component {
  state = {
    books: {},
    currentBook: {}
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

  setCurrentBook = book => {
    const thisBook = getBookByISBN(book.googleId);
    this.setState({ currentBook: thisBook });
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
              <Book
                key={key}
                book={this.state.books[key]}
                setCurrentBook={this.setCurrentBook}
              />
            ))}
          </ul>
        </section>
        <section className="book-detail">
          <BookDetail currentBook={this.state.currentBook} />
        </section>
        <footer>
          <p>footer</p>
        </footer>
      </div>
    );
  }
}

export default App;
