const bcrypt = require('bcrypt');
const { userModel } = require('../../models/userModel');
let jwt = require('jsonwebtoken')
const saltRounds = 10;

let register = async (req , res)=>{
    let {userName, userPhone, userEmail, userPassword} = (req.body)

    let resobj

    const hashPassword = bcrypt.hashSync(userPassword, saltRounds);
    
    try{
        let insertObj = {
            userName,
            userPhone,
            userEmail,
            userPassword : hashPassword,
        }

        let user = await userModel.insertOne(insertObj);
         resobj = {
            status : 1,
            mgs : 'user created...!',
            user
        }
        res.send(resobj);
    }
    catch(error){
          resobj = {
            status : 1,
            mgs : 'EmailId already Exists...!',
            user
        }
    }
}



let login = async (req,res)=>{
    let {userEmail, userPassword} = req.body;
    let myRes;

    let checkEmail = await userModel.findOne({userEmail : userEmail})
    if(checkEmail){

        let dbPassword = checkEmail.userPassword;

        if(bcrypt.compareSync(userPassword, dbPassword))
        {

            let user = {
                userName : checkEmail.userName,
                id : checkEmail._id,
            }

            let token = jwt.sign(user,process.env.TOKENKEY);

            myRes = {
            status : 1,
            mgs : "Login Succesfully...!",
            user,
            token
             }
        }

        else{
           myRes ={
            status : 0,
            mgs : "Invalid Password"
           }
        }
     }


    else{
        myRes ={
            status : 0,
            mgs : "Invalid Email Id"
        }
    }
    
    res.send(myRes)
}



let changePassword = async (req,res)=>{
     let {currentPassword,newPassword,confirmPassword,userId} = req.body;

    let resObj;

     let userData = await userModel.findOne({_id : userId})

     let dbPassword = userData.userPassword // yaha per ham abhi database ka password le rahe hai jo encrypt hai
     if(bcrypt.compareSync(currentPassword, dbPassword)){
              
       if(newPassword == confirmPassword){
           
          const hashPassword = bcrypt.hashSync(newPassword, saltRounds);

            await userModel.updateOne({_id : userId} , {$set : {userPassword : hashPassword}})

            resObj = {
                status : 1,
                mgs : 'Password change successfully...!'
            }

       }
       else{
          resObj = {
            status : 0,
            mgs : "New password and Confirm password don't match...!"
          }
       }
     }
     else{
         resObj = {
            status : 0,
             mgs : "Old password don't match...!"
         }
     }

     res.send(resObj)
   
} 

let getUser = async (req,res)=>{
    let {userId} = req.body;

    let userData = await userModel.findOne({_id : userId})

    let resObj = {
        status : 1,
        mgs : 'user Data show...!',
        userData
    }

    res.send(resObj)
}


let UserProfileUpdate = async (req,res)=>{
    let {userId} = req.body;

    const {userName, userEmail, userPhone, userAddress, userGender} = req.body

    let obj;
    
    try {
    let updateUser = {
        userName,
        userEmail,
        userPhone,
        userAddress,
        userGender
    }

    const updateRes = await userModel.updateOne({_id : userId}, {$set: updateUser})

    

     obj = {
        status : 1,
        mgs : 'userProfile successfully update...!',
        updateRes
    }

    

    res.send(obj)
    }
catch(error){
      obj = {
        status : 0,
        mgs : 'userProfile not Updated...!',
        error
      }
      res.send(obj)
}
    
}



let googleLoginCreate = async (req,res)=>{

     let {displayName, email} = req.body;

     let myRes;

     let checkEmail = await userModel.findOne({userEmail : email})

     if(checkEmail){
        let user = {
            userName : checkEmail.userName,
            id : checkEmail._id
        }

        let token = jwt.sign(user, process.env.TOKENKEY)

        myRes = {
            status : 1,
            mgs : 'Login successfully...!',
            user,
            token
        }
     }
     else{
        let insertObj = {
            userName : displayName,
            userEmail : email,
        }
        let myUser = await userModel.insertOne(insertObj)

        let user = {
            userName : myUser.userName,
            id : myUser._id
        }

        let token = jwt.sign(user, process.env.TOKENKEY)

        myRes = {
            status : 1,
            mgs : 'Login Successfully...!',
            user,
            token
        }
     }

     res.send(myRes)
}



module.exports = {register,login,changePassword,getUser, UserProfileUpdate,googleLoginCreate}