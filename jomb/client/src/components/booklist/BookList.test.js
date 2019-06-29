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

it("renders a list of authors", () => {
  const books = [
    {
      _id: 1,
      title: "title",
      authors: ["Author One", "Second Author"]
    }
  ];
  const bookList = shallow(<BookList books={books} />);
  expect(bookList.find(".book-author").text()).toMatch(
    "Author One, Second Author"
  );
});

it("renders a book with no authors (empty array)", () => {
  const books = [
    {
      _id: 1,
      title: "Title",
      authors: []
    }
  ];
  const bookList = shallow(<BookList books={books} />);
  expect(bookList.find(".book-author").text()).toHaveLength(0);
});

it("renders a book with no authors (undefined)", () => {
  const books = [
    {
      _id: 1,
      title: "Title"
    }
  ];
  const bookList = shallow(<BookList books={books} />);
  expect(bookList.find(".book-author").text()).toHaveLength(0);
});

it("renders a book with no title (empty string)", () => {
  const books = [
    {
      _id: 1,
      title: "",
      authors: []
    }
  ];
  const bookList = shallow(<BookList books={books} />);
  expect(bookList.find(".book-title").text()).toHaveLength(0);
});

it("renders a book with no title (undefined)", () => {
  const books = [
    {
      _id: 1,
      authors: []
    }
  ];
  const bookList = shallow(<BookList books={books} />);
  expect(bookList.find(".book-title").text()).toHaveLength(0);
});

it("does not render books missing an id", () => {
  const books = [
    {
      _id: 1,
      title: "Success",
      authors: []
    },
    {
      title: "Failure",
      authors: []
    }
  ];
  const bookList = shallow(<BookList books={books} />);
  expect(bookList.find(".book-title").text()).not.toMatch("Failure");
});
