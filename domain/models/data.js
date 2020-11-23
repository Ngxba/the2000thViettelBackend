const mongoose = require("../../db.js");
var Schema = mongoose.Schema;

var clientData = new Schema({
  id: String, 
  label: Number , 
  col_19: Number, 
  age: Number,
  gender: Number,
  city: String,
  district: String,
  numberOfCall: Number, 
  numberOfContactAll: Number, 
  numberOfAppearance: Number, 
  numberBeCalled: Number,
  uploadDataMean: Number,
  uploadDataMin: Number,
  uploadDataMax: Number,
  downloadDataMean: Number,
  downloadDataMin: Number,
  downloadDataMax: Number,
  timecall_mean: Number,
  timecall_max: Number,
  timecall_min: Number,
  numberOfRecharge: Number,
  numberOfLoan: Number,
  numberOfRepay: Number
});
const ClientData = mongoose.model("clientsData", clientData);

module.exports = ClientData;
