let mongoose = require('mongoose')

let adminSchema = new mongoose.Schema({
    AdminName : String,
    adminEmail:{
        type:String,
        unique:true,
        required : true,
        minLength : 2,
        maxLength : 50,
    },
    adminPassword : String,
    adminImage : String,
    AdminNumber : String
})

let adminModel = mongoose.model('admin',adminSchema)
module.exports={adminModel}