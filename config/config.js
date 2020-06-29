"use strict";
const dotenv = require("dotenv");
dotenv.config();
// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  ip: process.env.IP || "127.0.0.1",
  mongo: {
    uri: process.env.MONGOLAB_URI || "mongodb://localhost/resturants",
  },
};
module.exports = all;
