var ClientData = require("../models/data");

const dataService = {
  getData: async (clientID) => {
    let result = await ClientData.find({ clientID });
    if (result) {
      return result;
    } else {
      throw new Error("error/Client_not_found");
    }
  },
  createData: async (
    id,
    label,
    col_19,
    age,
    gender,
    city,
    district,
    numberOfCall,
    numberOfContactAll,
    numberOfAppearance,
    numberBeCalled,
    uploadDataMean,
    uploadDataMin,
    uploadDataMax,
    downloadDataMean,
    downloadDataMin,
    downloadDataMax,
    timecall_mean,
    timecall_max,
    timecall_min,
    numberOfRecharge,
    numberOfLoan,
    numberOfRepay
  ) => {
    const result = await ClientData.findOne({ id: id });
    if (!result) {
      const userData = ClientData({
        id,
        label,
        col_19,
        age,
        gender,
        city,
        district,
        numberOfCall,
        numberOfContactAll,
        numberOfAppearance,
        numberBeCalled,
        uploadDataMean,
        uploadDataMin,
        uploadDataMax,
        downloadDataMean,
        downloadDataMin,
        downloadDataMax,
        timecall_mean,
        timecall_max,
        timecall_min,
        numberOfRecharge,
        numberOfLoan,
        numberOfRepay,
      });
      await userData.save();
      return userData;
    } else {
      throw new Error("USER_EXISTED");
    }
  },
};

module.exports = dataService;
