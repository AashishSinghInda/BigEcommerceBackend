let express = require('express')
const { sliderInsert, sliderView, singleSliderview, sliderMultiDelete, sliderUpdate, changeStatus } = require('../../controllers/sliderController')
let multer = require('multer')

let storage = multer.diskStorage({
    destination : function(req,file,cb){
          return cb(null,'uploads/slider')
    },
    filename : function(req,file,cb){
         cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer ({storage : storage})


let sliderRouters = express.Router()

sliderRouters.post('/insert',upload.single('sliderImage'),sliderInsert)
sliderRouters.get('/view',sliderView)
sliderRouters.get('/view/:id',singleSliderview)
sliderRouters.post('/multi-delete',sliderMultiDelete)
sliderRouters.put("/update/:id",upload.single('sliderImage'),sliderUpdate)
sliderRouters.post("/change-status",changeStatus)

module.exports = {sliderRouters}