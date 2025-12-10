const { meterialModel } = require("../models/meterialModel");

let meterialInsert = async (req,res)=>{

    let {meterialName,meterialOrder} = req.body
    let obj;

    try{
    let insertobj = {
        meterialName,
        meterialStatus : true,
        meterialOrder
        
    }

    let meterialRes = await meterialModel.insertOne(insertobj)

    obj ={
        status : 1,
        mgs : "Meterial Save",
        meterialRes
    }
    res.send(obj)
    }

    catch(error){
        obj = {
            status : 0,
            mgs : "material name already exist..."
        }
        res.send(obj)
    }
}



let meterialView = async (req,res)=>{

    

    let searchObj = {
        
    }

    let {currentPage,limit} = req.query

    if(req.query.meterialName!=''){
        searchObj['meterialName'] =  new RegExp(req.query.meterialName,"i") // ye i search bar me lowercase uppercase left and right sabhi tarah se seach karegha
    }
    // ak se jada se liye bhi is tarah se use kar sakte hai 
   /* if(req.query.colorCode!=''){
        searchObj['colorCode'] =  new RegExp(req.query.colorCode,"i") // ye i search bar me lowercase uppercase left and right sabhi tarah se seach karegha
    }   */ 


    let finalSkip = (currentPage-1)*limit          

    let data = await meterialModel.find(searchObj).skip(finalSkip).limit(limit)

    let  allNumberRec = await meterialModel.find(searchObj)
    let obj = {
        status : 1,
        allNumberRec : allNumberRec.length,
        pages : Math.ceil(allNumberRec.length/limit),
        mgs : "Meterial View",
        data        
        
    }
    res.send(obj)
}

// is me abhi single delete ko use nahi kar rahe hai frontend me 
let meterialDelete = async (req,res)=>{
    let {id} = req.params;

    let delRes = await meterialModel.deleteOne({_id:id})
    let obj ={
        status : 1,
        mgs : "Meterial Delete",
        delRes
    }
    res.send(obj)
}  


let meterialmultiDelete = async (req,res)=>{
    let {ids} = req.body;

    let delmulRes = await meterialModel.deleteMany({_id:ids})
    let obj = {
        status : 1,
        mgs : "Meterial Multi Delete",
        delmulRes
    }
    res.send(obj)
}



let meterialupdate= async (req,res)=>{
    let {id} = req.params;
    let {meterialName,meterialStatus,meterialOrder}=req.body

    let updobj={
        meterialName,
        meterialOrder
    }

    let updRes = await meterialModel.updateOne({_id:id},{$set:updobj})  

    let obj={
        status : 1,
        mgs: "Meterial Updated",
        updRes
    }
    res.send(obj)
}



let singleMeterialview= async (req,res)=>{
    let {id} = req.params;
    let data = await meterialModel.findOne({_id:id})
    let obj={
        status : 1,
        mgs : "Meterial View",
        data
    }
    res.send(obj)
}

 let changeStatus= async(req,res)=>{
    let {ids} = req.body
    let allmaterial=await meterialModel.find({_id:ids}).select('meterialStatus')
  //  console.log('meterialStatus')
    for(let items of allmaterial){
       // console.log(items)
       await meterialModel.updateOne({_id:items._id},{$set:{meterialStatus:!items.meterialStatus}})
    }
    let obj={
        status : 1,
        mgs: "Status Change",
        
    }
    res.send(obj)
}   

    


module.exports = {meterialInsert,meterialView,meterialDelete,meterialmultiDelete,meterialupdate,singleMeterialview,changeStatus}