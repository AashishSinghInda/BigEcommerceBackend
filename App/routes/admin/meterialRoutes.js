let express = require("express")
const { meterialInsert, meterialView, singleMeterialview, meterialDelete, meterialmultiDelete, meterialupdate, changeStatus } = require("../../controllers/meterialController")

let meterialRoutes = express.Router()

meterialRoutes.post("/insert",meterialInsert)
meterialRoutes.get("/view",meterialView)
meterialRoutes.get("/view/:id",singleMeterialview) // singleMeterialview ka use edit ke case me use kiya gaya hai 
meterialRoutes.delete("/delete/:id",meterialDelete) // single delete ko abhi fornted me use nahi kar rahe hai abhi
meterialRoutes.post("/multi-delete",meterialmultiDelete)
meterialRoutes.put("/update/:id",meterialupdate)
meterialRoutes.post("/change-status",changeStatus)

module.exports = {meterialRoutes}