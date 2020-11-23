// require("dotenv").config();
var mongoose = require("mongoose");
const db = {
    url : `mongodb+srv://admin:admin@cluster0.hsod6.mongodb.net/The2000thViettel?retryWrites=true&w=majority`,
    option : {
        useNewUrlParser : true // de sp mongo cho su dung db cua no
    }
}

mongoose.connect(db.url, db.option);

module.exports = mongoose;
