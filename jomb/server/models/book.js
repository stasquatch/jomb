const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  authors: {
    type: [String],
    required: true
  },
  addedOn: {
    type: Date,
    default: Date.now
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  changeHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "ChangeHistory"
    }
  ],
  location: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location"
    }
  ]
});

module.exports = mongoose.model("Book", BookSchema);
