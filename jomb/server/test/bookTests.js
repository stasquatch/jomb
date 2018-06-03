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

chai.use(chaiHttp);

describe("Books", () => {
  beforeEach(done => {
    Book.remove({}, err => {
      if (err) return err;
    });
    Tag.remove({}, err => {
      if (err) return err;
    });
    ChangeHistory.remove({}, err => {
      if (err) return err;
    });
    BookLocation.remove({}, err => {
      if (err) return err;
    });
    done();
  });

  describe("/GET books", () => {
    it("should get all existing books", done => {
      chai
        .request(server)
        .get("/book")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.lengthOf(0);
          done();
        });
    });
  });

  describe("/GET book", () => {
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

  describe("/POST book", () => {
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
            .eql("There was an error adding your book");
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
            res.body.should.not.have.property("errors");
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
                res.body[0].should.have.property("description").eql("Add");
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

  describe("/DELETE/:id book", () => {
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
              res.body.should.not.have.property("errors");
              done();
            });
        });
    });
  });
});
