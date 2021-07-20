const Employee = require("../models/employee.model");
const EmpAttendance = require("../models/empAttendance.model");

module.exports.addEmployee = async (req, res) => {
    let contact = req.body.contact.trim()
    contact = contact.replace(/ +/g, "");  //Remove white space between numbers
    const checkIsNumberRagex = /^[0-9]{10}$/; //Ragex Condition
    const date = new Date(req.body.joiningDate)

    if (req.body.firstName.trim().length === 0  //Check Employee Name is empty or not
        || req.body.lastName.trim().length === 0    //Check Employee Name is empty or not
        || req.body.employementStatus.trim().length === 0   //Check Employee status is empty or not
        || (await Employee.find({ "contact": contact })).length != 0    //Check Employee already exist or not
        || !checkIsNumberRagex.test(contact)    //Check contact number is of length 10 and does not contain any string

    ) {
        res.sendStatus(406);
    }
    else {
        const newEmployee = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            designation: req.body.designation,
            department: req.body.department,
            employementStatus: req.body.employementStatus,
            address: req.body.address,
            contact: contact,
            joiningDate: date // Year/Month/Date
        });
        console.log(newEmployee);
        newEmployee.save().then(() => console.log('Employee Added'));
        res.sendStatus(200);
    }
}

module.exports.updateEmployeeStatus = async (req, res) => {
    const date = new Date(req.body.leavingDate)
    if (req.body.employementStatus.trim().length === 0) {
        res.sendStatus(406);
    }
    else {
        if (req.body.employementStatus.toUpperCase() === "LEAVED") {
            if (date == "Invalid Date") {
                await Employee.findOneAndUpdate({ _id: req.body._id }, { employementStatus: req.body.employementStatus, leavingDate: new Date() });
            }
            else {
                await Employee.findOneAndUpdate({ _id: req.body._id }, { employementStatus: req.body.employementStatus, leavingDate: date });
            }
        }
        else {
            await Employee.findOneAndUpdate({ _id: req.body._id }, { employementStatus: req.body.employementStatus, leavingDate: null });
        }
        res.sendStatus(200);
    }
}

module.exports.addAttendance = async (req, res) => {

    // JSON FORMAT
    // {
    //     "_id" : "60f2c742be0b68117c02e242",
    //     "timeIn" : "2019/10/1 09:10:00",
    //     "timeOut" : "2019/10/1 18:10:00"
    // }
    const msToHour = (ms) => {
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        return hours;
    }
    const employeeAttendance = await EmpAttendance.find({ employeeId: req.body._id });
    const timeIn = new Date(req.body.timeIn);
    const timeOut = new Date(req.body.timeOut);
    const totalHoursOfDay = msToHour(timeOut.getTime() - timeIn.getTime());


    if (employeeAttendance.length != 0) {

        const dayLog = { timeIn: timeIn, timeOut: timeOut, totalTimeOfDay: totalHoursOfDay };
        const newtotalWorkingHours = Number(employeeAttendance[0].totalWorkingHours) + Number(totalHoursOfDay);

        EmpAttendance.findOneAndUpdate(
            { employeeId: employeeAttendance[0].employeeId },
            {
                $push: { dayLog: dayLog },
                totalWorkingHours: newtotalWorkingHours
            },
            (err, result) => {
                console.log(err)
            })
    }
    else {
        // console.log(timeIn.toLocaleTimeString());
        // console.log(timeOut.toLocaleTimeString());
        const firstTimeAttendance = new EmpAttendance(
            {
                employeeId: req.body._id,
                dayLog: [{ timeIn: timeIn, timeOut: timeOut, totalTimeOfDay: totalHoursOfDay }],
                totalWorkingHours: totalHoursOfDay
            }
        );
        firstTimeAttendance.save().then(() => console.log('attendance Added'));
    }
    res.send("ok");
}