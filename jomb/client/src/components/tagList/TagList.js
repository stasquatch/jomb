import React from "react";
import InlineInputGroup from "../inlineInputGroup/InlineInputGroup";

function TagList(props) {
  function handleClick(event) {
    event.preventDefault();
    console.log(event.target);
  }

  function deleteTag(tag) {
    props.deleteTag(tag); // BookDetail takes care of this
  }

  function addTags(tags) {
    props.addTags(tags);
  }

  function renderTagSpans() {
    return props.tags.map((tag, index) => {
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
        <label htmlFor="add-tags">Tags: </label>
        {hasTags ? renderTagSpans() : <p>No tags to display</p>}
      </div>
      <div id="TagInputGroup">
        <InlineInputGroup
          buttonEvent={inputValue => addTags(inputValue)}
          buttonText="Add"
          placeholderText="Add tags separated by commas"
        />
      </div>
    </div>
  );
}

export default TagList;
