let express = require("express")
const { adminLogin, forgotSendOTP, verifyOTP, resetPassword, changePassword, updateProfile, showAdminProfle } = require("../../controllers/adminauthController")

const multer = require("multer")

let storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null, 'uploads/adminImage')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer ({storage : storage})

let adminauthRoutes=express.Router()

adminauthRoutes.post('/login',adminLogin)
adminauthRoutes.post('/send-otp',forgotSendOTP)
adminauthRoutes.post('/verify-otp',verifyOTP)
adminauthRoutes.post('/reset-password',resetPassword)

// ye after login ke baad work karta hai 
adminauthRoutes.post('/change-password', changePassword)

//ye admin ki profile ko update karne ka route hai 
adminauthRoutes.put('/update-profile',upload.single('adminImage'),updateProfile)
adminauthRoutes.get('/admin-profile-show',showAdminProfle)

module.exports={adminauthRoutes}


