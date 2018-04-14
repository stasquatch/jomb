import React, { Component } from "react";
import "../css/App.css";
import Book from "./Book";
import AddBookForm from "./AddBookForm";
import base from "../base";

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
      <div className="App">
        <div className="add-book">
          <AddBookForm addBook={this.addBook} />
        </div>
        <ul className="books">
          {Object.keys(this.state.books).map(key => (
            <Book key={key} book={this.state.books[key]} />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
