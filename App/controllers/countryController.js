const { countryModel } = require("../models/countryModel");


let countryInsert = async (req,res)=>{

    let {countryName,countryOrder} = req.body
    let obj;

    try{
        let insertobj={
            countryName,
            countryStatus : true,
            countryOrder
            
        }

        let countryRes = await countryModel.insertOne(insertobj)

        obj = {
            status : 1,
            mgs : "Country Save...",
            countryRes
        }
        res.send(obj)
     }

      
        catch(error){
        obj = {
            status : 0,
            mgs : "Country Name is already exists...!"
        }
        res.send(obj)
    }
   
}



let countryView = async (req,res)=>{

    let searchObj = {

    }

    if(req.query.countryName!=''){
        searchObj['countryName'] = new RegExp(req.query.countryName,"i")
    }
    let data = await countryModel.find(searchObj)
    let obj = {
        status : 1,
        mgs : "Country View",
        data

    }
    res.send(obj)
}




let countryDelete = async (req,res)=>{
    let {id} = req.params;

    let delRes = await countryModel.deleteOne({_id:id})

    let obj = {
        status : 1,
        mgs : "Country Delete",
        delRes
    }
    res.send(obj)
}




let countryMultiDelete = async (req,res)=>{
    let {ids} = req.body;

    let delmulRes = await countryModel.deleteMany({_id : ids})
  //  console.log(delmulRes)
    let obj = {
        status : 1,
        mgs : "Country Multi Delete",
        delmulRes
    }
    res.send(obj)
}



let countryUpdate = async (req,res)=>{
    let {id} = req.params

        let {countryName,countryOrder}=req.body

    let updobj={
        countryName,
        countryOrder
    }

    let updRes = await countryModel.updateOne({_id:id},{$set:updobj})

    let obj = {
        status : 1,
        mgs : "Country Update",
        updRes
    }
    res.send(obj)
}


let  singleCountryView = async (req,res)=>{
    let {id} = req.params
    
    let data = await countryModel.findOne({_id:id})
    let obj = {
        status : 1,
        mgs : "Single Country View",
        data
    }
    res.send(obj)
}




let changeCountryStatus = async (req,res)=>{
    let {ids} = req.body;

    let allCountry = await countryModel.find({_id:ids}).select('countryStatus')

    for (let items of allCountry){

        await countryModel.updateOne({_id:items._id}, {$set : {countryStatus : !items.countryStatus}})
    }

    let obj = {
        status : 1,
        mgs : "Country Status Change"
    }
    res.send(obj)
}



module.exports = {countryInsert,countryView,singleCountryView,countryDelete,countryMultiDelete,countryUpdate,changeCountryStatus}