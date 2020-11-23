const csv = require("csv-parser");
const fs = require("fs");
const result = [];
const axios = require('axios');

fs.createReadStream("data_to_export_train.csv")
.pipe(csv({}))
.on("data", (data) => {result.push(data)})
.on("end", async () => {
    for (let i =0; i <= result.length; i++){
        try {
        const res = await axios.post(`http://localhost:5000/api/data/createData`, {
        id: result[i].msisdn,
        label: result[i].label,
        col_19: result[i].COL_19,
        age: result[i].Age,
        gender: result[i].Gender,
        city: result[i].City,
        district: result[i].District,
        numberOfCall: result[i].NUMBER_OF_CALL,
        numberOfContactAll: result[i].NUMBER_OF_CONTACT_ALL,
        numberOfAppearance: result[i].NUMBER_OF_APPEARANCE,
        numberBeCalled: result[i].NUMBER_BE_CALLED,
        uploadDataMean: result[i].UPLOAD_DATA_MEAN,
        uploadDataMin: result[i].UPLOAD_DATA_MIN,
        uploadDataMax: result[i].UPLOAD_DATA_MAX,
        downloadDataMean: result[i].DOWNLOAD_DATA_MEAN,
        downloadDataMin: result[i].DOWNLOAD_DATA_MIN,
        downloadDataMax: result[i].DOWNLOAD_DATA_MAX,
        timecall_mean: result[i].TIMECALL_MEAN,
        timecall_max: result[i].TIMECALL_MAX,
        timecall_min: result[i].TIMECALL_MIN,
        numberOfRecharge: result[i].NUMBER_OF_RECHARGE_MONEY_FLOW,
        numberOfLoan: result[i].NUMBER_OF_LOAN_MONEY_FLOW,
        numberOfRepay: result[i].NUMBER_OF_REPAY_MONEY_FLOW,
        });}
        catch(err) {
            console.log(err);
        }
    }
    console.log('DONE')
})


 