// Import express package,  the router and the controller

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController.js');
const authenticate = require('../middleware/authenticate');
const User = require('../models/User');
// post request to register a new user
router.get('/get'  , authenticate, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
      }
      catch(err) {
        res.json(err);
      }

} )
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;