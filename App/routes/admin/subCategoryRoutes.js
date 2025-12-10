let express = require("express")
let multer   = require("multer")
const { subCategoryInsert, subCategoryView, parentCategory, multiDeleteSubCategory, changeStatus, subCategoryUpdate, singleSubCategoryView } = require("../../controllers/subCategoryController")
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'uploads/subcategory')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer ({storage : storage})

let subCategoryRoutes = express.Router()

subCategoryRoutes.post('/insert',upload.single('subcategoryImage'),subCategoryInsert)
subCategoryRoutes.get("/view",subCategoryView)
subCategoryRoutes.get("/view/:id", singleSubCategoryView)
subCategoryRoutes.get('/parentcategory',parentCategory)
subCategoryRoutes.post("/multi-delete",multiDeleteSubCategory)
subCategoryRoutes.put("/update/:id",upload.single('subcategoryImage'), subCategoryUpdate)
subCategoryRoutes.post("/change-status", changeStatus)
module.exports = {subCategoryRoutes}