const { categoryModel } = require("../models/categoryModel")
const { colorModel } = require("../models/colorModel")
const { meterialModel } = require("../models/meterialModel")
const { productModel } = require("../models/productModel")
const { subCategoryModel } = require("../models/subCategoryModel")
const { subsubCategoryModel } = require("../models/subsubCategoryModel")


let parentCategory = async (req,res)=>{
     let data = await categoryModel.find().select('categoryName')
     let obj = {
        status : 1,
        data
     }
     res.send(obj)
}


let subCategory = async (req,res)=>{
    let {parentid} = req.params;
    let data = await subCategoryModel.find({parentCategory:parentid}).select("subCategoryName")
    let obj = {
        status : 1,
        data
    }
  res.send(obj);
}


let subsubCategory = async (req,res)=>{
   let {subcategoryid} = req.params;
   let data = await subsubCategoryModel.find({subCategory:subcategoryid}).select('subsubCategoryName')
   let obj = {
    status : 1,
    data
   }
   res.send(obj)
}


let getColor = async (req,res)=>{
  let data = await colorModel.find({colorStatus:true}).select('colorName')
  let obj = {
    status : 1,
    data,
  }
  res.send(obj)
}


let getMeterial = async (req,res)=>{
  let data = await meterialModel.find({meterialStatus:true}).select('meterialName')
  let obj = {
    status : 1,
    data
  }
  res.send(obj)
}



let productInsert = async (req,res)=>{
    let obj = {...req.body} // isme jo hamari model ki filled name or fronted ke fillted name same hai is ak ak filled ko destructure nahi karna hai jo ye direct req.body me aa gaye gha ok
 //  console.log('>>>>>>>>>>>>>1',req.body)
 //  console.log('>>>>>>>>>>>>2',req.files)

   if(req.files){
    if(req.files.productImage){
      obj['productImage'] = req.files.productImage[0].filename
    }

    if(req.files.productBackImage){
      obj['productBackImage']  = req.files.productBackImage[0].filename
    }

    if(req.files.productGallery){
      obj['productGallery'] = req.files.productGallery.map((items)=> items.filename)
    }
   }


   let product = await productModel.insertOne(obj)
   
    obj = {
      status : 1,
      mgs : "Product Save...!",
      product
    }

    res.send(obj)
}



let getProduct = async (req,res)=>{
    let data = await productModel.find().populate('parentCategory','categoryName').populate('subCategory', 'subCategoryName').populate('subsubCategory','subsubCategoryName').populate('productColor','colorName').populate('productMeterial','meterialName')

    let obj = {
      status : 1,
      mgs : 'product view...!',
      staticPath : process.env.PORDOUCTIMAGE,
      data
    }

    res.send(obj)
}


let getSingleProduct = async (req,res)=>{
  let {id} = req.params;
    let data = await productModel.findOne({_id:id}).populate('parentCategory','categoryName').populate('subCategory', 'subCategoryName').populate('subsubCategory','subsubCategoryName').populate('productColor','colorName').populate('productMeterial','meterialName')

    let obj = {
      status : 1,
      mgs : 'product view...!',
      data
    }

    res.send(obj)
}

module.exports = {parentCategory,subCategory,getColor,getMeterial,subsubCategory,productInsert,getProduct, getSingleProduct}