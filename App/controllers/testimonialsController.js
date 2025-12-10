const { testModal } = require("../models/testimonialsModel");
let fs = require("fs")

let testInsert = async (req,res)=>{
    let {testName, testDestination, testRating, testOrder, testMessage, testStatus} = req.body;
    let obj;

    try {
    let insertRes = {
        testName,
        testDestination,
        testRating,
        testOrder,
        testMessage,
        testStatus : true,
    }

    if(req.file){
        if(req.file.filename){
            insertRes['testImage'] = req.file.filename
        }
    }

    let testRes = await testModal.insertOne(insertRes)

     obj = {
        status : 1,
        mgs : 'testimonial Save...!',
        testRes
     }

     res.send(obj)
    }
    catch(error){
        obj  = {
            status : 0,
            mgs : "testimonial error",
        }
        res.send(obj)
    }

}


let testView = async (req,res)=>{
    
     let obj;

     let searchObj ={

     }

     if(req.query.testName!=''){
        searchObj['testName'] = new RegExp(req.query.testName,"i")
     }

     let data = await testModal.find(searchObj)

     obj = {
        status : 1,
        mgs : 'testimonial view...!',
        staticPath : process.env.TESTIMONIAL,
        data
    }
    res.send(obj)
        
}


let testMultiDelete = async (req,res)=>{
    let {ids} = req.body;

    let testView = await testModal.find({_id : ids}).select('testImage')

    for(let v of testView){
        let deletePath = "uploads/testimonial/" + v.testImage
          fs.unlinkSync(deletePath) // ye folder me se bhi image ko unlink karta hai ok
       }

    let data = await testModal.deleteMany({_id : ids})

    let obj = {
        status : 1,
        mgs : "test MultiDelete",
        data
    }
    res.send(obj)
}


let testUpdate = async (req,res)=>{
    let {id} = req.params;
    let {testName, testDestination, testRating, testOrder, testMessage} = req.body
    
    let obj;

    try{

        let updatetest = {
           testName,
           testDestination,
           testRating,
           testOrder,
           testMessage
        }
        if( req.file.filename){
            updatetest['testImage'] = req.file.filename
        }
        

        let updatRes = await testModal.updateOne({_id : id}, {$set : updatetest})
        obj = {
            status : 1,
            mgs : "test... Updated sucessfully",
            updatRes
        }
        res.send(obj)
    }
    catch(error){
        obj = {
            status : 0,
            mgs : "category already exist !",

        }
        res.send(obj)
    }
}


let singleTestView = async (req,res)=>{
    let {id} = req.params
    let data = await testModal.findOne({_id:id})
    let obj = {
          status : 1,
          mgs : "test.... View",
          staticPath :process.env.TESTIMONIAL,
          data
    }
    res.send(obj)
}

let changeStatus= async(req,res)=>{
    let {ids} = req.body
    let allTest=await testModal.find({_id:ids}).select('testStatus')
    for(let items of allTest){
       // console.log(items)
       await testModal.updateOne({_id:items._id},{$set:{testStatus:  !items.testStatus}})
    }
    let obj={
        status : 1,
        mgs: "Status Change",
        
    }
    res.send(obj)
} 


module.exports = {testInsert, testView, testMultiDelete,changeStatus, testUpdate,singleTestView} 