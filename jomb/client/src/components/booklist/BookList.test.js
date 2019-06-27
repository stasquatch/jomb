import React from "react";
import { shallow } from "enzyme";
import BookList from "./BookList";

it("renders a single book", () => {
  const books = [
    {
      _id: 1,
      title: "Test Title",
      authors: ["Author One"]
    }
  ];

  const bookList = shallow(<BookList books={books} />);
  expect(bookList.find(".book-tile-container")).toHaveLength(1);
});

it("renders multiple books", () => {
  const books = [
    {
      _id: 1,
      title: "Test title one",
      authors: ["Author One"]
    },
    {
      _id: 2,
      title: "Test title two",
      authors: ["Author Two"]
    }
  ];

  const bookList = shallow(<BookList books={books} />);
  expect(bookList.find(".book-tile-container")).toHaveLength(2);
});

it("renders books in ascending alphabetical order by book title", () => {
  const books = [
    {
      _id: 1,
      title: "b title one",
      authors: ["Author One"]
    },
    {
      _id: 2,
      title: "A title two",
      authors: ["Author Two"]
    }
  ];

  const bookList = shallow(<BookList books={books} />);
  expect(
    bookList
      .find(".book-tile-container .book-title")
      .first()
      .text()
  ).toMatch("A title two");
});
