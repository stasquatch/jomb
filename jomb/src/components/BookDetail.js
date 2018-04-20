import React from "react";

// class BookDetail extends React.Component {
//   render() {
//     const currentBookId = this.props.match.params.bookId;
//     return (
//       <div className="book-detail-book">
//         <div className="book-detail-book-summary">
//           <img
//             className="book-detail-thumbnail"
//             src={this.props.books[currentBookId].thumbnail}
//           />
//           {/* <h2>{this.props.currentBook.title}</h2>
//           <p>{this.props.currentBook.authors}</p>
//           <p>{this.props.currentBook.description}</p> */}
//         </div>
//       </div>
//     );
//   }
// }

const BookDetail = ({ books, match }) => (
  <div className="book-detail-book">
    <div className="book-detail-book-summary">
      {/* <img
        className="book-detail-thumbnail"
        src={this.props.books[match.params.bookId].thumbnail}
      />
      <h2>{this.props.books[match.params.bookId].title}</h2>
      <p>{this.props.books[match.params.bookId].authors}</p>
      <p>{this.props.books[match.params.bookId].description}</p> */}
      <h3>{match.params.bookId}</h3>
      {books[match.params.bookId] !== undefined ? (
        <p>{books[match.params.bookId].title}</p>
      ) : (
        "Loading"
      )}
    </div>
  </div>
);

export default BookDetail;
