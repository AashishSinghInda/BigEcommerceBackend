let  mongoose  = require("mongoose");
const { default: slugify } = require("slugify");



let subsubCategorySchema = new mongoose.Schema({
      subsubCategoryName : {
        type : String,
        required : true,
        unique : true,
         minLength : 2,
        maxLength : 30
      },
      parentCategory : {type : mongoose.Types.ObjectId,ref : 'category'},
      subCategory : {type : mongoose.Types.ObjectId,ref : 'subcategory'},
      subsubCategoryImage : String,
      subsubCategoryOrder : Number,
      subsubCategoryStatus : Boolean,
      slug : String,
})

       subsubCategorySchema.pre('save', function(next){
              this.slug = slugify(this.subsubCategoryName, {lower:true});
              next();
       })

let subsubCategoryModel = mongoose.model('subsubcategory', subsubCategorySchema)

module.exports = {subsubCategoryModel}