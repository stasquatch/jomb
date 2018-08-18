import React, { Component } from "react";
import axios from "axios";

class BookList extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    axios.get("/api/books").then(res => {
      if (res.body) {
        return res.body;
      } else {
        return "Error";
      }
    });
  }

  render() {
    return (
      <div id="BookList">
        <p>Placeholder content</p>
      </div>
    );
  }
}

export default BookList;
