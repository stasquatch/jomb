import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { VERSION_NUMBER } from "../../helpers/constants";

import BookList from "../booklist/BookList";
import BookDetail from "../bookDetail/BookDetail";
import AddBook from "../addBook/AddBook";

import axios from "axios";
import _ from "lodash";

import "normalize.css";

class App extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.refreshBooklist();
  }

  addBook = book => {
    axios.post(`/api/book`, { isbn: book }).then(res => {
      if (res.data.message) {
        console.error(res.data.message);
        return;
      }

      if (res.data.transportToUI.errorNumber === 0) {
        console.log("added book");
        let books = this.state.books;
        // TODO: figure out how to add this alphabetically
        // TODO: navigate to new book
        // TODO: type ahead book by name or author
        books.push(res.data.transportToUI.book);
        this.setState({ books });
      }
    });
  };

  refreshBooklist = () => {
    axios
      .get("/api/book")
      .then(res => {
        if (res.data) {
          const books = _.values(res.data);
          this.setState({ books });
        }
      })
      .catch(err => {
        console.log("catching an error : ", err);
      });
  };

  removeBookFromState = bookId => {
    let books = this.state.books;
    books = books.filter(book => book._id !== bookId);
    this.setState({ books });
  };

  render() {
    return (
      <Router>
        <div id="Jomb">
          <header id="SiteTitle">
            <h1>
              <Link to="/">just organize my books</Link>
            </h1>
          </header>
          <div id="SiteNav">
            <Link to="/add/book" className="top-nav">
              add
            </Link>
            <div id="HeaderRight">
              <a href="/login" id="LoginLink">
                login
              </a>
            </div>
          </div>
          <div className="divider" id="HeaderDivider" />
          <div id="SideBar">
            <BookList books={this.state.books} />
          </div>
          <div id="BookDetail">
            <Route
              path="/book/:id"
              render={props => (
                <BookDetail
                  {...props}
                  removeBookFromState={this.removeBookFromState}
                />
              )}
            />
            <Route
              path="/add/book"
              render={props => <AddBook {...props} addBook={this.addBook} />}
            />
          </div>
          <div className="divider" id="FooterDivider" />
          <div id="Footer">
            <p>{VERSION_NUMBER} — (C) Stacy Harrison 2018</p>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
