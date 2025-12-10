

const { subCategoryModel } = require("../models/subCategoryModel")
const { categoryModel } = require("../models/categoryModel")
let fs = require("fs") 

let subCategoryInsert = async (req,res)=>{
    
    let {subCategoryName,subCategoryOrder,parentCategory} = req.body
    let obj = {
        subCategoryName,
        subCategoryOrder,
        parentCategory,
        subCategoryStatus : true
    }
    if(req.file){
        if(req.file.filename){
            obj['subCategoryImage'] = req.file.filename
        }
    }

   try{
    let subCategoryRes = await subCategoryModel.insertOne(obj)
      obj = {
         status : 1,
         mgs : "Sub Catgory Save...!",
         subCategoryRes
      }
      res.send(obj)
   }
   catch(error){
       obj = {
        status : 0,
        mgs : "Sub Category Name Only Ready Exixts...!",
        error
       }
       res.send(obj)
   }
}

let subCategoryView = async (req,res)=>{

    let searchObj = {

    }
 
     if(req.query.subCategoryName!=''){
        searchObj['subCategoryName'] = new RegExp(req.query.subCategoryName,"i")
     }
     
    

    let data = await subCategoryModel.find(searchObj).populate('parentCategory','categoryName')
    let obj={
        status : 1,
        mgs : "subCategory Save...!",
        staticPath : process.env.SUBCATEGORYIMAGEPATH,
        data
        
    }
    res.send(obj)
}

let parentCategory = async (req,res)=>{
    let data = await categoryModel.find().select("categoryName")
    let obj = {
        status : 1,
        data
    }
    res.send(obj)
}



let multiDeleteSubCategory = async (req,res)=>{
    let {ids} = req.body;

    let subCategoryView = await subCategoryModel.find({_id : ids}).select('subCategoryImage')

   for(let v of subCategoryView){
    let deletePath = "uploads/subcategory/"+v.subCategoryImage
    fs.unlinkSync(deletePath)
   }

    let delRes = await subCategoryModel.deleteMany({_id : ids})

    let obj = {
        status : 1,
        mgs : "SubCategory multi-del",
        delRes
    }
    res.send(obj)
}


let subCategoryUpdate = async (req,res)=>{
    let {id} = req.params;
    let  {subCategoryName, subCategoryOrder, parentCategory} = req.body;

    let obj;

    try{
        let updateSubCategory = {
            subCategoryName,
            subCategoryOrder,
            parentCategory
        }
        if(req.file.filename){
            updateSubCategory['subCategoryImage'] = req.file.filename;
        }

        let updateRes = await subCategoryModel.updateOne({_id : id}, {$set : updateSubCategory})
        
        obj = {
            status : 1,
            mgs : "subCategory Updated successfully!",
            updateRes
        }
        res.send(obj)
    }
    catch(error){
        obj = {
            status : 0,
            mgs : "category already exists!"
        }
        res.send(obj)
    }

}


let singleSubCategoryView = async (req,res)=>{
    let {id} = req.params
    let data = await subCategoryModel.findOne({_id:id}).populate('parentCategory','categoryName')
    let obj = {
          status : 1,
          mgs : "subCategory View",
          staticPath :process.env.SUBCATEGORYIMAGEPATH,
          data
    }
    res.send(obj)
}



let changeStatus =  async (req,res)=>{
    let {ids} = req.body

    let allSubCategory = await subCategoryModel.find({_id:ids}).select('subCategoryStatus')

    for(let items of allSubCategory){

        await subCategoryModel.updateOne({_id : items._id}, {$set : {subCategoryStatus : !items.subCategoryStatus}})
    }

    let obj = {
        status : 1,
        mgs : "status Change"
    }

    res.send(obj)
}

module.exports = {subCategoryInsert,subCategoryView,parentCategory,multiDeleteSubCategory,subCategoryUpdate, singleSubCategoryView, changeStatus}