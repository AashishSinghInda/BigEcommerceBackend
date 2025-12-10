const { cartModel } = require("../../models/cartModel");

let addToCart = async (req , res)=>{
 let {id, image, price, qty, title ,color, userId} = req.body;


 let checkProductinCart = await cartModel.findOne({productId:id, color, userId})

  if(checkProductinCart){
    let Resobj = {
        status : 0,
        mgs : "Item already add to cart",

    }
    res.send(Resobj)
  }
  else{
    let obj = {
    color,
    productId : id,
    image,
    price,
    qty,
    title,
    color,
    userId
 }

 let cart = await cartModel.insertOne(obj);

 let ResObj = {
    status : 1,
    mgs : 'Item Add In Cart',
    cart
 }
 res.send(ResObj);
  }

}


let viewCart = async (req,res)=>{
  let {userId} = req.body;
  let cartData = await cartModel.find({userId}).populate("color", "colorName")
  let obj = {
     status : 1,
     staticPath : process.env.PORDOUCTIMAGE,
     cartData
  }
  res.send(obj)

}


let deleteCart = async (req,res)=>{
    let cartId = req.params.cartid;

    let cart = await cartModel.deleteOne({_id: cartId})
    let obj = {
      status : 1,
      mgs : 'Cart item delete...!',
      cart
    }

    res.send(obj)
}



module.exports = {addToCart, viewCart, deleteCart}