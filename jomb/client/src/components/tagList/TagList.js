import React from "react";
import InlineInputGroup from "../inlineInputGroup/InlineInputGroup";

function TagList(props) {
  function deleteTag(tag) {
    props.deleteTag(tag); // BookDetail takes care of this
  }

  function addTag(tag) {
    props.addTag(tag);
  }

  function renderTagSpans() {
    const uniqueTags = [...new Set(props.tags)];
    return uniqueTags.map((tag, index) => {
      return (
        <span className="existing-tag" key={index}>
          {tag.name}
          <span
            className="delete-tag"
            onClick={e => deleteTag(tag)}
            title="Delete this tag"
          >
            x
          </span>
        </span>
      );
    });
  }

  let hasTags = props.tags && props.tags.length > 0;

  return (
    <div id="TagContainer">
      <div className="tag-list">
        <label htmlFor="add-tags" className="detail-label">
          Tags:{" "}
        </label>
        {hasTags ? renderTagSpans() : <p>No tags to display</p>}
      </div>
      <div id="TagInputGroup">
        <InlineInputGroup
          buttonEvent={inputValue => addTag(inputValue)}
          buttonText="Add"
          placeholderText="Add one tag at a time..."
        />
      </div>
    </div>
  );
}

export default TagList;
