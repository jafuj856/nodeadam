var userhelper = require('../helpers/userhelper');
function signup(req,res){
   console.log('++++++++')
    userhelper.doSiginUp(req.body,(userid)=>{
        if(req.files){
        let image =req.files.image
        console.log(image)
        image.mv('../nodeadam/public/user-images/'+userid+'.jpg',(err,done)=>{
           if(!err){
            console.log(image)
           }else{
            console.log(err)
           }
        })
        }
        res.json(true)
      })
      

}
module.exports = signup