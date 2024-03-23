const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPhone: Number,
});

module.exports = mongoose.model("Employees", EmployeeSchema);
