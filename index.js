// require("dotenv").config();
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var morgan = require("morgan");
const port = 5000
const app = express();

var userService = require("./domain/services/userService");
var dataService = require("./domain/services/dataService");

app.use(cors());

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    hello: "world",
  });
});

app.post("/api/user/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await userService.signUp(name, email, password);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/user/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const fecthedUser = await userService.signIn(email, password);
    res.json(fecthedUser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/data/getData", async (req, res) => {
  const { id } = req.body;
  try {
    const data = await dataService.getData(id);
    res.json(data);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/data/createData", async (req, res) => {
  const { id,
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
    numberOfRepay } = req.body;
    console.log(id)
  try {
    const newData = await dataService.createData(id,
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
      numberOfRepay,);
    res.json(newData);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/user/update", async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUsser = await userService.editUser(name, email);
    res.json(updatedUsser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
