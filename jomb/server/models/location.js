const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },
  locationType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Location", LocationSchema);
