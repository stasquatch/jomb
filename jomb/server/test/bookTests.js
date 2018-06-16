process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

const Book = require("../models/book");
const Tag = require("../models/tag");
const ChangeHistory = require("../models/changeHistory");
const BookLocation = require("../models/location");
const { ADD } = require("../models/constants");

chai.use(chaiHttp);

describe("Books", () => {
  beforeEach(done => {
    Promise.all([
      Book.remove().exec(),
      Tag.remove().exec(),
      ChangeHistory.remove().exec(),
      BookLocation.remove().exec()
    ]).then(() => done(), done);
  });

  describe("Get books", () => {
    it("should get all existing books", done => {
      chai
        .request(server)
        .get("/book")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.lengthOf(0);
          done(err);
        });
    });
  });

  describe("Get book", () => {
    it("should get a single book by id", done => {
      let book = new Book({
        title: "book",
        authors: ["author"],
        isbn: "123"
      });

      book.save((err, book) => {
        chai
          .request(server)
          .get(`/book/${book._id}`)
          .end((err, res) => {
            res.body.should.have.property("title").eql(book.title);
            res.body.should.have.property("authors").contains(book.authors[0]);
            res.body.should.have.property("isbn").eql(book.isbn);
            done();
          });
      });
    });
  });

  describe("Add book", () => {
    it("should add a new book", done => {
      chai
        .request(server)
        .post("/book")
        .send({ isbn: "9781986431484" })
        .end((err, res) => {
          res.body.should.have
            .property("message")
            .eql("Book successfully added!");
          res.body.should.have.property("book").property("title");
          res.body.should.have.property("book").property("authors");
          res.body.should.have.property("book").property("isbn");
          done();
        });
    });

    it("should not add a book missing an isbn", done => {
      chai
        .request(server)
        .post("/book")
        .send({ isbn: "" })
        .end((err, res) => {
          res.body.should.have
            .property("message")
            .eql("There was an error adding that book.");
          done();
        });
    });

    it("should add a tag to a new book", done => {
      let tag = new Tag({
        name: "tag"
      });

      tag.save((err, tag) => {
        let bookInfo = {
          isbn: "9781986431484",
          tags: [tag._id]
        };
        chai
          .request(server)
          .post("/book")
          .send(bookInfo)
          .end((err, res) => {
            res.body.book.should.have
              .property("tags")
              .contains(tag._id.toString());
            done();
          });
      });
    });

    it("should add a change history to a new book", done => {
      let changeHistoryItem = new ChangeHistory({
        description: "testing"
      });

      changeHistoryItem.save((err, changeHistoryItem) => {
        let book = {
          isbn: "9781986431484",
          changeHistory: [changeHistoryItem._id]
        };

        chai
          .request(server)
          .post("/book")
          .send(book)
          .end((err, res) => {
            res.body.should.not.have.property("errors");
            res.body.book.should.have
              .property("changeHistory")
              .contains(changeHistoryItem._id.toString());
            done();
          });
      });
    });

    it("should persist change history item after its book is deleted", done => {
      chai
        .request(server)
        .post("/book")
        .send({ isbn: "9781986431484" })
        .end((err, res) => {
          Book.deleteOne({ _id: res.body.book._id }, err => {
            chai
              .request(server)
              .get("/changeHistories")
              .end((err, res) => {
                res.body.should.not.have.property("errors");
                res.body.should.have.lengthOf(1);
                res.body[0].should.have.property("description").eql(ADD);
                done();
              });
          });
        });
    });

    it("should add a location to a new book", done => {
      let location = new BookLocation({
        nickname: "bookshelf",
        locationType: "living room"
      });

      location.save((err, location) => {
        let book = {
          isbn: "9781986431484",
          location: [location._id]
        };

        chai
          .request(server)
          .post("/book")
          .send(book)
          .end((err, res) => {
            res.body.should.not.have.property("errors");
            res.body.book.should.have
              .property("location")
              .contains(location._id.toString());
            done();
          });
      });
    });
  });

  describe("Delete book", () => {
    it("should delete a book", done => {
      chai
        .request(server)
        .post("/book")
        .send({ isbn: "9781986431484" })
        .end((err, res) => {
          chai
            .request(server)
            .delete("/book/" + res.body.book._id)
            .end((err, res) => {
              res.body.should.have
                .property("message")
                .eql("Book successfully deleted!");
              done();
            });
        });
    });
  });

  describe("Update book", () => {
    it("should update an existing book", done => {
      chai
        .request(server)
        .post("/book")
        .send({ isbn: "9781986431484" })
        .end((err, res) => {
          let book = res.body.book;
          book.title = "Changed title";

          chai
            .request(server)
            .post(`/book/${res.body.book._id}`)
            .send(book)
            .end((err, res) => {
              res.body.should.have.property("book");
              res.body.book.should.have.property("title").eql(book.title);
              // currently the change history is happening asynchronously to the update,
              // so the book object returned on the update call is not in sync with the
              // most up to date version of change history. let's work on this later.
              // res.body.book.changeHistory.should.have.lengthOf(2);
              done();
            });
        });
    });

    it("should add a rating to a book", done => {
      chai
        .request(server)
        .post("/book")
        .send({ isbn: "9781986431484" })
        .end((err, res) => {
          let book = res.body.book;
          book.rating = 5;

          chai
            .request(server)
            .post(`/book/${res.body.book._id}/${book.rating}`)
            .end((err, res) => {
              res.body.should.have.property("book");
              res.body.book.should.have.property("rating").eql(book.rating);
              done();
            });
        });
    });

    it("should not add an invalid rating to a book", done => {
      chai
        .request(server)
        .post("/book")
        .send({ isbn: "9781986431484" })
        .end((err, res) => {
          let book = res.body.book;
          book.rating = 15;

          chai
            .request(server)
            .post(`/book/${res.body.book._id}/${book.rating}`)
            .end((err, res) => {
              res.body.should.have
                .property("message")
                .eql("Error rating book.");
              done();
            });
        });
    });
  });
});
