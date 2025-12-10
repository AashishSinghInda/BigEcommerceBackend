let  mongoose  = require("mongoose");
const { default: slugify } = require("slugify");


let productSchema = new mongoose.Schema({
    productName : {
         type : String,
        required : true,
        unique : true,
         minLength : 2,
        maxLength : 30
    },
    parentCategory : {type : mongoose.Types.ObjectId, ref : 'category'},  // many to one relation ship hai
    subCategory : {type : mongoose.Types.ObjectId,ref : 'subcategory'},    // many to one relation ship hai
    subsubCategory : {type : mongoose.Types.ObjectId,ref : 'subsubcategory'},  // many to one relation ship hai
    productMeterial : [ {type : mongoose.Types.ObjectId,ref : 'meterial'} ],   // ye one to many relationship hai  isliye array me object use kiya hai 
    productColor : [ {type : mongoose.Types.ObjectId,ref : 'color'} ],  // is array me multiple objects store hogef
    productType : {
        type : String,
        enum : ['1', '2', '3']  // 1.Featured 2.NewArrival 3.Onsale enum keyword ka use fixed value ke liye kiya jata hai 
    },
    productBestSelling : Boolean,
    productTopRated : Boolean,
    productUpSell : Boolean,
    productActualPrice : Number,
    productSalePrice : Number,
    productStocks : Number,
    productImage : String,    // single name
    productBackImage : String,  // single name
    productGallery : Array,    // array isliye use kiya hai user productGallery me multiple image add kar sakta hai  (multiple name)
    productOrder : Number,
    productDescription : String,
    productStatus : Boolean,
    slug : String,
})



    productSchema.pre('save', function(next){
        this.slug = slugify(this.productName, {lower:true});
        next();
    })

    let productModel = mongoose.model('product',productSchema)

    module.exports = {productModel}