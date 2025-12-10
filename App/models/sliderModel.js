let mongoose = require('mongoose')

let sliderSchema = new mongoose.Schema({
    sliderTitle : {
            type : String,
            unique : true,
            required : true,
    },
    sliderOrder : Number,
    sliderImage : String,
    sliderStatus : Boolean
})

let sliderModel = mongoose.model('slider',sliderSchema)

module.exports={sliderModel}