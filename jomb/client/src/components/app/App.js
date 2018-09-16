import React, { Component } from "react";
import BookList from "../booklist/BookList";
import "normalize.css";
import "./App.css";

class App extends Component {
  render() {
    return (
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
          <BookList />
        </div>
        <div id="BookDetail">
          <p>placeholder</p>
        </div>
        <div className="divider" id="FooterDivider" />
      </div>
    );
  }
}

export default App;
