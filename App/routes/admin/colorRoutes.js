let express = require("express")
const { colorInsert, colorView, singlecolorview, colorDelete, colormultiDelete, colorupdate, changeStatus } = require("../../controllers/colorController")


let colorRoutes = express.Router()

colorRoutes.post("/insert",colorInsert)
   /* let obj={
        status : 1,
        mgs : "Color Save"
    }
    res.send(obj) */ 



// http://localhost:8000/admin/color/view
colorRoutes.get("/view",colorView)
  /*  let obj={
        status : 1,
        mgs : "Color View"
    }
    res.send(obj) */

colorRoutes.get("/view/:id",singlecolorview)


colorRoutes.delete("/delete/:id",colorDelete)
 /*   let obj={
        status : 1,
        mgs : "Color Delete"
    }
    res.send(obj)  */


colorRoutes.post("/multi-delete",colormultiDelete)
colorRoutes.put("/update/:id",colorupdate)
colorRoutes.post("/change-status",changeStatus)


module.exports={colorRoutes}