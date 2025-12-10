const { sliderModel } = require("../models/sliderModel");
let fs = require("fs") 


let sliderInsert = async (req,res)=>{
let {sliderTitle, sliderOrder} = req.body;
let obj;

try{
  obj ={
    sliderTitle,
    sliderOrder,
    sliderStatus  : true
  }
  if(req.file){
    if(req.file.filename){
        obj['sliderImage']  = req.file.filename;
    }
  }
  

  let slideRes = await sliderModel.insertOne(obj)

  

  obj = {
    status : 1,
    mgs : 'slider insert...!',
    slideRes
  }
  res.send(obj)
}
catch(error){
    obj = {
        status : 0,
        mgs : 'slider already exists...!',
        error
    }
    res.send(obj)
}
}


let sliderView = async (req,res)=>{
  
  
    let searchObj ={

    }

    if(req.query.sliderTitle!=''){
        searchObj['sliderTitle'] = new RegExp(req.query.sliderTitle,"i")
    }


    let data = await sliderModel.find(searchObj)
    let obj = {
        status : 1,
        mgs : "slider View...!",
        staticPath : process.env.SLIDER,
        data
    }
    res.send(obj)
}


let sliderMultiDelete = async (req,res)=>{
    let {ids} = req.body

    let sliderView = await sliderModel.find({_id : ids}).select("sliderImage")


   for(let v of sliderView){
    let deletePath = "uploads/slider/" + v.sliderImage
      fs.unlinkSync(deletePath) 
   }

   let data = await sliderModel.deleteMany({_id:ids})

    let  obj = {
        status : 1,
        mgs : "slider Deleted",
        data
    }
    res.send(obj)
}






let sliderUpdate = async (req,res)=>{
    let {id} = req.params
    let {sliderTitle,sliderOrder} = req.body
    let obj;

    try{

        let updateslider = {
            sliderTitle,
            sliderOrder
        }


        if( req.file.filename){
            updateslider['sliderImage'] = req.file.filename
        }
        

        let updatRes = await sliderModel.updateOne({_id : id}, {$set : updateslider})
        obj = {
            status : 1,
            msg : "slider Updated sucessfully",
            updatRes
        }
        res.send(obj)
    }

    catch(error){
        obj = {
            status : 0,
            msg : "slider already exist !",

        }
        res.send(obj)
    }
}


let singleSliderview= async (req,res)=>{
    let {id} = req.params;
    let data = await sliderModel.findOne({_id:id})
    let obj={
        status : 1,
        mgs : "slider View",
          staticPath : process.env.SLIDER,
        data
    }
    res.send(obj)
}



let changeStatus= async(req,res)=>{
    let {ids} = req.body
    let allSlider=await sliderModel.find({_id:ids}).select('sliderStatus')
    for(let items of allSlider){
       await sliderModel.updateOne({_id:items._id},{$set:{sliderStatus:  !items.sliderStatus}})
    }
    let obj={
        status : 1,
        mgs: "Status Change",
        
    }
    res.send(obj)
} 



module.exports = {sliderInsert,sliderView,sliderMultiDelete,sliderUpdate,singleSliderview,changeStatus}