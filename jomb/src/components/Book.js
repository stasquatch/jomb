import React from "react";

class Book extends React.Component {
  render() {
    const hasData = this.props.book.title !== "";
    return (
      <div className="book">
        {hasData ? (
          <div className="book-detail">
            <h2>{this.props.book.title}</h2>
            <h4>{this.props.book.authors}</h4>
            <img src={this.props.book.thumbnail} />
          </div>
        ) : (
          <h2>{this.props.bookDetails}</h2>
        )}
      </div>
    );
  }
}

export default Book;
