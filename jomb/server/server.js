const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const bookController = require("./controllers/bookController");
const tagController = require("./controllers/tagController");
const changeHistoryController = require("./controllers/changeHistoryController");
const config = require("config");
const { addChangeHistoryEvent } = require("./handlers/changeHistory");

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

app.get("/api/healthcheck", (req, res) => res.json({ message: "Success!" }));

app
  .route("/api/book")
  .get(bookController.getBooks)
  .post(bookController.addBook, addChangeHistoryEvent);

app
  .route("/api/book/:id")
  .get(bookController.getBook)
  .delete(bookController.deleteBook, addChangeHistoryEvent)
  .post(bookController.updateBook, addChangeHistoryEvent);

app
  .route("/api/book/:id/:rating")
  .post(bookController.rateBook, addChangeHistoryEvent);

app
  .route("/api/tags/book/:id")
  .post(bookController.addTagToBook, addChangeHistoryEvent);

app
  .route("/api/tag")
  .get(tagController.getTags)
  .post(tagController.addTag)
  .delete(tagController.deleteTag);

app.route("/api/changeHistories").get(changeHistoryController.getAllChanges);

app
  .route("/api/changeHistories/:bookId")
  .get(changeHistoryController.getChangesForBook);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
