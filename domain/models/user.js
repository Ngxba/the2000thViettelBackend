const mongoose = require("../../db.js");
var Schema = mongoose.Schema;

var user = new Schema({
  name: String,
  email: String,
  password: String,
  roll : String
});

const Users = mongoose.model("users", user);

module.exports = Users;
