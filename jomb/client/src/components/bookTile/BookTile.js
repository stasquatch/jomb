import React from "react";
import { Link } from "react-router-dom";

const BookTile = ({ book }) => {
  return (
    <div className="book-tile-container">
      <Link to={`/book/${book._id}`} className="book-tile">
        <div>
          <span className="book-title">{book.title}</span>
          <span className="book-author">
            {book.authors ? book.authors.join(", ") : ""}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default BookTile;
