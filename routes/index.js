var express = require('express');
var router = express.Router();
var authenticate = require('../middleware/authenticateToken')
var signup = require('../controler/signup')
var login = require('../controler/login')
var {viewprofile,editProfile} = require('../controler/profile')

router.get('/',(req,res)=>{
  res.json(true)
})
router.post('/signup',signup)
  
 
router.post('/login',login)

router.get('/view-profile',authenticate,viewprofile)
router.put('/user-edit',authenticate,editProfile)
module.exports = router; 
