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
