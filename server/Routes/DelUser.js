const express = require("express");
const router = express.Router();
const Employee = require("../Models/EmployeeSchema");

router.delete("/user", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.deleteOne();
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
