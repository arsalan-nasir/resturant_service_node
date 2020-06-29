process.env.NODE_ENV = process.env.NODE_ENV || "development";

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

app.get("/", resturantController.getAllData);
app.post("/put", resturantController.postData);
app.delete("/:id", resturantController.removeDataById);

app.listen(config.port, () =>
  console.log("Server Started at Port " + config.port)
);
