const Resturants = require("../models/resturant");
const Menu = require("../models/menu");

exports.getAllData = async function (req, res) {
  let { sort, size, page } = req.query;

  if (!sort) {
    sort = `updatedAt,asc`;
  }
  const Page = Number(page * size);
  const Size = Number(size);
  const totalElements = await Resturants.countDocuments();
  const pageable = { Page, Size, totalElements };
  try {
    const result = await Resturants.find()
      .limit(Size)
      .sort({ [sort.split(",")[0]]: `${sort.split(",")[1]}` });
    const data = { result, pageable };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateById = async function (req, res) {
  try {
    await Resturants.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err, result) => {
        if (err) res.status(500).json(err);
        res.status(200).json(result);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDataById = async function (req, res) {
  try {
    await Resturants.findById(req.params.id, (err, result) => {
      if (err) res.status(500).json(err);
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.postData = async function (req, res) {
  const data = new Resturants({
    title: req.body.title,
    location: req.body.location,
    code: req.body.code,
    category: req.body.category,
  });
  try {
    const result = await data.save();
    console.log(result._id);
    const info = new Menu({
      _id: result._id,
      category: [],
    });
    const menuResult = await info.save();
    console.log(menuResult);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDataByCategory = async function (req, res) {
  try {
    const result = await Resturants.find({ category: req.query.category });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeDataById = async function (req, res) {
  try {
    Resturants.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) res.status(500).json(err);
      res.status(200).send(result);
    });
  } catch (err) {
    if (err) throw err;
  }
};

exports.getResturantsByLocation = async function (req, res) {
  try {
    const result = await Resturants.find({ location: req.query.location });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postMenu = async function (req, res) {
  try {
    const category = { category: req.body };
    console.log(category);
    await Menu.findByIdAndUpdate(req.params.id, category, (err, result) => {
      console.log(result);
      if (err) res.status(500).json(err);
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMenuByResturants = async function (req, res) {
  try {
    await Menu.findById(req.params.id, (err, result) => {
      if (err) res.status(500).json(err);
      if (result.category.length > 0) {
        res.status(200).json(result.category[0][req.params.type]);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
