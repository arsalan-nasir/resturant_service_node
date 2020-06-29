const Resturants = require("../models/resturant");

exports.getAllData = async function (req, res) {
  try {
    const data = await Resturants.find();
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postData = async function (req, res) {
  const data = new Resturants({
    name: req.body.name,
  });
  try {
    const result = await data.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
