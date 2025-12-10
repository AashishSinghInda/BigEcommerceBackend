const { OrderModel } = require("../../models/orderModel");
const Razorpay = require('razorpay')
const crypto = require('crypto');
const { cartModel } = require("../../models/cartModel");

var instance = new Razorpay({
 // yaha per .env key pass karne per razorpay me porblem hoti hai hai direct abhi tho value de rahe hai ok
  key_id: 'rzp_test_WAft3lA6ly3OBc',
  key_secret: '68E17CNWY8SemCvZ6ylOkuOY'
});

let saveOrder = async (req,res)=>{

    let {paymentMethod} = req.body;

    let obj;

      obj = {...req.body};

    if(paymentMethod == 1) // cash or delivery
    {
       
        obj['orderStatus'] = 'process'
       
        let orderSave = await OrderModel.insertOne(obj)

        await  cartModel.deleteMany({userId : obj.userId})

         obj = {
            status : 1,
            mgs : 'order save Successfully!',
            paymentMethod
        }

        res.send(obj)

    }
    
    else {        // online payment
        // ye tho abhi hamare db ke ander order create ho raha hai 
        obj['orderStatus'] = 'pending';
        obj ['paymentStatus'] = '1' // 1 ka matalab model me pending hai 
        let orderData = await OrderModel.insertOne(obj)   

        // yaha order razarpay ke pass create ho raha hai
       // razorpay amount key fix hai ye pase me amount leta hai isliye *100 ka use kiya hai rupees ke liye
     //  abhi tho yaha per req.body.orderAmount*100 use nahi kiya hai ye 15 lakh kar raha hai  
        let orderObj = {
              'amount' : req.body.orderAmount*100,
              'currency' : 'INR',
              'receipt' : orderData._id,
        } 

        let ordersRes = await instance.orders.create(orderObj);

        
       await OrderModel.updateOne({_id : orderData._id}, {$set : {razorpayOrderId : ordersRes.id}})

      //  console.log('>>>>>>>>>>>>>>razarpay',ordersRes); // Razorpay ki ak orderId ayeghe yaha per orderId ko db me dalna hai 
       // res.send(ordersRes);

          obj = {
            status : 1,
            mgs : 'order save Successfully!',
            paymentMethod,
            ordersRes
        }

        res.send(obj)
    }
}


let verifyOrder = async (req,res)=>{

    let {razorpay_payment_id, razorpay_order_id, razorpay_signature, userId } = req.body;

    const hmac = crypto.createHmac('sha256', "68E17CNWY8SemCvZ6ylOkuOY");

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

    const generated_signature = hmac.digest('hex')

    if(generated_signature == razorpay_signature){
         await OrderModel.updateOne({razorpayOrderId : razorpay_order_id}, {
            $set:{
                paymentStatus : "2",
                orderStatus : "2",
                razorpayPayment : razorpay_payment_id
            }
         })
         await  cartModel.deleteMany({userId : userId})
         res.send({status : 1, mgs : 'order verify successfully',});
    }
    else{

    }

    

}








let viewOrder = async (req,res)=>{
    let {userId} = req.body;
    let orders = await OrderModel.find({userId : userId})

    let resObj = {
        status : 1,
        data : orders,
        staticPath : process.env.PORDOUCTIMAGE,
    }

    res.send(resObj)
}

module.exports = {saveOrder,verifyOrder, viewOrder}