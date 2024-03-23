const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const connectToDB = require("./database");
const getUsers = require("./Routes/GetUsers");
const addUser = require("./Routes/AddUser");
const delUser = require("./Routes/DelUser");
const updateUser = require("./Routes/UpdateUser");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

connectToDB();
app.get("/", (req, res) => {
  res.send("Page Not Found");
});

app.use("/api/", getUsers);
app.use("/api/", addUser);
app.use("/api/", delUser);
app.use("/api/", updateUser);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
