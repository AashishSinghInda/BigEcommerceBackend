let express = require("express")
const { colorRoutes } = require("./colorRoutes")
const { meterialRoutes } = require("./meterialRoutes")
const { countryRoutes } = require("./countryRoutes")
const { faqRoutes } = require("./faqRoutes")
const { categoryRoutes } = require("./categoryRoutes")
const { subCategoryRoutes } = require("./subCategoryRoutes")
const { adminauthRoutes } = require("./adminauthRoute")
const { subsubCategoryRoutes } = require("./subsubCategoryRoutes")
const { testimonialsRoutes } = require("./testimonialRoute")
const { sliderRouters } = require("./sliderRoute")
const { whyChooseRoutes } = require("./whyChooseUsRoute")
const { companyProfileRoutes } = require("./companyProfileRoute")
const { productRoutes } = require("./productRoutes")

let adminRoutes=express.Router() // yaha per admin ke sabhi router hoge


// http://localhost:8000/admin/Login ya tak ye url work karegha 


// isko ham yaha per bhi nahi use kareghe ye sample tha kiyoki routes bhohot jada hoge

/* adminRoutes.get('/login',(req,res)=>{
    let obj={
        status : 1,
        msg : "Login"
    }
    res.send(obj)
})  */ 

adminRoutes.use('/auth',adminauthRoutes)
adminRoutes.use("/color",colorRoutes)  // http://localhost:8000/admin/color/
adminRoutes.use("/meterial",meterialRoutes)
adminRoutes.use("/country",countryRoutes)
adminRoutes.use("/faq",faqRoutes)
adminRoutes.use("/category",categoryRoutes)
adminRoutes.use("/subcategory",subCategoryRoutes) // http://localhost:8000/admin/subcategory/
adminRoutes.use('/subsubcategory',subsubCategoryRoutes)
adminRoutes.use('/testimonial',testimonialsRoutes)
adminRoutes.use('/slider',sliderRouters)
adminRoutes.use('/whychoose',whyChooseRoutes)
adminRoutes.use("/company",companyProfileRoutes)
adminRoutes.use("/product",productRoutes)



module.exports={adminRoutes}