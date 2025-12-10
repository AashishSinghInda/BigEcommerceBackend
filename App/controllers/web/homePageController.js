const { categoryModel } = require("../../models/categoryModel")
const { productModel } = require("../../models/productModel")
const { sliderModel } = require("../../models/sliderModel")

let slider = async (req , res)=>{
  let data = await sliderModel.find()
  let ResObj = {
    status : 1,
    staticPath : process.env.SLIDER,
    mgs : 'Banner show Successfully...!',
    data
  }
  res.send(ResObj)
}


let homeProduct = async (req,res)=>{
    let productType = req.query.productType ?? 1;
      let data = await productModel.find({productType : productType}).populate('parentCategory','categoryName').populate('subCategory', 'subCategoryName').populate('subsubCategory','subsubCategoryName').populate('productColor','colorName').populate('productMeterial','meterialName')

    let obj = {
      status : 1,
      mgs : 'product view...!',
      staticPath : process.env.PORDOUCTIMAGE,
      data
    }

    res.send(obj)

}


// ye website me mega-menu ka controller hai 

let megaMenu = async (req,res)=>{
     let categoryData = await categoryModel.find().populate('subcategory')

     let resObj = {
      status : 1,
      categoryData
     }
     res.send(categoryData)
}

module.exports = {slider, homeProduct, megaMenu}