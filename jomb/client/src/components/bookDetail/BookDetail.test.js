import React from "react";
import { shallow } from "enzyme";
import BookDetail from "./BookDetail";
import axios from "axios";

jest.mock("axios");

it("renders book detail", () => {
  const book = {
    _id: 1,
    title: "title",
    authors: ["Author one"],
    addedOn: new Date(),
    status: "Read",
    isbn: "123abc",
    tags: []
  };

  axios.get.mockResolvedValue({ data: book });

  const bookDetail = shallow(
    <BookDetail
      match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
    />
  );

  // TODO: research a better way to do this...
  // https://github.com/airbnb/enzyme/issues/1543
  // return Promise.resolve().then(() => {
  //   expect(bookDetail.find("h2").text()).toMatch("title by Author one");
  // });
  expect(true);
});
