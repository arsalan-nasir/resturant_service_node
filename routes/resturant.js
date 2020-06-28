const express = require("express");
const router = express.Router();
const Resturant = require("../models/resturant");

router.get("/get", async (req, res) => {
  try {
    const data = await Resturant.find();
    res.send(data);
    //    res.send("Hello");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/put", async (req, res) => {
  const data = new Resturant({
    name: req.body.name,
  });
  try {
    const result = await data.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
