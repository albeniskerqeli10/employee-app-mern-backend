const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User 😘
const userSchema = new Schema({
    name:{
        type: String,
        required:true,
        unique: true,


    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required:true,
        unique: true,


    },
    password:{
        type: String,
        required:true,
        unique: true,


    },


    
},{timestamps:true} ,{collection: 'users'});

userSchema.statics.isThisEmailInUse = async function(email){
    if(!email){
        throw new Error('Invalid Email');
    }
try{
    const user = await this.findOne({email});
    if(user){
        return false;
    }
    return true;
} catch(error){
    console.log('error  inside isThisEmailInUse' , error.message);
}

}
// Export User model 😘
const User = mongoose.model('User', userSchema);

module.exports = User;
