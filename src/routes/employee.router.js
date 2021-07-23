const express = require('express'),
router = express.Router(),
employeeController = require("../controllers/employee.controller")

router.post("/addEmployee",employeeController.addEmployee);
router.post("/updateEmployeeStatus",employeeController.updateEmployeeStatus);
router.post("/addAttendance",employeeController.addAttendance);

module.exports = router;