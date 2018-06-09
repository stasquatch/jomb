const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeHistorySchema = new Schema({
  updatedDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  detail: String,
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book"
  }
});

module.exports = mongoose.model("ChangeHistory", ChangeHistorySchema);
