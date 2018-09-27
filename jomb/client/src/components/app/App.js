import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { VERSION_NUMBER } from "../../helpers/constants";

import BookList from "../booklist/BookList";
import BookDetail from "../bookDetail/BookDetail";

import axios from "axios";
import _ from "lodash";

import "normalize.css";

class App extends Component {
  state = {
    books: [],
    book: {}
  };

  componentDidMount() {
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
  }

  render() {
    return (
      <Router>
        <div id="Jomb">
          <header id="SiteTitle">
            <h1>just organize my books</h1>
          </header>
          <div id="SiteNav">
            <a href="/add" className="top-nav">
              add
            </a>
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
              render={props => <BookDetail {...props} book={this.state.book} />}
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
