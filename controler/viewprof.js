var userhelper = require('../helpers/userhelper');
var fs = require('fs')
function viewprofile(req,res ){
  res.json(true)
    console.log(req.user.userId)
 userhelper.viewProfile(req.user.userId).then((response)=>{
  res.json(response)
  
}) 
}module.exports = viewprofile