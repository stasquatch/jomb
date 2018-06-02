process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Book = require("../models/book");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Books", () => {
  beforeEach(done => {
    Book.remove({}, err => {
      done();
    });
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

  describe("/POST book", () => {
    it("it should add a new book", done => {
      let book = new Book({
        title: "Testing book 1",
        author: "Test Author 1"
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
            .property("author")
            .eql(book.author);
          done();
        });
    });

    it("it should not add a book missing a title", done => {
      let book = new Book({
        author: "Testing author 2"
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
        title: "Testing author 2"
      });

      chai
        .request(server)
        .post("/book")
        .send(book)
        .end((err, res) => {
          res.body.should.have.property("errors");
          res.body.errors.author.should.have
            .property("message")
            .eql("Path `author` is required.");
          done();
        });
    });
  });
});
