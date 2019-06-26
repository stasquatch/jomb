import React, { Component } from "react";

class InlineInputGroup extends Component {
  state = {
    inputField: ""
  };

  handleClick(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.buttonEvent(this.state.inputField);
    this.setState({ inputField: "" });
  }

  handleChange = event => {
    this.setState({ inputField: event.currentTarget.value });
  };

  render() {
    return (
      <form className="input-group" onSubmit={e => this.handleClick(e)}>
        <input
          type="text"
          placeholder={this.props.placeholderText}
          className="input"
          value={this.state.inputField}
          onChange={this.handleChange}
        />
        <button type="button" onClick={e => this.handleClick(e)}>
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

export default InlineInputGroup;
