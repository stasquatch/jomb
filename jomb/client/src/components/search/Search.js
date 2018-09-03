import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  state = {
    searchField: ""
  };

  handleClick(event) {
    event.preventDefault();
    var searchValue = document.getElementById("SearchInput").value;
    this.props.addBook(searchValue);
    this.setState({ searchField: "" });
  }

  handleChange = event => {
    this.setState({ searchField: event.currentTarget.value });
  };

  render() {
    return (
      <form className="search-bar" onSubmit={e => this.handleClick(e)}>
        <input
          type="text"
          placeholder="Add Book by ISBN"
          id="SearchInput"
          value={this.state.searchField}
          onChange={this.handleChange}
        />
        <button type="button" onClick={e => this.handleClick(e)}>
          Search
        </button>
      </form>
    );
  }
}

export default Search;
