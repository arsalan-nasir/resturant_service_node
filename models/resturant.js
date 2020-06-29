const mongoose = require("mongoose");

const resturantScheme = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("resturants", resturantScheme);
