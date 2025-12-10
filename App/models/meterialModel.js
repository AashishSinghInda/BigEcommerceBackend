let mongoose = require("mongoose")

let meterialSchema = new mongoose.Schema({
    meterialName : {
        type : String,
        unique : true,
         required:true,
         minLength:3,
         maxLength:30
    },
     meterialOrder:Number,
    meterialStatus:Boolean
})

let meterialModel = mongoose.model("meterial",meterialSchema)

module.exports = {meterialModel}