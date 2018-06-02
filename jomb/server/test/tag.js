process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

const Tag = require("../models/tag");

chai.use(chaiHttp);

describe("Tags", () => {
  beforeEach(done => {
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

  describe("/GET tag", () => {
    it("it should get all tags", done => {
      chai
        .request(server)
        .get("/tag")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.lengthOf(0);
          done();
        });
    });
  });

  describe("/POST tag", () => {
    it("it should add a tag successfully", done => {
      let tag = new Tag({
        name: "second tag"
      });

      chai
        .request(server)
        .post("/tag")
        .send(tag)
        .end((err, res) => {
          res.body.should.not.have.property("errors");
          res.body.tag.should.have.property("name").eql(tag.name);
          res.body.tag.should.have.property("addedOn");
          done();
        });
    });

    it("it should not add a tag without a name", done => {
      let tag = new Tag();

      chai
        .request(server)
        .post("/tag")
        .send(tag)
        .end((err, res) => {
          res.body.should.have.property("errors");
          res.body.errors.name.should.have
            .property("message")
            .eql("Path `name` is required.");
          done();
        });
    });
  });

  describe("/DELETE/:id tag", () => {
    it("it should delete a tag", done => {
      let tag = new Tag({
        name: "tag to delete"
      });

      tag.save((err, tag) => {
        chai
          .request(server)
          .delete("/tag/" + tag._id)
          .send(tag)
          .end((err, res) => {
            res.body.should.not.have.property("errors");
          });
        done();
      });
    });
  });
});
