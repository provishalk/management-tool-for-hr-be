const Employee = require("../models/employee.model")
module.exports.addEmployee = async (req,res) => {
    let contact = req.body.contact.trim()
    contact = contact.replace(/ +/g, "");  //Remove white space between numbers
    const checkIsNumberRagex = /^[0-9]{10}$/; //Ragex Condition
    const date = new Date(req.body.joiningDate)

    if (req.body.firstName.trim().length === 0 //Check Employee Name is empty or not
        || req.body.lastName.trim().length === 0 //Check Employee Name is empty or not
        || req.body.employementStatus.trim().length === 0 //Check Employee status is empty or not
        || (await Employee.find({"contact":contact})).length != 0 //Check Employee already exist or not
        || !checkIsNumberRagex.test(contact) //Check contact number is of length 10 and does not contain any string
        
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
module.exports.updateEmployeeStatus = async (req,res) =>{
    const date = new Date(req.body.leavingDate)
    if(req.body.employementStatus.trim().length === 0){
        res.sendStatus(406);
    }
    else{
        if(req.body.employementStatus.toUpperCase() === "LEAVED"){
            if(date == "Invalid Date"){
                await Employee.findOneAndUpdate({_id : req.body._id},{employementStatus:req.body.employementStatus,leavingDate: new Date()} );
            }
            else{
                await Employee.findOneAndUpdate({_id : req.body._id} , {employementStatus:req.body.employementStatus,leavingDate: date});
            }
        }
        else{
            await Employee.findOneAndUpdate({_id : req.body._id},{employementStatus:req.body.employementStatus,leavingDate: null} );
        }
        res.sendStatus(200);
    }
}