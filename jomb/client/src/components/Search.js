import React from "react";

function Search({ addBook }) {
  function handleClick(e) {
    e.preventDefault();
    var searchValue = document.getElementById("SearchInput").value;
    addBook(searchValue);
  }

  return (
    <form className="search-bar" onSubmit={handleClick}>
      <input type="text" placeholder="Add Book by ISBN" id="SearchInput" />
      <button type="button" onClick={handleClick}>
        Add
      </button>
    </form>
  );
}

export default Search;
