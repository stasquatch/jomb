import React from "react";
// import "./BookTile.css";

function BookTile({ book }) {
  return (
    <a href={`/book/${book.isbn}`} className="book-tile">
      <span className="book-title">{book.title}</span>
      <span className="book-author">{book.authors.join(", ")}</span>
    </a>
  );
}

export default BookTile;
