process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Healthcheck", () => {
  it("should pass the healthcheck", done => {
    chai
      .request(server)
      .get("/api/healthcheck")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Success!");
        done(err);
      });
  });
});
