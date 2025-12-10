let express = require('express');
const { companyProfileUpdate, companyProfileInsert, showCompanyProfle } = require('../../controllers/companyProfileController');

const multer = require("multer")

let storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null, 'uploads/companyLogo')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer ({storage : storage});

let companyProfileRoutes = express.Router();



// companyProfileRoutes.post('/insert',upload.single('companyLogo'),companyProfileInsert)
companyProfileRoutes.put('/update-profile',upload.single('companyLogo'),companyProfileUpdate)
companyProfileRoutes.get('/company-profile',showCompanyProfle)

module.exports = {companyProfileRoutes}