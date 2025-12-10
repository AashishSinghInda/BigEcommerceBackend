let mongoose = require("mongoose");
const { default: slugify } = require("slugify");

let subCategorySchema = new mongoose.Schema({
         subCategoryName : {
              type : String,
              required : true,
              unique : true,
              minLength : 2,
              maxLength : 30
            },
        // ye One to Many relationship hai parentCategory ka use isliye kiya gaya hai ki category se jo ham CategoryName add kareghe use categoryName ki id SubCategory me parentcateogory me show ho examples man women kids etc... uske relative data show kar sake 
       // isme ye jo category hai ye categoryModel.js me jo table create karte hai uska name hai 
        parentCategory : {type : mongoose.Types.ObjectId,ref : "category"},
         subCategoryImage : String,
         subCategoryOrder : Number,
         subCategoryStatus : Boolean,
         slug : String,
})


    subCategorySchema.pre('save', function(next){
        this.slug = slugify(this.subCategoryName, {lower:true});
        next();
    })

let subCategoryModel = mongoose.model('subcategory',subCategorySchema)

module.exports = {subCategoryModel}