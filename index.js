let express = require("express")
let mongoose = require("mongoose")
const { adminRoutes } = require("./App/routes/admin/adminRoutes")

let app=express()
let cors = require("cors")
const { adminModel } = require("./App/models/adminModel")
const { webRoutes } = require("./App/routes/web/webRoutes")
app.use(cors())
app.use(express.json())
require("dotenv").config() // config ka matalab hai ab ham dotenv ko use kar sakte hai 

app.use("/admin",adminRoutes)  // http://localhost:8000/admin
app.use("/web",webRoutes) // http://localhost:8000/web


app.use("/uploads/category",express.static("uploads/category")) //http://localhost:8000/admin
app.use("/uploads/subcategory",express.static("uploads/subcategory"))
app.use("/uploads/subsubcategory",express.static("uploads/subsubcategory"))
app.use("/uploads/testimonial",express.static("uploads/testimonial"))
app.use("/uploads/slider",express.static("uploads/slider"))
app.use("/uploads/whyChooseUs",express.static("uploads/whyChooseUs"))
app.use("/uploads/adminImage",express.static("uploads/adminImage"))
app.use("/uploads/companyLogo",express.static("uploads/companyLogo"))
app.use("/uploads/product",express.static("uploads/product"))


      
// app.listen(process.env.PORT) // process key fix hai .env file hai PORT  ye portname hai 
// app.listen("8000") .env folder create karne ke baad hame port name declare is tarah se nahi karna hai 
                         //Ip              dbname
mongoose.connect(`mongodb://127.0.0.1:27017/ecomfurniture`)
.then( async (res)=>{

    let checkAdmin = await adminModel.find()

    if(checkAdmin.length==0){
        adminModel.insertOne({
            adminEmail:process.env.ADMINEMAIL,
            adminPassword : process.env.ADMINPASSWORD
        })
    }
    console.log("DB Connect")
    app.listen(process.env.PORT)    
})


