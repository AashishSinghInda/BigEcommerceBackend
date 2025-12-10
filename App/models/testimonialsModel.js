const { default: mongoose } = require("mongoose");


let testtimonilaSchema = new mongoose.Schema({
    testName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 50
    },
    testImage : String,
    testDestination : String,
    testRating : Number,
    testOrder : Number,
    testMessage : String,
    testStatus : Boolean
})

let testModal = mongoose.model('testimonila',testtimonilaSchema)

module.exports = {testModal}