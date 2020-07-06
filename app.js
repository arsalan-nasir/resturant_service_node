process.env.NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const resturantController = require("./controller/resturants");

const options = {
  poolSize: 10,
  reconnectTries: Number.MAX_VALUE,
  keepAlive: 1,
  socketTimeoutMS: 90000,
  connectTimeoutMS: 90000,
  auto_reconnect: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(config.mongo.uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  (err) => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

app.use(express.json());

app.get("/resturants/getAllResturants", resturantController.getAllData);
app.get(
  "/resturants/getResturantsByLocation",
  resturantController.getResturantsByLocation
);
app.get("/resturants/getResturantsById/:id", resturantController.getDataById);
app.get(
  "/resturants/getResturantsByCategory",
  resturantController.getDataByCategory
);
app.get(
  "/resturants/menu/getByResturants/:id",
  resturantController.getMenuByResturants
);
app.post("/resturants/addResturant", resturantController.postData);
app.post("/resturants/menu/add/:id", resturantController.postMenu);
app.put("/resturants/updateResturantsById/:id", resturantController.updateById);
app.delete("/resturants/:id", resturantController.removeDataById);

//#########################
app.listen(PORT, () => console.log("Server Started at Port " + PORT));
