const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const bookController = require("./controllers/bookController");
const tagController = require("./controllers/tagController");
const config = require("config");

// let options = {
//   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
// };

mongoose.connect(config.DBHost);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

if (config.util.getEnv("NODE_ENV") !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res) => res.json({ message: "Success!" }));

app
  .route("/book")
  .get(bookController.getBooks)
  .post(bookController.addBook);

app
  .route("/tag")
  .get(tagController.getTags)
  .post(tagController.addTag);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
