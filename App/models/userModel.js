let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    userEmail:{
        type : String,
        unique : true,
        required : true,
        minLength : 2,
        maxLength : 50
    },
    userPhone : {
        type : String,
        unique : true,
         minLength : 2,
        maxLength : 50
    },
    userName : String,
    userPassword : String,
    userAddress : String,
    userGender : String,
},{
    timestamps : true
})


let userModel = mongoose.model('user',userSchema)

module.exports = {userModel}