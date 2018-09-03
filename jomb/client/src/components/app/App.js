import React, { Component } from "react";
import BookList from "../booklist/BookList";
import "normalize.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div id="Jomb">
        <header>
          <div id="SiteTitle">
            <h1>just organize my books</h1>
          </div>
          <div id="SiteNav">
            <a href="/add" class="top-nav">
              add
            </a>
          </div>
          <div id="HeaderRight">
            <a href="/login" id="LoginLink">
              login
            </a>
          </div>
        </header>
        <div id="Main">
          <div id="SideBar">
            <BookList />
          </div>
          <div id="BookDetail">
            <p>placeholder</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
