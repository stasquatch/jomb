import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBook } from "../actions";

class BookDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchBook(id);
  }

  render() {
    if (!this.props.book) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Book Detail</h2>
        <h3>{this.props.book.volumeInfo.title}</h3>
      </div>
    );
  }
}

// TODO: Refactor this so only one book is being passed, fresh
// out of the database with the latest info on it.
function mapStateToProps({ books }, ownProps) {
  return { book: books[ownProps.match.params.bookId] };
}

export default connect(mapStateToProps, { fetchBook })(BookDetail);
