let express = require("express");
const { register, login, changePassword, getUser, UserProfileUpdate, googleLoginCreate } = require("../../controllers/web/userAuthController");
const multer = require("multer");
const { checkToken } = require("../../middleware/checkToken");

let userauthRoutes = express.Router();

let uploads = multer()

userauthRoutes.post('/register', uploads.none(),register) // uploads.none() karne ke baad me req.body me data aa jaye gha
userauthRoutes.post('/login',uploads.none(),login)
userauthRoutes.post('/create-user-google-login',googleLoginCreate)
userauthRoutes.post('/changepassword', checkToken,  changePassword)
userauthRoutes.post('/data', checkToken, getUser)

userauthRoutes.post('/update', checkToken, UserProfileUpdate)

module.exports = {userauthRoutes}