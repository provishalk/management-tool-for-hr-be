const mongoose = require("mongoose");

const EmployeeModel = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        designation: String,
        department: String,
        employementStatus: String,
        address: String,
        contact: String,
    }
  );
  
  module.exports = mongoose.model("employee", EmployeeModel);
  