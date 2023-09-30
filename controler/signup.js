var userhelper = require('../helpers/userhelper');
function signup(req,res){
   console.log('++++++++')
    userhelper.doSiginUp(res,req.body,(response)=>{
      console.log(response)
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
        res.json(response)
      })
      

}
module.exports = signup