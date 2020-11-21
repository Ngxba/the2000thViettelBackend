const mongoose = require("../../db.js");
var Schema = mongoose.Schema;

var clientData = new Schema({
  ID: String,
  Address: String,
  numberOfCall: Number,
  numberOfSuccessCall: Number,
  numberOfCall1: Number,
  numberOfCall2: Number,
  numberOfCall3: Number,
  numberOfCall7: Number,
  meanTimeCall: Number,
  totalNumberOfUploadData: Number,
  totalNumberOfDownloadData: Number,
  numberOfTimeLoan: Number,
  numberOfTimeRepay: Number,
  totalLoanMoney: Number,
  userScore: Number,
  Label: Number
});

const ClientData = mongoose.model("clientsData", clientData);

module.exports = ClientData;
