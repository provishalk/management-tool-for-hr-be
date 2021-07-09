const Employee = require("../models/employee.model")
module.exports.addEmployee = (req,res) => {
    if (req.body.FirstName.trim().length === 0
        || req.body.LastName.trim().length === 0
        || req.body.Status.trim().length === 0
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
            Contact: req.body.Contact,
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