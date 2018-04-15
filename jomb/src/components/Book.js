import React from "react";

class Book extends React.Component {
  setBook = event => {
    event.preventDefault();
    this.props.setCurrentBook(this.props.book);
  };

  render() {
    const hasData = this.props.book.title !== "";

    return (
      <a
        href={this.props.book.googleId}
        onClick={this.setBook}
        className="book-list-single white-bg grey-border"
      >
        {hasData ? (
          <div>
            <h3>{this.props.book.title}</h3>
            <span className="book-list-single-authors">
              {this.props.book.authors}
            </span>
          </div>
        ) : (
          <h3>{this.props.bookDetails}</h3>
        )}
      </a>
    );
  }
}

export default Book;
