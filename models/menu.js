const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  category: {
    type: Array, 
    required: true,
  },
});

module.exports = mongoose.model("menu", menuSchema);
