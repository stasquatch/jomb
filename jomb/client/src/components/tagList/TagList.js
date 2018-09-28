import React from "react";

function TagList(props) {
  function handleClick(event) {
    event.preventDefault();
  }

  function deleteTag(tag) {
    // make parent component handle this
    console.log("delete this");
  }

  function renderTagSpans() {
    return props.tags.map((tag, index) => {
      return (
        <span className="existing-tag" key={index}>
          {tag}
          <span className="delete-tag" onClick={e => deleteTag(tag)}>
            x
          </span>
        </span>
      );
    });
  }

  let hasTags = props.tags.length > 0;

  return (
    <div id="TagContainer">
      <div className="tag-list">
        <label htmlFor="add-tags">Tags: </label>
        {hasTags ? renderTagSpans() : <p>No tags to display</p>}
      </div>
      <div className="tag-input-group">
        <input type="text" className="add-tag-input" name="add-tags" />
        <button id="AddTagsBtn" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
}

export default TagList;
