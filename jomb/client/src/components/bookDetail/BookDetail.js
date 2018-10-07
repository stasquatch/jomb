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

  getChangeHistory = () => {
    axios.get(`/api/changeHistory/${this.props.match.params.id}`).then(res => {
      this.setState({ changeHistory: res.data });
    });
  };

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
    this.getChangeHistory();
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
    console.log("delete book");
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
        <div id="BasicDetails">
          <h2>
            {this.state.book.title} by{" "}
            {this.state.book.authors ? this.state.book.authors.join(", ") : ""}
          </h2>
          <p>Added On: {format(this.state.book.addedOn)}</p>
          <p>ISBN: {this.state.book.isbn}</p>
          <p>
            Status:
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
