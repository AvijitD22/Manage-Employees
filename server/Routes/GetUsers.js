const express = require("express");
const router = express.Router();
const Employees = require("../Models/EmployeeSchema");

router.get("/user", async (req, res) => {
  try {
    const users = await Employees.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
