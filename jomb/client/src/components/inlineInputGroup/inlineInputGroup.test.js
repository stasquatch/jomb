import React from "react";
import { shallow } from "enzyme";
import InlineInputGroup from "./InlineInputGroup";

it("triggers handleClick event on button click", () => {
  const mockFn = jest.fn();
  const inlineInputGroup = shallow(
    <InlineInputGroup
      placeholder="Text"
      value="Text"
      buttonText="Text"
      buttonEvent={mockFn}
    />
  );
  inlineInputGroup.find("button").simulate("click");
  expect(mockFn).toHaveBeenCalled();
});

it("renders a given value", () => {
  const inlineInputGroup = shallow(
    <InlineInputGroup placeholder="Placeholder" buttonText="Text" />
  );
  inlineInputGroup.setState({ inputField: "Value" });
  expect(inlineInputGroup.find("input").prop("value")).toMatch("Value");
});
