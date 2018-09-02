process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

const Book = require("../models/book");
const ChangeHistory = require("../models/changeHistory");

chai.use(chaiHttp);

describe("Change History", () => {
  beforeEach(done => {
    Promise.all([Book.remove().exec(), ChangeHistory.remove().exec()]).then(
      () => done(),
      done
    );
  });

  it("should add change history item when adding a book", done => {
    chai
      .request(server)
      .post("/api/book")
      .send({ isbn: "9781986431484" })
      .end((err, res) => {
        chai
          .request(server)
          .get(`/api/changeHistories/${res.body.book._id}`)
          .end((err, res) => {
            res.body.should.have.lengthOf(1);
            res.body[0].should.have.property("description").eql("Add");
            done(err);
          });
      });
  });

  it("should add change history item when updating a book", done => {
    chai
      .request(server)
      .post("/api/book")
      .send({ isbn: "9781986431484" })
      .end((err, res) => {
        // update book
        let book = res.body.book;
        book.title = "Changed title";
        chai
          .request(server)
          .post(`/api/book/${res.body.book._id}`)
          .send(book)
          .end((err, res) => {
            // get change histories
            chai
              .request(server)
              .get(`/api/changeHistories/${res.body.book._id}`)
              .end((err, res) => {
                res.body.should.have.lengthOf(2);
                res.body[0].should.have.property("description").eql("Add");
                res.body[1].should.have.property("description").eql("Update");
                done(err);
              });
          });
      });
  });

  it("should add change history item when deleting a book", done => {
    chai
      .request(server)
      .post("/api/book")
      .send({ isbn: "9781986431484" })
      .end((err, res) => {
        let bookId = res.body.book._id;
        chai
          .request(server)
          .delete(`/api/book/${bookId}`)
          .end((err, res) => {
            chai
              .request(server)
              .get(`/api/changeHistories/${bookId}`)
              .end((err, res) => {
                res.body.should.have.lengthOf(2);
                res.body[0].should.have.property("description").eql("Add");
                res.body[1].should.have.property("description").eql("Delete");
                done(err);
              });
          });
      });
  });
});
