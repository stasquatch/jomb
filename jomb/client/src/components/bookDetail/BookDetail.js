import React, { Component } from "react";
import axios from "axios";
import TagList from "../tagList/TagList";
import { format } from "../../helpers/dateFormatter";
import ChangeHistory from "../changeHistory/ChangeHistory";
import { BOOK_STATUS_OPTIONS } from "../../helpers/constants";

class BookDetail extends Component {
  state = {
    book: {
      authors: [],
      title: ""
    },
    changeHistory: []
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getBookDetail();
      this.getChangeHistory();
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getBookDetail();
      this.getChangeHistory();
    }
  }

  addTag = tag => {
    let bookToUpdate = this.state.book;

    if (tag === undefined || tag === "") {
      return;
    }

    axios.post(`/api/addTag/book/${bookToUpdate._id}`, { tag }).then(res => {
      if (res.data.transportToUI.errorNumber === 0) {
        this.setState({ book: res.data.transportToUI.book });
      }

      this.updateChangeHistory(res.data.changeHistory);
    });
  };

  deleteBook = e => {
    let bookId = this.state.book._id;
    axios.delete(`/api/book/${bookId}`).then(res => {
      if (res.data.transportToUI.errorNumber === 0) {
        this.props.history.push("/");
      }
    });
    this.props.removeBookFromState(bookId);
  };

  deleteTag = tag => {
    let bookToUpdate = this.state.book;

    if (tag === undefined || tag === "") {
      return;
    }

    axios.post(`/api/removeTag/book/${bookToUpdate._id}`, { tag }).then(res => {
      if (res.data.transportToUI.errorNumber === 0) {
        this.setState({ book: res.data.transportToUI.book });
      }

      if (res.data.changeHistory.errorNumber === 0) {
        let changeHistory = this.state.changeHistory;
        changeHistory.unshift(res.data.changeHistory.changeHistoryItem);
        this.setState({ changeHistory });
      }
    });
  };

  getBookDetail = () => {
    axios
      .get(`/api/book/${this.props.match.params.id}`)
      .then(res => {
        if (res.data) {
          const book = res.data;
          this.setState({ book });
          console.log("NEW", this.state.book);
        }
      })
      .catch(err => {
        console.log("catching an error: ", err);
      });
  };

  getChangeHistory = () => {
    axios.get(`/api/changeHistory/${this.props.match.params.id}`).then(res => {
      this.setState({ changeHistory: res.data });
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
    this.getChangeHistory();
  };

  updateChangeHistory = resChangeHistoryObj => {
    if (resChangeHistoryObj.errorNumber === 0) {
      let changeHistory = this.state.changeHistory;
      changeHistory.unshift(resChangeHistoryObj.changeHistoryItem);
      this.setState({ changeHistory });
    }
  };

  updateStatus = e => {
    let status = e.target.value;

    if (status === "") {
      return;
    }

    axios
      .post(`/api/updateStatus/book/${this.state.book._id}`, { status })
      .then(res => {
        if (res.data.transportToUI.errorNumber === 0) {
          this.setState({ book: res.data.transportToUI.book });
        }
        this.updateChangeHistory(res.data.changeHistory);
      });
  };

  render() {
    return (
      <div id="BookDetailContainer">
        <div id="BookTitleAuthor">
          <h2>
            {this.state.book.title} by{" "}
            {this.state.book.authors ? this.state.book.authors.join(", ") : ""}
          </h2>
        </div>
        <div id="BasicDetails">
          <h3>Book Details</h3>
          <p>
            <span className="detail-label">Added On:</span>{" "}
            {format(this.state.book.addedOn)}
          </p>
          <p>
            <span className="detail-label">ISBN:</span> {this.state.book.isbn}
          </p>
          <p>
            <span className="detail-label">Status:</span>{" "}
            <select
              value={this.state.book.status}
              onChange={e => this.updateStatus(e)}
            >
              <option value="">- Select -</option>
              {BOOK_STATUS_OPTIONS.map(opt => {
                return (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                );
              })}
            </select>
          </p>

          <TagList
            tags={this.state.book.tags}
            deleteTag={this.deleteTag}
            addTag={this.addTag}
          />

          <div id="BookActions">
            <button id="DeleteBook" onClick={e => this.deleteBook(e)}>
              Delete Book
            </button>
          </div>
        </div>
        <div id="ChangeHistory">
          <ChangeHistory changeHistory={this.state.changeHistory} />
        </div>
      </div>
    );
  }
}

export default BookDetail;
