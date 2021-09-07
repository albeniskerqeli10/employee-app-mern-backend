const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'users'
    
    },

    name: {
        type: String,
    },
    designation:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    salary:{
        type: Number,
    },
    avatar:{
       type:String,
    },



} , {timestamps: true , collection:'employeetable'});


const Employee = mongoose.model('Employee', employeeSchema);


module.exports = Employee;
