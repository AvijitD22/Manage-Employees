const express = require("express");
const router = express.Router();
const Employees = require("../Models/EmployeeSchema");

router.post("/user", async (req, res) => {
  try {
    const { userName, userEmail, userPhone } = req.body;
    const employee = new Employees({ userName, userEmail, userPhone });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
