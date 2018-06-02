const mongoose = require("mongoose");
const Tag = require("../models/tag");

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

module.exports = { getTags, addTag };
