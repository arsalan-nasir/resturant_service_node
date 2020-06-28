//require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/resturants", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DataBase"));

app.use(express.json());

const returantRoutes = require("./routes/resturant");
app.use("/resturants", returantRoutes);

app.listen(3000, () => console.log("Server Started at Port 3000"));
