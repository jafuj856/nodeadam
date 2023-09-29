var db = require('../config/connection')
var collection = require('../config/colection')
var jwt = require('jsonwebtoken')
var myjwt = require('../config/jwt')
//var objectId = require('mongodb').objectId
const { ObjectId } = require('mongodb')
module.exports={

    doSiginUp(userData,callback) {
        
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((responts)=>{
              console.log(responts.insertedId)
              callback(responts.insertedId)
            })
    },
    doLogin(userData) {
        return new Promise(async(resolve,reject)=>{
          try{
        let user = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
       if(user){
         if(user.password==userData.password){
           
           //console.log(user1.id)
        const token = jwt.sign({ userId: user._id },myjwt.jwtSecret,
        {expiresIn:myjwt.jwtExpiresIn})
        resolve(token)
        }else{
            resolve('incurect Password')
        }
       } else{
        resolve("user not fond")
       }
       } catch(err){
         reject(err)
       }
       }
       )
         
    
    },
    viewProfile(userid){
        return new Promise((resolve,reject)=>{
       db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectId(userid)}).then((user)=>{
        if(user){
        resolve(user.name)
        }
        else{
          resolve("user not found")
        }
       }).catch((err)=>{
        reject(err)
       })
    })
    },
    editProfile(userid,userDetailse){
        console.log(userid)
        return new Promise((resolve,reject)=>{

        
        db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectId(userid)},
        {
            $set:{
                name:userDetailse.name
            }
        }).then((responts)=>{
          resolve()  
        }).catch((err)=>{
          reject(err)
        })
        
    })
}

}