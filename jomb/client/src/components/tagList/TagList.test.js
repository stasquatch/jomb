import React from "react";
import { shallow } from "enzyme";
import TagList from "./TagList";

it("renders a single tag", () => {
  const tags = ["tagOne"];
  const tagList = shallow(<TagList tags={tags} />);
  expect(tagList.find(".existing-tag")).toHaveLength(1);
});

it("renders multple tags", () => {
  const tags = ["tagOne", "tagTwo"];
  const tagList = shallow(<TagList tags={tags} />);
  expect(tagList.find(".existing-tag")).toHaveLength(2);
});

it("renders zero tags", () => {
  const tags = [];
  const tagList = shallow(<TagList tags={tags} />);
  expect(tagList.find(".existing-tag")).toHaveLength(0);
});

it("renders null tags", () => {
  const tagList = shallow(<TagList />);
  expect(tagList.find(".existing-tag")).toHaveLength(0);
});

it("triggers deleteTag function", () => {
  const tags = ["tagOne"];
  const mockDeleteTagFn = jest.fn();
  const tagList = shallow(<TagList tags={tags} deleteTag={mockDeleteTagFn} />);
  tagList.find(".delete-tag").simulate("click");
  expect(mockDeleteTagFn).toHaveBeenCalled();
});
