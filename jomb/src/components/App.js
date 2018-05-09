import React, { Component } from "react";
import { Route } from "react-router-dom";

import "../css/App.css";
import BookList from "./BookList";
import AddBookForm from "./AddBookForm";
import BookDetail from "./BookDetail";

class App extends Component {
  render() {
    return (
      <div className="grid">
        <header>
          <h1>just organize my books</h1>
        </header>
        <section className="book-list">
          <div className="add-book">
            <AddBookForm />
          </div>
          <ul className="books">
            <Route path="/" component={BookList} />
          </ul>
        </section>
        <section className="book-detail">
          <Route path="/:bookId" component={BookDetail} />
        </section>
        <footer>
          <p>footer</p>
        </footer>
      </div>
    );
  }
}

export default App;
