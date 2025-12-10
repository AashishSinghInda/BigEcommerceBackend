// yadi esme modelfilledname and request.body(req.body) key same hai tho ham key or value ko ak bar define karne per work kareghi
// insertobj me colormodel ki jo field hai or req,body me field same same hi hai isliye ak hi baar define kiya hai 

const { colorModel } = require("../models/colorModel");



let colorInsert= async(req,res)=>{
    let {colorName,colorCode,colorOrder} = req.body
    let obj;
   
   // console.log(req,body)
    try{
    let insertObj={
        colorName,
        colorCode,
        colorStatus : true,
        colorOrder
    }
   // console.log(insertObj)

   let colorRes = await colorModel.insertOne(insertObj)


     obj={
            status : 1,
            mgs : "Color Save",
            colorRes
        }
        res.send(obj)
    }

    catch(error){
         obj={
            status : 0,
            error
        }
        res.send(obj)
    }
}




let colorView = async (req,res)=>{

  let searchObj = {

  }
  if(req.query.colorName!=''){
        searchObj['colorName'] =  new RegExp(req.query.colorName,"i") 
    }

    let data = await colorModel.find(searchObj)
    let obj={
        status : 1,
        mgs: "color View",
        data
    }
    res.send(obj)
}




let colorDelete= async (req,res)=>{
    let {id} = req.params;

    let delRes = await colorModel.deleteOne({_id:id})
    let obj={
        status : 1,
        mgs : "Color Delete",
        delRes
    }
    res.send(obj)
}


let colormultiDelete= async (req,res)=>{
    let {ids} = req.body;
    let delRes = await colorModel.deleteMany({_id:ids})
  //  console.log(ids)
    let obj ={
        status : 1,
        mgs: "Color multi Delete",
        delRes
    }
    res.send(obj)
}


let colorupdate= async (req,res)=>{
    let {id} = req.params;
    let {colorName,colorCode,colorStatus,colorOrder}=req.body

    let updobj={
        colorName,
        colorCode,
        colorStatus,
        colorOrder
    }

    let updRes = await colorModel.updateOne({_id:id},{$set:updobj}) 

    let obj={
        status : 1,
        mgs: "Color Updated",
        updRes
    }
    res.send(obj)
}


let singlecolorview= async (req,res)=>{
    let {id} = req.params;
    let data = await colorModel.findOne({_id:id})
    let obj={
        status : 1,
        mgs : "Color View",
        data
    }
    res.send(obj)
}

 let changeStatus= async(req,res)=>{
    let {ids} = req.body
    let allColor=await colorModel.find({_id:ids}).select('colorStatus')
  //  console.log('meterialStatus')
    for(let items of allColor){
       // console.log(items)
       await colorModel.updateOne({_id:items._id},{$set: {colorStatus: !items.colorStatus}})
    }
    let obj={
        status : 1,
        mgs: "Status Change",
        
    }
    res.send(obj)
}  

module.exports={colorInsert,colorView,colorDelete,colormultiDelete,colorupdate,singlecolorview,changeStatus}