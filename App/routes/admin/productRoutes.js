let express = require("express")
const multer = require("multer")
const { parentCategory, subCategory, getColor, getMeterial, subsubCategory, productInsert, getProduct, getSingleProduct } = require("../../controllers/productController")


let storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"uploads/product")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer ({storage : storage})


let productRoutes = express.Router()

productRoutes.get('/parentcategory',parentCategory)
productRoutes.get('/subcategory/:parentid',subCategory)
productRoutes.get('/productcolor',getColor)
productRoutes.get('/productmeterial',getMeterial)
productRoutes.get('/subsubcategory/:subcategoryid',subsubCategory)
productRoutes.post('/insert',upload.fields(
    [
        {
            name : 'productImage',
            maxCount : 1
        },
        {
            name : 'productBackImage',
            maxCount : 1
        },
        {
            name :  'productGallery',
            maxCount : 10
        }
    ]

) ,productInsert)
productRoutes.get('/view',getProduct)
productRoutes.get('/view/:id',getSingleProduct)


module.exports = {productRoutes}