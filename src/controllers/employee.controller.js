const Employee = require("../models/employee.model")
module.exports.addEmployee = async (req,res) => {
    let contact = req.body.Contact.trim()
    contact = contact.replace(/ +/g, "");  //Remove white space between numbers
    const checkIsNumberRagex = /^[0-9]{10}$/; //Ragex Condition
    

    if (req.body.FirstName.trim().length === 0 //Check Employee Name is empty or not
        || req.body.LastName.trim().length === 0 //Check Employee Name is empty or not
        || req.body.Status.trim().length === 0 //Check Employee status is empty or not
        || !!await Employee.find({"Contact":contact}) //Check Employee already exist or not
        || checkIsNumberRagex.test(contact) //Check contact number is of length 10 and does not contain any string
        
    ) {
        res.sendStatus(406);
    }
    else {
        const newEmployee = new Employee({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Designation: req.body.Designation,
            Department: req.body.Department,
            Status: req.body.Status,
            Address: req.body.Address,
            Contact: contact,
        });
        newEmployee.save().then(() => console.log('1 Data Uploaded'));
        res.sendStatus(200);
    }
}
module.exports.updateEmployeeStatus = async (req,res) =>{
    if(req.body.Status.trim().length === 0){
        res.sendStatus(406);
    }
    else{
        let doc = await Employee.findOneAndUpdate({_id : req.body._id} , {Status:req.body.Status});
        res.sendStatus(200);
    }
    
}