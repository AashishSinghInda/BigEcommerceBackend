let mongoose = require("mongoose")

let faqSchema = new mongoose.Schema({
    faqQuestion : {
       type : String,
       minLength : 3,
       maxLength : 500,
       required : true,
       unique : true
    },
    faqAnswer : String,
    faqOrder : Number,
    faqStatus : Boolean
})

let faqModel = mongoose.model("faq",faqSchema)

module.exports = {faqModel}