const mongoose = require("mongoose");
const Tag = require("../models/tag");
const Book = require("../models/book");

const getTags = async (req, res) => {
  let tags = await Tag.find({}, (err, tags) => {
    if (err) return res.send(err);
    res.json(tags);
  });
};

const addTag = async (req, res) => {
  let tag = await new Tag(req.body).save((err, tag) => {
    if (err) return res.send(err);
    res.json({ message: "Tag successfully added!", tag });
  });
};

const deleteTag = async (req, res) => {
  let tag = await Tag.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.error("Error deleting tag [req.params.id]: ", err);
      return res.send(err);
    }
  });
};

module.exports = { getTags, addTag, deleteTag };
