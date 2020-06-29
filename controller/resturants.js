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
  const no = Math.floor(Math.random() * 10000);
  const data = new Resturants({
    _id: no,
    name: req.body.name,
  });
  try {
    const result = await data.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeDataById = async function (req, res) {
  try {
    Resturants.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) res.status(500).json(err);
      res.status(200).json("Succesfully Delted Data of ID : " + result._id);
    });
  } catch (err) {
    if (err) throw err;
  }
};
