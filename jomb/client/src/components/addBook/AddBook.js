import React from "react";
import InlineInputGroup from "../inlineInputGroup/InlineInputGroup";

function AddBook(props) {
  function addBookToLibrary(isbn) {
    console.log("add book from AddBook component");
    props.addBook(isbn);
  }

  return (
    <div id="AddBook">
      <h2>Add Book</h2>
      <InlineInputGroup
        placeholderText="ISBN here..."
        buttonText="Add to Library"
        buttonEvent={addBookToLibrary}
      />
    </div>
  );
}

export default AddBook;
