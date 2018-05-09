export const FETCH_BOOKS = "FETCH_BOOKS";
export const FETCH_BOOK = "FETCH_BOOK";

export function fetchBooks() {
  const fakeBooks = import("../tests/test_data/starterBooks.json");
  return {
    type: FETCH_BOOKS,
    payload: fakeBooks
  };
}

export function fetchBook(id) {
  const fakeBooks = import("../tests/test_data/starterBooks.json");
  return {
    type: FETCH_BOOK,
    payload: fakeBooks
  };
}
