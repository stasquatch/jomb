const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  addedOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tag", TagSchema);
