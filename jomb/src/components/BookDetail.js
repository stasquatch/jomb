import React from "react";

class BookDetail extends React.Component {
  render() {
    return (
      <div className="book-detail-book">
        <div className="book-detail-book-summary">
          <img
            className="book-detail-thumbnail"
            src={this.props.currentBook.thumbnail}
          />
          <h2>{this.props.currentBook.title}</h2>
          <p>{this.props.currentBook.authors}</p>
          <p>{this.props.currentBook.description}</p>
        </div>
      </div>
    );
  }
}

export default BookDetail;
