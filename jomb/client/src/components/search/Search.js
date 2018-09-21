import React, { Component } from "react";

class Search extends Component {
  state = {
    searchField: ""
  };

  handleClick(event) {
    event.preventDefault();
    this.props.filterBooks(this.state.searchField);
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
          placeholder="Search through your books"
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
