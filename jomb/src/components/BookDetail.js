import React from "react";
import getBookByGoogleId from "../service/getBookData";

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
      <h3>{match.params.bookId}</h3>
      {books[match.params.bookId] !== undefined ? (
        <div className="detail">
          <p>{books[match.params.bookId].title}</p>
          <p>{books[match.params.bookId].authors}</p>
          <p>{books[match.params.bookId].description}</p>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  </div>
);

export default BookDetail;
