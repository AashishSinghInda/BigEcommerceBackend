let express = require("express")
// yaha per multer package ka use kiya jaya hai kiyo catergory me image hai kabhi bhi image hogi tho ham multer package ka use kareghe
const multer = require("multer")
// isme dest : ye destination ko bata raha hai or ye '/uploads/category' bata raha hai ke /uploads folder ke under ak /category name ka folder hai 
// ye kewal samjane ke liye hi tha const upload = multer({ dest: 'uploads/category' })

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"uploads/category")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer ({storage : storage})

const { categoryInsert, categoryView, categoryMultiDelete, singleCategoyview, categoryUpdate, changeStatus } = require("../../controllers/categoryController")
let categoryRoutes = express.Router()


// upload variable ko routes me bech me define karna hai .single() function ka use hai ki ak ak image ko upload karna hai ok 
categoryRoutes.post("/insert",upload.single('categoryImage'), categoryInsert)
categoryRoutes.get("/view",categoryView)
categoryRoutes.get("/view/:id",singleCategoyview)
categoryRoutes.post("/multi-delete",categoryMultiDelete)
categoryRoutes.put("/update/:id",upload.single('categoryImage'),categoryUpdate)
categoryRoutes.post("/change-status",changeStatus)

module.exports = {categoryRoutes}