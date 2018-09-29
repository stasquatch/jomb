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

  updateBook = bookToUpdate => {
    axios
      .post(`/api/book/${bookToUpdate._id}`, {
        bookToUpdate
      })
      .then(res => {
        //handle change history addition
        console.log(res.data.changeHistory.message);
        //handle book updated
        console.log(res.data.transportToUI.message);
      });
  };

  deleteTag = tag => {
    let bookToUpdate = this.state.book;
    if (bookToUpdate.tags.includes(tag)) {
      // do i need to update the state or does it detect change?
      let updatedTagList = bookToUpdate.tags.filter(t => t !== tag);
      console.log(updatedTagList);
    } else {
      // handle error
      console.error("That tag doesn't exist on that book...");
    }
  };

  addTags = tags => {
    let bookToUpdate = this.state.book;

    if (tags === undefined || tags === "") {
      return;
    }

    let tagArr = tags.split(",").map(item => item.trim());
    bookToUpdate.tags = tagArr;
    this.updateBook(bookToUpdate);
  };

  render() {
    return (
      <div id="BookDetailContainer">
        <h2>
          {this.state.book.title} by{" "}
          {this.state.book.authors ? this.state.book.authors.join(", ") : ""}
        </h2>
        <p>Added On: {format(this.state.book.addedOn)}</p>
        <p>ISBN: {this.state.book.isbn}</p>
        <p>
          Location:{" "}
          {this.state.book.location && this.state.book.location.length > 0
            ? this.state.book.location.join(", ")
            : "No location selected"}
        </p>
        <TagList
          tags={this.state.book.tags}
          deleteTag={this.deleteTag}
          addTags={this.addTags}
        />
      </div>
    );
  }
}

export default BookDetail;
