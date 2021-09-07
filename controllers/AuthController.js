// import the required modules
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
//define the register route
const show = async (req,res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }
  catch(err) {
    res.json(err);
  }
}


const register = async (req, res) => {
  const email = req.body.email;
  let user = await User.findOne({ email });
  if (user){
    res.json({
      error: "Email already exists",
    });
  }
 else {
  bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPass,
      });
      user.save()
        .then((user) => {
          res.json({
            message: "User created successfully",
          });
        })
        .catch((err) => {
          res.json({
            error: "An error occurred",
          });
        });
    
  });
}


};

// define the login route
const login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({
    $or: [{ name: username }, { email: username }, { phone: username }],
  }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({ error: err });
        }
        if (result) {
          const payload = {
            user:{
              id:user.id,
              name:user.name,
            }
          }
          let token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
            expiresIn: process.env.EXPIRE_TIME,
          });
          let refreshtoken = jwt.sign({name:user.name}, process.env.REFRESH_TOKEN , {expiresIn:process.env.REFRESH_EXPIRE_TIME});
          res.json({
            message: "Login Successful",
            id:console.log(payload),
            token,
          });
          console.log(res);
        } else {
          res.json({
            error: "Invalid Password",
          });
        }
      });
    } else {
      res.json({
        error: "No user found",
      });
    }
  });
};

const refreshToken= async (req, res) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken , process.env.REFRESH_TOKEN, function(err,decode){
     if(err) {
       res.status(400).json({
         err
       })
     } else{
       let token = jwt.sign({name:decode.name}, process.env.ACCESS_TOKEN, {expiresIn: process.env.EXPIRE_TIME});
       let refreshToken = req.body.refreshToken;
       res.status(200).json({
         message:'Token refreshed successfully'
       })
     }
  })
}
module.exports = {
  register,
  login,
  refreshToken
};
