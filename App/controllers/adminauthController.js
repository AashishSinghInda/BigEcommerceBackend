

const { transporter } = require("../config/mailConfig")
const { adminModel } = require("../models/adminModel")
let myOTP = new Map()  // Ye function OTP ko backend me store karta hai 

let adminLogin = async (req,res)=>{
   // console.log(req.body)
    let checkAdmin = await adminModel.findOne(req.body)
    let resObj;

    if(checkAdmin){
        resObj = {
            status : 1,
            adminID : checkAdmin._id,
            mgs : "Login sucessfully"
        }
    }
    else{
        resObj = {
            status : 0,
            mgs : "Invalid UserName or Password!..."
        }
    }

    res.send(resObj)
}



let forgotSendOTP = async (req,res)=>{
   let {email} = req.body
 //  console.log(email)
   let admin = await adminModel.findOne({adminEmail:email})
   if(admin){

    let otp = Math.floor(Math.random()*999999999).toString().slice(0,6)

    myOTP.set("MYOTP",otp)  // Backend OTP store

    // ye code notemailer.com website se half bottom code ko copy kiya gaya hai ok yaha per kuch text me changes kiye gaya hai 
        const info = await transporter.sendMail({
       from: '"Ecommerce APP | Forgot Password OTP" <aashishsingh1542@gmail.com>',
      to: email,
      subject: "OTP Mail | Forget Password",
       text: "OTP Mail", // plain‑text body
      html: `<b>OTP ${otp}</b>`, // HTML body
    });

    res.send({status : 1, mgs : 'OTP SEND'})

    }
   else{
    res.send({status:0,mgs:"Invalid Email Id"})
   }
}

let verifyOTP = (req,res)=>{
    let {otp} = req.body
    let backendOTP = myOTP.get("MYOTP")
    if(backendOTP==otp){
        res.send({status:1, mgs : "OTP verify successfully. You can now reset your password."})
    }
    else{
        res.send({status:0, mgs : "Invalid OTP"})
    }

}



let resetPassword = async (req,res)=>{
    let {email,newPassword} = req.body

    let updateRes = await adminModel.updateOne({adminEmail:email}, {$set:{adminPassword : newPassword}})

    res.send({status:1, mgs:'reset your password successfully!'})
}



// ye after login ke baad work karta hai 

let changePassword = async (req,res)=>{
 let   {currentPassword, newPassword, adminID} = req.body;

 let admin = await adminModel.findOne({adminPassword : currentPassword, _id:adminID})

 if(admin){

    if(currentPassword!=newPassword){
    let updateRes = await adminModel.updateOne({_id:adminID}, {$set:{adminPassword : newPassword}})

    res.send({status:1, mgs : "Password Change successfully...!" })
    }
    else{
        res.send({status:0, mgs: "old password or new password change don't same"})
    }
 }
 else{
    res.send({status : 0, mgs : 'Invalid Old Password'})
 }

}



// ye admin ki profile ko update karne ka work karta hai 

let updateProfile = async (req,res)=>{
  let {_id,AdminName, AdminNumber}  = req.body;
  let obj;
  
    try{
    let insertObj = {
        AdminName,
        AdminNumber,
     }

    if( req.file && req.file.filename){
        
        insertObj['adminImage'] = req.file.filename
        
    }

     let UpdateRes = await adminModel.updateOne({_id}, {$set : insertObj})

     obj = {
        status : 1,
        mgs : "Admin Profile successfully Update...!",
        UpdateRes
     }

     res.send(obj)

  }
  catch(error){
       obj = {
        status : 0,
        mgs : "Admin profile not Update...!",
        error
       }
       res.send(obj)
  }
}

 

let showAdminProfle = async (req,res)=>{
    let data = await adminModel.find()

    let obj = {
        status : 1,
        mgs : 'View Admin Profile',
         staticPath : process.env.ADMINIMAGE,
        data
    }
    res.send(obj)
}



module.exports = {adminLogin,forgotSendOTP,verifyOTP,resetPassword,changePassword,updateProfile,showAdminProfle}