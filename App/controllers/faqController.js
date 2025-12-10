const { faqModel } = require("../models/faqModel");

let faqInsert = async (req,res)=>{
    let {faqQuestion,faqAnswer,faqOrder} = req.body;
    let obj;

    try{
    let insertObj = {
        faqQuestion,
        faqAnswer,  
        faqOrder,
        faqStatus : true
    }

    let faqRes = await faqModel.insertOne(insertObj)

     obj = {
        status : 1,
        mgs : "Faq Save...!",
        faqRes
     }
     res.send(obj)
    }
    catch(error){
        obj = {
            status : 0,
            mgs : "Faq already exists...!"
        }
        res.send(obj)
    }
}


    let faqView = async (req,res)=>{

        let searchobj =  {

        }
         if(req.query.faqQuestion!=''){
        searchobj['faqQuestion'] =  new RegExp(req.query.faqQuestion,"i") // ye i search bar me lowercase uppercase left and right sabhi tarah se seach karegha
    }
        let data = await faqModel.find(searchobj)
        let obj = {
            status : 1,
            mgs : "Faq View...!",
            data
        }
        res.send(obj)
    }



  let faqDelete = async (req,res)=>{
    let {id} = req.params;

    let faqDelete = await faqModel.deleteOne({_id:id})
    let obj = {
        status : 1,
        mgs : "Faq Delete",
        faqDelete
    }
    res.send(obj)
}


  let faqMultiDelete = async (req,res)=>{
    let {ids} = req.body


    let faqMutiDeletes = await faqModel.deleteMany({_id : ids})

    let obj = {
        status : 1,
        mgs : "Faq Multi Delete...!",
        faqMutiDeletes
    }
    res.send(obj)
  }


  
  let faqUpdate = async (req,res)=>{
    let {id} = req.params
    let {faqQuestion,faqAnswer,faqOrder} = req.body

    let updObj = {
        faqQuestion,
        faqAnswer,
        faqOrder
    }

    let updRes = await faqModel.updateOne({_id:id} , {$set :updObj })

    let obj = {
        status : 1,
        mgs : "Faq Update",
        updRes
    }
    res.send(obj)
  }


  let singleFaqView = async (req,res)=>{
    let {id} = req.params
    let data = await faqModel.findOne({_id:id})
    let obj = {
        status : 1,
        mgs : "Single Faq View",
        data
    }
    res.send(obj)
  }



  let changeFaqStatus = async (req,res)=>{
    let {ids} = req.body

    let allFaq = await faqModel.find({_id:ids}).select("faqStatus")

    for(let items of allFaq){

        await faqModel.updateOne({_id:items.id}, {$set : {faqStatus : !items.faqStatus }})

    }
    let obj = {
        status : 0,
        mgs : "Faq Status Change...!"
    }
    res.send(obj)
  }



module.exports = {faqInsert,faqView,faqDelete,faqMultiDelete,faqUpdate,singleFaqView,changeFaqStatus}