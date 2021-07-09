const mongoose = require("mongoose");

const EmployeeModel = mongoose.Schema(
    {
        FirstName: String,
        LastName: String,
        Designation: String,
        Department: String,
        Status: String,
        Address: String,
        Contact: String,
    }
  );
  
  module.exports = mongoose.model("employee", EmployeeModel);
  