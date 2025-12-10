const { whyChooseModel } = require("../models/whyChooseUsModel");
let fs = require("fs"); 



let whyChooseInsert = async (req,res)=>{
let {whyChooseTitle, whyChooseDescription, whyChooseOrder} = req.body;
let obj;

try{
  obj ={
    whyChooseTitle,
    whyChooseDescription,
    whyChooseOrder,
    whyChooseStatus  : true
  }
  if(req.file){
    if(req.file.filename){
        obj['whyChooseImage']  = req.file.filename;
    }
  }
  

  let slideRes = await whyChooseModel.insertOne(obj)

  

  obj = {
    status : 1,
    mgs : 'whyChoose insert...!',
    slideRes
  }
  res.send(obj)
}
catch(error){
    obj = {
        status : 0,
        mgs : 'whyChoose already exists...!',
        error
    }
    res.send(obj)
}
}


let whyChooseView = async (req,res)=>{
  
  
    let searchObj ={

    }

    if(req.query.whyChooseTitle!=''){
        searchObj['whyChooseTitle'] = new RegExp(req.query.whyChooseTitle,"i")
    }


    let data = await whyChooseModel.find(searchObj)
    let obj = {
        status : 1,
        mgs : "whyChoose View...!",
        staticPath : process.env.WHYCHOOSE,
        data
    }
    res.send(obj)
}


let whyChooseMultiDelete = async (req,res)=>{
    let {ids} = req.body

    let whyChooseView = await whyChooseModel.find({_id : ids}).select("whyChooseImage")


   for(let v of whyChooseView){
    let deletePath = "uploads/whyChooseUs/" + v.whyChooseImage;
      fs.unlinkSync(deletePath) 
   }

   let data = await whyChooseModel.deleteMany({_id:ids})

    let  obj = {
        status : 1,
        mgs : "whyChoose Deleted",
        data
    }
    res.send(obj)
}






let whyChooseUpdate = async (req,res)=>{
    let {id} = req.params
    let {whyChooseTitle,whyChooseDescription,whyChooseOrder} = req.body
    let obj;

    try{

        let updateWhyChoose = {
            whyChooseTitle,
            whyChooseDescription,
            whyChooseOrder,
        }


        if( req.file.filename){
            updateWhyChoose['whyChooseImage'] = req.file.filename
        }
        

        let updatRes = await whyChooseModel.updateOne({_id : id}, {$set : updateWhyChoose})
        obj = {
            status : 1,
            msg : "whyChoose Updated sucessfully",
            updatRes
        }
        res.send(obj)
    }

    catch(error){
        obj = {
            status : 0,
            msg : "whyChoose already exist !",

        }
        res.send(obj)
    }
}


let singleWhyChooseview= async (req,res)=>{
    let {id} = req.params;
    let data = await whyChooseModel.findOne({_id:id})
    let obj={
        status : 1,
        mgs : "whyChoose View",
        staticPath : process.env.WHYCHOOSE,
        data
    }
    res.send(obj)
}



let changeStatus= async(req,res)=>{
    let {ids} = req.body
    let allwhyChoose=await whyChooseModel.find({_id:ids}).select('whyChooseStatus')
    for(let items of allwhyChoose){
       await whyChooseModel.updateOne({_id:items._id},{$set:{whyChooseStatus:  !items.whyChooseStatus}})
    }
    let obj={
        status : 1,
        mgs: "Status Change",
        
    }
    res.send(obj)
} 



module.exports = {whyChooseInsert,whyChooseView,whyChooseMultiDelete,whyChooseUpdate,singleWhyChooseview,changeStatus}