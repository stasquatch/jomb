import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../actions/index";
import _ from "lodash";

class BookList extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    if (!this.props.books) {
      return <div>Loading...</div>;
    }

    return _.map(this.props.books, book => {
      return (
        <Link to={`/${book.id}`} key={book.id}>
          <span className="book-list-single white-bg grey-border">
            {book.volumeInfo.title} by {book.volumeInfo.authors}
          </span>
        </Link>
      );
    });
  }
}

function mapStateToProps({ books }) {
  return { books };
}

export default connect(mapStateToProps, { fetchBooks })(BookList);
