let  express = require('express')
const { whyChooseInsert, whyChooseView, singleWhyChooseview, whyChooseMultiDelete, whyChooseUpdate, changeStatus } = require('../../controllers/whyChooseUsController')

let multer = require('multer')


let storage = multer.diskStorage({
    destination : function(req,file,cb){
          return cb(null,'uploads/whyChooseUs')
    },
    filename : function(req,file,cb){
         cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer ({storage : storage})


let whyChooseRoutes = express.Router();

whyChooseRoutes.post('/insert',upload.single('whyChooseImage'),whyChooseInsert)
whyChooseRoutes.get('/view',whyChooseView)
whyChooseRoutes.get('/view/:id',singleWhyChooseview)
whyChooseRoutes.post('/multi-delete',whyChooseMultiDelete)
whyChooseRoutes.put("/update/:id",upload.single('whyChooseImage'),whyChooseUpdate)
whyChooseRoutes.post("/change-status",changeStatus)

module.exports = {whyChooseRoutes}