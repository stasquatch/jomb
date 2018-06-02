process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

const Book = require("../models/book");
const Tag = require("../models/tag");
const ChangeHistory = require("../models/changeHistory");
const Location = require("../models/location");

chai.use(chaiHttp);

describe("Books", () => {
  beforeEach(done => {
    Book.remove({}, err => {
      if (err) return err;
    });
    Tag.remove({}, err => {
      if (err) return err;
    });
    done();
  });

  describe("healthcheck", () => {
    it("it should pass the healthcheck", done => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Success!");
          done();
        });
    });
  });

  describe("/GET book", () => {
    it("it should get all existing books", done => {
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

  describe("/POST book", () => {
    it("it should add a new book", done => {
      let book = new Book({
        title: "Testing book 1",
        authors: ["Test Author 1"],
        isbn: "isbn"
      });
      chai
        .request(server)
        .post("/book")
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("Book successfully added!");
          res.body.should.have
            .property("book")
            .property("title")
            .eql(book.title);
          res.body.should.have
            .property("book")
            .property("authors")
            .eql(book.authors);
          res.body.should.have
            .property("book")
            .property("isbn")
            .eql(book.isbn);
          done();
        });
    });

    it("it should not add a book missing a title", done => {
      let book = new Book({
        author: ["Testing author 2"],
        isbn: "isbn"
      });

      chai
        .request(server)
        .post("/book")
        .send(book)
        .end((err, res) => {
          res.body.should.have.property("errors");
          res.body.errors.title.should.have
            .property("message")
            .eql("Path `title` is required.");
          done();
        });
    });

    it("it should not add a book missing an author", done => {
      let book = new Book({
        title: "Testing title 2",
        isbn: "isbn"
      });

      chai
        .request(server)
        .post("/book")
        .send(book)
        .end((err, res) => {
          res.body.book.should.have.property("authors").with.lengthOf(0);
          done();
        });
    });

    it("it should not add a book missing an isbn", done => {
      let book = new Book({
        title: "title",
        authors: ["author"]
      });

      chai
        .request(server)
        .post("/book")
        .send(book)
        .end((err, res) => {
          res.body.should.have.property("errors");
          res.body.errors.isbn.should.have
            .property("message")
            .eql("Path `isbn` is required.");
          done();
        });
    });

    it("it should add a tag to a new book", done => {
      let tag = new Tag({
        name: "tag"
      });

      tag.save();

      let book = new Book({
        title: "title",
        authors: ["author"],
        isbn: "isbn",
        tags: [tag._id]
      });

      chai
        .request(server)
        .post("/book")
        .send(book)
        .end((err, res) => {
          res.body.should.not.have.property("errors");
          res.body.book.should.have
            .property("tags")
            .contains(tag._id.toString());
          done();
        });
    });

    it("it should add a change history to a new book", done => {
      let changeHistoryItem = new ChangeHistory({
        description: "testing"
      });

      changeHistoryItem.save();

      let book = new Book({
        title: "title",
        authors: ["author"],
        isbn: "isbn",
        changeHistory: [changeHistoryItem._id]
      });

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

    it("it should add a location to a new book", done => {
      let location = new Location({
        nickname: "bookshelf",
        locationType: "living room"
      });

      location.save();

      let book = new Book({
        title: "title",
        authors: ["author"],
        isbn: "isbn",
        location: [location._id]
      });

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
