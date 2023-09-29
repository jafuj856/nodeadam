var userhelper = require('../helpers/userhelper');
var fs = require('fs')
function viewprofile(req,res ){
    console.log(req.user.userId)
 userhelper.viewProfile(req.user.userId).then((response)=>{
  console.log(response)
  res.json(response)
  
})  
 
}

function editProfile(req,res){
  userhelper.editProfile(req.user.userId,req.body).then(()=>{
    const imagepath = `../nodeadam/public/user-images/${req.user.userId}.jpg`
    if(req.files){
      if(fs.existsSync(imagepath)){
        fs.unlinkSync(imagepath);
      }
      let image =req.files.image
      image.mv('../node/public/user-images/'+req.user.userId+'.jpg')
    }
      res.json(true)
     })
}
module.exports = {viewprofile,editProfile}