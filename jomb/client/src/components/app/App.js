import React, { Component } from "react";
import BookList from "../booklist/BookList";
import "../../shared/_layout.css";

class App extends Component {
  render() {
    return (
      <div id="Jomb">
        <p>Hello world</p>
        <BookList />
      </div>
    );
  }
}

export default App;
