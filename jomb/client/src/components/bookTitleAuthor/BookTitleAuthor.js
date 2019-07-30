import React from "react";

export default function BookTitleAuthor({ title, authors }) {
  return (
    <h2>
      {title} {authors ? `by ${authors.join(", ")}` : ""}
    </h2>
  );
}
