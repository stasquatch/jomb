const mongoose = require("mongoose");
const Location = require("../models/location");

exports.getAllLocations = async (req, res) => {
  let locations = await Location.find({}, (err, locations) => {
    if (err) return res.send(err);
    res.json(locations);
  });
};
