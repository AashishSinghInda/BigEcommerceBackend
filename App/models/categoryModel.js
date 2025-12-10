let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let categorySchema = new  mongoose.Schema({
        categoryName : {
            type : String,
            unique : true,
            required : true,
            minLength : 2,
            maxlength : 30
        },
        categoryImage : String,
        categoryOrder : Number,
        categoryStatus : Boolean,
        slug : String,
})

categorySchema.pre('save', function(next){
    this.slug = slugify(this.categoryName, {lower:true});
    next();
})


// virtual field to get all subcategories

categorySchema.virtual('subcategory',{
    ref : 'subcategory',
    localField : '_id',
    foreignField : 'parentCategory'
})

let categoryModel = mongoose.model('category',categorySchema)

module.exports = {categoryModel}    