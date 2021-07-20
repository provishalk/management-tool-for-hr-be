const mongoose = require("mongoose");

const EmpAttendanceModel = mongoose.Schema(
    {
        employeeId: String,
        dayLog: [{ timeIn: Date, timeOut: Date, totalTimeOfDay: String }],
        totalWorkingHours: String
    }
);

module.exports = mongoose.model("empAttendance", EmpAttendanceModel);