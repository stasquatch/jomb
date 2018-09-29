import React, { Component } from "react";
import axios from "axios";
import TagList from "../tagList/TagList";
import { format } from "../../helpers/dateFormatter";

class BookDetail extends Component {
  state = {
    book: {
      authors: [],
      title: ""
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getBookDetail();
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getBookDetail();
    }
  }

  getBookDetail = () => {
    axios
      .get(`/api/book/${this.props.match.params.id}`)
      .then(res => {
        if (res.data) {
          const book = res.data;
          this.setState({ book });
        }
      })
      .catch(err => {
        console.log("catching an error: ", err);
      });
  };

  render() {
    return (
      <div id="BookDetailContainer">
        <h2>
          {this.state.book.title} by {this.state.book.authors.join(", ")}
        </h2>
        <p>Added On: {format(this.state.book.addedOn)}</p>
        <p>ISBN: {this.state.book.isbn}</p>
        <p>
          Location:{" "}
          {this.state.book.location && this.state.book.location.length > 0
            ? this.state.book.location.join(", ")
            : "No location selected"}
        </p>
        {/* <p>
          Tags:{" "}
          {this.state.book.tags && this.state.book.tags.length > 0
            ? this.state.book.tags.join(", ")
            : "No tags available"}
        </p> */}
        <TagList tags={["funny", "dark", "biography"]} />
      </div>
    );
  }
}

export default BookDetail;
