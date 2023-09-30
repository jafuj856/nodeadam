var userhelper = require('../helpers/userhelper');
function login(req,res) {
    userhelper.doLogin(res,req.body).then((responts)=>{
        if(responts){
        res.json({responts})
        }
        else{
          res.json('forgotpassword')
        }
      })
}
module.exports = login