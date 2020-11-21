var ClientData = require("../models/data");

const dataService = {
    getData : async (clientID) => {
        let result = await ClientData.find({clientID});
        if (result) {
          return result;
        } else {
          throw new Error("error/Client_not_found");
        }
    }
}

module.exports = dataService;
