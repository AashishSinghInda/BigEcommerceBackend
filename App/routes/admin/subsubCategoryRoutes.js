let express = require("express")
let multer   = require("multer");
const { subsubCategoryInsert, parentCategory, subCategory, subsubCategoryView, multiDeleteSubSubCategory, changeStatus, singelsubsubCategoryview, subsubCategoryUpdate } = require("../../controllers/subsubCategoryControllers");

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null, 'uploads/subsubcategory')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer ({storage : storage})


let subsubCategoryRoutes = express.Router();


subsubCategoryRoutes.post('/insert',upload.single('subsubcategoryImage'),subsubCategoryInsert)
subsubCategoryRoutes.get('/parentcategory',parentCategory)
subsubCategoryRoutes.get('/subcategory',subCategory)
subsubCategoryRoutes.get('/view',subsubCategoryView)
subsubCategoryRoutes.get("/view/:id",singelsubsubCategoryview)
subsubCategoryRoutes.post('/multi-delete',multiDeleteSubSubCategory)
subsubCategoryRoutes.put("/update/:id",upload.single('subsubcategoryImage'),subsubCategoryUpdate)
subsubCategoryRoutes.post('/change-status',changeStatus)

module.exports = {subsubCategoryRoutes}