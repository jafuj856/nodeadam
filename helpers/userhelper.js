var db = require("../config/connection");
var collection = require("../config/colection");
var jwt = require("jsonwebtoken");
var myjwt = require("../config/jwt");
//var objectId = require('mongodb').objectId
const { ObjectId } = require("mongodb");
module.exports = {
  async doSiginUp (res,userData, callback) {
    const emailformat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let email = emailformat.test(userData.email)
    if(email){
      let checkemail = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
     console.log(checkemail)
      if(!checkemail){
    db.get()
      .collection(collection.USER_COLLECTION)
      .insertOne(userData)
      .then((responts) => {
        console.log(responts.insertedId);
        
        callback({status:'successfully registerd'});
        res.status(201)
      });
    }
    else{
      res.status(409)
      callback({status:'this email is exist'})
      
    }
    }else{
      
      callback({status:'invalid email'})
      res.status(401)
    }
  },
    doLogin(res,userData) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .findOne({ email: userData.email });
        if (user) {
          if (user.password == userData.password) {
            //console.log(user1.id)
            const token = jwt.sign({ userId: user._id }, myjwt.jwtSecret, {
              expiresIn: myjwt.jwtExpiresIn,
            });
            resolve(token);
            res.status(200)
          } else {
            
            resolve({status:"incorrect Password"});
            res.status(401)
          }
        } else {
         
          resolve({status:"user not found"});
          res.status(404)
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  viewProfile(res,userid) {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ _id: ObjectId(userid) })
        .then((user) => {
          if (user) {
            resolve(user.name);
            res.status(200)
          } else {
            
            resolve("user not found");
            res.status(404)
          }
        })
        .catch((err) => {
          reject(err);
          res.status(401)
        });
    });
  },
  editProfile(res,userid, userDetailse) {
    return new Promise((resolve, reject) => {
      let username = userDetailse.name;
      if(username){
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: ObjectId(userid) },
          {
            $set: {
              name: userDetailse.name,
            },
          }
        )
        .then((responts) => {
          
          resolve({status:"your profile updated"});
          
        })
        .catch((err) => {
          reject(err);
        });
      }
      else{
       
        resolve({status:"profile not updated"})
        res.status(404)
      }
    });
  },
};
