import React, { Component } from "react";
import axios from "axios";

class BookDetail extends Component {
  componentDidUpdate() {
    axios
      .get(`/api/book/${this.props.match.params.id}`)
      .then(res => {
        if (res.data) {
          const book = res.data;
          console.log(book);
        }
      })
      .catch(err => {
        console.log("catching an error: ", err);
      });
  }
  render() {
    var bookId = this.props.match.params.id;

    return (
      <div id="BookDetailContainer">
        <p>Hello {bookId}</p>
      </div>
    );
  }
}

export default BookDetail;
