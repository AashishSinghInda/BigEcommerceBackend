let express = require('express')
const { testInsert, testView, testMultiDelete, changeStatus, testUpdate, singleTestView } = require('../../controllers/testimonialsController')
const multer = require("multer")

let storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null, 'uploads/testimonial')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer ({storage : storage})

let testimonialsRoutes =  express.Router()

testimonialsRoutes.post('/insert',upload.single('testImage'),testInsert)
testimonialsRoutes.get('/view',testView)
testimonialsRoutes.post('/multi-delete',testMultiDelete)
testimonialsRoutes.post("/change-status",changeStatus)
testimonialsRoutes.put("/update/:id",upload.single('testImage'),testUpdate)
testimonialsRoutes.get("/view/:id",singleTestView)

module.exports = {testimonialsRoutes}