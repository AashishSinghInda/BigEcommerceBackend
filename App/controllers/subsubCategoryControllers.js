const { categoryModel } = require("../models/categoryModel");
const { subCategoryModel } = require("../models/subCategoryModel");
const { subsubCategoryModel } = require("../models/subsubCategoryModel");
let fs = require("fs") 


let subsubCategoryInsert = async (req,res)=>{

    let {subsubCategoryName, subsubCategoryOrder, parentCategory, subCategory} = req.body;
    
   // console.log(req.body)
   //  console.log(req.file)

    let obj = {
        parentCategory,
        subCategory,
        subsubCategoryName,
        subsubCategoryOrder
    }

    if(req.file){
        if(req.file.filename){
            obj['subsubCategoryImage'] = req.file.filename
        }
    }

    try{
        let subsubcategoryRes = await subsubCategoryModel.insertOne(obj)
        obj = {
            status : 1,
            mgs : 'subsubCategory Save...!',
            subsubcategoryRes
        }
        res.send(obj)
    }
    catch(error){
        obj = {
            status : 0,
            mgs : "sub sub Category Name already exists...!",
            error
        }
        res.send(obj)
    }
}




let parentCategory = async (req,res)=>{
    let data = await categoryModel.find().select('categoryName')
    let obj = {
        status : 1,
        data
    }
    res.send(obj)
}



let subCategory = async (req,res)=>{
    let {parentCategoryId} = req.query;
    let filter = {};

    if(parentCategoryId){
            filter['parentCategory'] = parentCategoryId
    }
    let data = await subCategoryModel.find(filter).select('subCategoryName parentCategory') 
    let obj = {
        status : 1,
        data
    }
    res.send(obj)
}


let subsubCategoryView = async (req,res)=>{
  
  
    let searchObj ={

    }

    if(req.query.subsubCategoryName!=''){
        searchObj['subsubCategoryName'] = new RegExp(req.query.subsubCategoryName,"i")
    }


    let data = await subsubCategoryModel.find(searchObj).populate('subCategory', 'subCategoryName').populate('parentCategory','categoryName')
    let obj = {
        status : 1,
        mgs : "subsubCategory Save...!",
        staticPath : process.env.SUBSUBCATEGORYIMAGEPATH,
        data
    }
    res.send(obj)
}


let multiDeleteSubSubCategory = async (req,res)=>{
    let {ids} = req.body;

    let subsubCategoryView = await subsubCategoryModel.find({_id : ids}).select('subsubCategoryImage')

    for(let v of subsubCategoryView){
        let deletePath = "uploads/subsubcategory/"+v.subsubCategoryImage
        fs.unlinkSync(deletePath)
    }

    let delRes = await subsubCategoryModel.deleteMany({_id : ids})

    let obj = {
        status : 1,
        mgs : "subsubCatgory multi-delete...!",
        delRes
    }
    res.send(obj)
}


let singelsubsubCategoryview = async (req,res)=>{
    let {id} = req.params;
    let data = await subsubCategoryModel.findOne({_id : id}).populate('subCategory', 'subCategoryName').populate('parentCategory','categoryName')
    let obj = {
        status : 1,
        mgs : "single subsubCategory View...!",
         staticPath :process.env.SUBSUBCATEGORYIMAGEPATH,
        data
    }
    res.send(obj)
}


let subsubCategoryUpdate = async (req,res)=>{
    let {id} = req.params;
    let {subsubCategoryName, subsubCategoryOrder, parentCategory, subCategory} = req.body;

    let obj;

    try{
        let updatesubsubCategory = {
            subsubCategoryName,
            subsubCategoryOrder,
            parentCategory,
            subCategory
        }
         if(req.file.filename){
            updatesubsubCategory['subsubCategoryImage'] = req.file.filename;
        }

        let updateRes = await subsubCategoryModel.updateOne({_id : id}, {$set : updatesubsubCategory})

        obj = {
            status : 1,
            mgs : "Subcategory Update successfully...!",
            updateRes
        }
        res.send(obj)
    }
    catch(error){
        obj = {
            status : 0,
            mgs : "category already exists...!",
        }
        res.send(obj)
    }
}


let changeStatus = async (req,res)=>{
    let {ids} = req.body

    let allsubsubCategory = await subsubCategoryModel.find({_id : ids}).select('subsubCategoryStatus')

    for(let items of allsubsubCategory){

        await subsubCategoryModel.updateOne({_id : items._id}, {$set : {subsubCategoryStatus : !items.subsubCategoryStatus}})
    }

    let obj = {
        status : 1,
        mgs : "status Change"
    }

    res.send(obj)

}


module.exports = {subsubCategoryInsert, parentCategory, subCategory,subsubCategoryView,multiDeleteSubSubCategory, changeStatus,singelsubsubCategoryview,subsubCategoryUpdate}