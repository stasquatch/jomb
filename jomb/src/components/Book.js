import React from "react";
import { Link } from "react-router-dom";

class Book extends React.Component {
  setBook = event => {
    this.props.setCurrentBook(this.props.book);
  };

  render() {
    const hasData = this.props.book.title !== "";

    return (
      // <a
      //   href={`/${this.props.book.googleId}`}
      //   onClick={this.setBook}
      //   className="book-list-single white-bg grey-border"
      // >
      //   {hasData ? (
      //     <div>
      //       <h3>{this.props.book.title}</h3>
      //       <span className="book-list-single-authors">
      //         {this.props.book.authors}
      //       </span>
      //     </div>
      //   ) : (
      //     <h3>{this.props.bookDetails}</h3>
      //   )}
      // </a>
      <Link to={`/${this.props.book.googleId}`} onClick={this.setBook}>
        {this.props.book.title}
      </Link>
    );
  }
}

export default Book;
