var userhelper = require("../helpers/userhelper");
var fs = require("fs");
function viewprofile(req, res) {
  console.log(req.user.userId);
  userhelper.viewProfile(res,req.user.userId).then((response) => {
    console.log(response);
    res.json(response);
  });
}

function editProfile(req, res) {
  userhelper.editProfile(res,req.user.userId, req.body).then((response) => {
    const imagepath = `../nodeadam/public/user-images/${req.user.userId}.jpg`;
    if (req.files) {
      if (fs.existsSync(imagepath)) {
        fs.unlinkSync(imagepath);
      }
      let image = req.files.image;
      image.mv("../nodeadam/public/user-images/" + req.user.userId + ".jpg");
      response={status:"image updated"}
     res.status(200)
      //console.log(response)
    }
    
   res.json(response);
    
  });
}
module.exports = { viewprofile, editProfile };
