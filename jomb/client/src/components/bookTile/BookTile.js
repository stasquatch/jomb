import React from "react";

function BookTile({ book }) {
  return (
    <a href={`/book/${book.isbn}`} className="book-tile">
      {book.title}
    </a>
  );
}

export default BookTile;
