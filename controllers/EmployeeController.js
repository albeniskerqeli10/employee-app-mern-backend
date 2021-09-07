// Import the Employee Model
const Employee = require('../models/Employee');
const User = require('../models/User');
const  auth = require('../routes/auth');

//Show the list of employees
const index = async (req, res) => {
try {
    const employees = await Employee.find({ user:req.user.user.id});
    res.json(employees);
    
} catch (error) {
    console.log(error);
    
}


}


//Create a new employee
const store = async (req, res) => {
    try {
        let newEmployee = new Employee({
            name: req.body.name,
            designation: req.body.designation,
            user:req.user.user.id,
            email: req.body.email,
            phone: req.body.phone,
            salary: req.body.salary, 
        })
        const employee = await newEmployee.save();
        res.json(employee);
    }

    catch(err){
        console.log(err);

    }
    
    if(req.file) {
        newEmployee.avatar = req.file.path;
    }
}

//Show the details of a single employee
const show = async (req, res) => {
    let employeeID = req.body.employeeID;
   
   await Employee.findById(employeeID).then(response => {
        res.json({response})
    }).catch(err => {
        res.json({error:'An error Occurred'})
    })
}



//update an employee
const update = async (req, res) => {
    let updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,

    }
    await Employee.findByIdAndUpdate(employeeID, updatedData).then(response => {
        res.json({message:'Employee Updated Successfully'})
    }).catch(err => {
        res.json({error:'An error Occured'})
    })
}

// Delete an employee
const destroy = async (req, res,next) => {
 let employee = await Employee.findById(req.params.id);
 if(!employee) {
     res.json({error:'Employee does not exist'})
 }
 else {
     await Employee.findByIdAndDelete(req.params.id).then(response => {
         res.json({message:'Employee Deleted Successfully'})
     }).catch(err => {
         res.json({error:'An error Occured'})
     })
 }
}

module.exports = {
    index,show,store,update,destroy
}


