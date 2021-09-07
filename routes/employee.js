const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.js')
 const EmployeeController = require('../controllers/EmployeeController.js');
const authenticate = require('../middleware/authenticate');
 router.get('/', authenticate, EmployeeController.index);

 router.post('/show', EmployeeController.show);

 router.post('/store',  authenticate, upload.single('avatar'), EmployeeController.store);
 router.post('/update', EmployeeController.update);
 router.delete('/delete/:id', EmployeeController.destroy);

module.exports = router;


