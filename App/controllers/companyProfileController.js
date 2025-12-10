const { companyProfileModel } = require("../models/companyProfileModel");



let companyProfileUpdate = async (req , res)=>{
         let {_id ,companyName, companyEmail, companyNumber, companyAddress, companyMapUrl} = req.body;
          let obj;

          
            try{
            let insertObj = {
                companyName,
                companyEmail,
                companyNumber,
                companyAddress,
                companyMapUrl
             }
        
            if( req.file && req.file.filename){
                
                insertObj['companyLogo'] = req.file.filename
                
            }
        
             let UpdateRes = await companyProfileModel.updateOne({_id}, {$set : insertObj})
        
             obj = {
                status : 1,
                mgs : "Company Profile successfully Update...!",
                UpdateRes
             }
        
             res.send(obj)
        
          }
          catch(error){
               obj = {
                status : 0,
                mgs : "company profile not Update...!",
                error
               }
               res.send(obj)
          }
}



let showCompanyProfle = async (req,res)=>{
    let data = await companyProfileModel.find()

    let obj = {
        status : 1,
        mgs : 'View Company Profile',
        staticPath : process.env.COMPANYLOGO,
        data
    }
    res.send(obj)
}


module.exports = {companyProfileUpdate,showCompanyProfle} 






















/* let companyProfileInsert = async (req,res)=>{
    let {companyName, companyEmail, companyNumber, companyAddress, companyMapUrl} = req.body;
    console.log(">>>>>>>>>>>>>>>1",req.body);
    let obj;

    try{
        let insertObj = {
            companyName,
            companyEmail,
            companyNumber,
            companyAddress,
            companyMapUrl
        }

        if(req.file && req.file.filename){
             insertObj['companyLogo']  = req.file.filename;
        }

        let insertRes = await companyProfileModel.insertOne(insertObj)

        obj = {
            status : 1,
            mgs : "company data save...!",
            insertRes
        }
        res.send(obj);
    }
    catch(error){
        obj = {
            status : 0,
            mgs : "insert error",
            error
        }
        res.send(obj);
    }
}  */

 