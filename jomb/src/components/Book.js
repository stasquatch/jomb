import React from "react";
import { Link } from "react-router-dom";

class Book extends React.Component {
  render() {
    return (
      <Link to={`/${this.props.book.googleId}`}>
        <span className="book-list-single white-bg grey-border">
          {this.props.book.title} by {this.props.book.authors}
        </span>
      </Link>
    );
  }
}

export default Book;
