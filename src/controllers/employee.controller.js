const Employee = require("../models/employee.model")
module.exports.addEmployee = async (req,res) => {
    let contact = req.body.contact.trim()
    contact = contact.replace(/ +/g, "");  //Remove white space between numbers
    const checkIsNumberRagex = /^[0-9]{10}$/; //Ragex Condition
    

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
        });
        newEmployee.save().then(() => console.log('1 Data Uploaded'));
        res.sendStatus(200);
    }
}
module.exports.updateEmployeeStatus = async (req,res) =>{
    if(req.body.employementStatus.trim().length === 0){
        res.sendStatus(406);
    }
    else{
        let doc = await Employee.findOneAndUpdate({_id : req.body._id} , {employementStatus:req.body.employementStatus});
        res.sendStatus(200);
    }
    
}