const { categoryModel } = require("../models/categoryModel")
let fs = require("fs") // fs ka meaning file system hai is ka use image ko folder me se delete karne ke liye use hota hai 

let categoryInsert = async (req,res)=>{
 //   console.log(req.body) // yadi ham req.body ko console karte hai tho ye hame bas categeryname or categoryorder ko he console me show karta hai yadi ham console me req.file ko console karte hai tho ye pure details deta hai    
 //   console.log(req.file)
    let {categoryName,categoryOrder} = req.body
    let obj = {
        categoryName,
        categoryStatus : true,
        categoryOrder
        
    }
    if(req.file){
        if(req.file.filename){
            obj['categoryImage'] = req.file.filename
         }
    }
    try{
        let categoryRes = await categoryModel.insertOne(obj)
        obj = {
            status : 1,
            mgs : "Category Save",
            categoryRes
        }
        res.send(obj)
    }
    catch(error){
        obj = {
            status : 0,
            mgs : "Category name already exists...!",
            error
        }
        res.send(obj)
    }
}

let categoryView = async (req,res)=>{

    let {currentPage, limit} = req.query

    let searchObj = {

    }

    if(req.query.categoryName!=''){
        searchObj['categoryName'] = new RegExp(req.query.categoryName,'i')
    }

    let finalSkip = (currentPage-1)*limit 

    let data = await categoryModel.find(searchObj).skip(finalSkip).limit(limit)

     let  allNumberRec = await categoryModel.find(searchObj)

    let obj = {
        status : 1,
        allNumberRec : allNumberRec.length,
        pages : Math.ceil(allNumberRec.length/limit),
        mgs : "Category Save...!",
        staticPath : process.env.CATEGORYIMAGEPATH,
          data
    }
    res.send(obj)
}

let categoryMultiDelete = async (req,res)=>{
    let {ids} = req.body

    let categoryView = await categoryModel.find({_id : ids}).select("categoryImage")

   // let data = await categoryModel.deleteMany({_id : ids})

   for(let v of categoryView){
    let deletePath = "uploads/category/" + v.categoryImage
      fs.unlinkSync(deletePath) // ye folder me se bhi image ko unlink karta hai ok
   }

   let data = await categoryModel.deleteMany({_id:ids})

    let  obj = {
        status : 1,
        mgs : "Category Deleted",
        data
    }
    res.send(obj)
}

let categoryUpdate = async (req,res)=>{
    let {id} = req.params
    let {categoryName,categoryOrder} = req.body
 //   console.log(req.body)
 //   console.log(req.file)
    
    let obj;

    try{

        let updateCategory = {
            categoryName,
            categoryOrder
        }
        if( req.file.filename){
            updateCategory['categoryImage'] = req.file.filename
        }
        

        let updatRes = await categoryModel.updateOne({_id : id}, {$set : updateCategory})
        obj = {
            status : 1,
            msg : "category Updated sucessfully",
            updatRes
        }
        res.send(obj)
    }
    catch(error){
        obj = {
            status : 0,
            msg : "category already exist !",

        }
        res.send(obj)
    }
}

/*
let categoryUpdate= async (req,res)=>{
    let {id} = req.params;
    console.log(req.body)
    let {categoryName,categoryOrder}=req.body

    let updobj={
        categoryName,
        categoryOrder
       
    }

    let updRes = await categoryModel.updateOne({_id:id},{$set:updobj})  

    let obj={
        status : 1,
        mgs: "Category Updated",
        updRes
    }
    res.send(obj)
}  */ 



let singleCategoyview= async (req,res)=>{
    let {id} = req.params;
    let data = await categoryModel.findOne({_id:id})
    let obj={
        status : 1,
        mgs : "Category View",
        data
    }
    res.send(obj)
}




let changeStatus= async(req,res)=>{
    let {ids} = req.body
    let allcategory=await categoryModel.find({_id:ids}).select('categoryStatus')
  //  console.log('meterialStatus')
    for(let items of allcategory){
       // console.log(items)
       await categoryModel.updateOne({_id:items._id},{$set:{categoryStatus:  !items.categoryStatus}})
    }
    let obj={
        status : 1,
        mgs: "Status Change",
        
    }
    res.send(obj)
}  

module.exports = {categoryInsert,categoryView,categoryMultiDelete,categoryUpdate,changeStatus,singleCategoyview}