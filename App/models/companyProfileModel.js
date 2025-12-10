let mongoose = require('mongoose')

let companyProfileSchema = new mongoose.Schema({
    companyName : {
        type : String,
        unique : true,
        required : true
    },
    companyEmail :  String,
    companyNumber : Number,
    companyAddress: String,
    companyMapUrl : String,
    companyLogo :   String
})

let companyProfileModel = mongoose.model('companyprofile',companyProfileSchema)

module.exports = {companyProfileModel}