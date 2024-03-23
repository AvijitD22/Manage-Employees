const express = require("express");
const router = express.Router();
const Employee = require("../Models/EmployeeSchema");

router.put("/user", async (req, res) => {
  try {
    const { employeeId, userName, userEmail, userPhone } = req.body;

    const updateFields = {};
    if (userName) updateFields.userName = userName;
    if (userEmail) updateFields.userEmail = userEmail;
    if (userPhone) updateFields.userPhone = userPhone;

    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      updateFields,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee Details Updated", employee });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Server Error" });
  }
});

module.exports = router;
