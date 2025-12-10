let mongoose = require('mongoose')

let whyChooseSchema = new mongoose.Schema({
    whyChooseTitle : {
            type : String,
            unique : true,
            required : true,
    },
    whyChooseDescription : String,
    whyChooseOrder : Number,
    whyChooseImage : String,
    whyChooseStatus : Boolean
})

let whyChooseModel = mongoose.model('whyChoose',whyChooseSchema)

module.exports={whyChooseModel}