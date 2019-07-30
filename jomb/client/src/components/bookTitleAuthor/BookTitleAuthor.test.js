import React from "react";
import { shallow } from "enzyme";
import BookTitleAuthor from "./BookTitleAuthor";

it("renders a title and single author", () => {
  const bookTitleAuthor = shallow(
    <BookTitleAuthor title="Title" authors={["Author One"]} />
  );
  expect(bookTitleAuthor.find("h2").text()).toMatch("Title by Author One");
});

it("renders a title and multiple authors", () => {
  const bookTitleAuthor = shallow(
    <BookTitleAuthor title="Title" authors={["Author One", "Author Two"]} />
  );
  expect(bookTitleAuthor.find("h2").text()).toMatch(
    "Title by Author One, Author Two"
  );
});

it("renders a title with no author", () => {
  const bookTitleAuthor = shallow(<BookTitleAuthor title="Title" />);
  expect(bookTitleAuthor.find("h2").text()).toMatch("Title");
});

it("returns empty string if no title and no author", () => {
  const bookTitleAuthor = shallow(<BookTitleAuthor />);
  expect(bookTitleAuthor.find("h2").text()).toMatch(" ");
});
