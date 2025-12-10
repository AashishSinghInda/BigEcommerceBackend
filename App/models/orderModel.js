let mongoose = require('mongoose')


let orderSchema =new mongoose.Schema({
    orderItems : [],
    shippingAddress : {
        type : Object
    },
    paymentMethod : {
        type : String,
        enum : ["1", "2"], // cash on delivery, online payment
        default : '1' // pending
    },
    paymentStatus : {
        type : String,
        enum : ['1', '2', '3'],
        default : 1,
    },
    razorpayOrderId : {
        type : String
    },
    razorpayPayment : {
        type : String,
    },
    orderAmount : {
        type : Number
    },
    orderQty : {
        type : Number
    },
    shippingCharges : {
        type : Number
    },
    orderStatus : {
        type : String,
        enum : ['pending', 'process', 'completed'],
        default : 'pending'
    },
    userId: {
        type : mongoose.Types.ObjectId, ref: 'user'
    }

},
{
    timestamps : true
})

let OrderModel = mongoose.model('order', orderSchema)

module.exports = {OrderModel}