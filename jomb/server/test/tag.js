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
      let tag = new Tag({
        name: "first tag"
      });

      tag.save();

      chai
        .request(server)
        .get("/tag")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.lengthOf(1);
          res.body[0].should.have.property("name").eql(tag.name);
          done();
        });
    });
  });
});
